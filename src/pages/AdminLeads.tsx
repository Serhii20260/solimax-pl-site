import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/api";

/**
 * Podgląd i obsługa leadów. Strona zapisuje TYLKO dwa pola: znacznik
 * „obsłużone” i komentarz. Treść zgłoszenia — imię, telefon, e-mail, źródło,
 * meta — jest tu nietykalna: serwer odrzuca każde inne pole (400), więc nawet
 * błąd w tym pliku nie nadpisze danych klienta.
 *
 * Czas: baza trzyma UTC, ale filtr dat i kolumna „Data” pracują w czasie
 * polskim — „9 września” znaczy polski dzień, nie dobę UTC.
 */

const TOKEN_KEY = "admin_token";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  consentRODO: boolean;
  productType: string;
  region: string | null;
  consumption: string | null;
  packageId: string | null;
  packageName: string | null;
  pvPower: number | null;
  batteryCapacity: number | null;
  houseArea: number | null;
  householdSize: number | null;
  energyClass: string | null;
  heatingConsumption: string | null;
  source: string;
  meta: string | null;
  createdAt: string;
  createdAtLocal: string;
  message: string | null;
  notifyStatus: string | null;
  notifyError: string | null;
  notifyAtLocal: string | null;
  // Stan każdego kanału osobno. Klucz to nazwa kanału: "email", "telegram".
  // Kolumna notifyStatus wyżej niesie PODSUMOWANIE (doszło cokolwiek / nic),
  // a tu są szczegóły. Puste dla leadów starszych niż tabela prób.
  notifications?: Record<string, { status: string; error: string | null; at: string | null }>;
  processedAt: string | null;
  processedAtLocal: string | null;
  comment: string | null;
};

type SourceStat = { source: string; count: number };

type LeadsResponse = {
  items: Lead[];
  total: number;
  page: number;
  pageSize: number;
  order: "asc" | "desc";
  timezone: string;
  sources: SourceStat[];
  undelivered: number;
  unprocessed: number;
};

type ChannelStatus = {
  ok: boolean;
  error: string | null;
  enabled?: boolean;   // tylko Telegram: kanał bez tokenu jest WYŁĄCZONY, nie zepsuty
  user?: string | null;
  to?: string | null;
  bot?: string | null;
  chatId?: string | null;
};

type MailStatus = {
  ok: boolean;
  error: string | null;
  user: string | null;
  to: string | null;
  channels?: { email: ChannelStatus; telegram: ChannelStatus };
  // Kanał działa, jeśli działa CHOĆ JEDEN: to właśnie znaczy, że
  // właściciel dowie się o leadzie.
  anyWorking?: boolean;
};

type RowState = { busy: boolean; error: string };

const PAGE_SIZES = [25, 50, 100, 200];

// Kolejność kanałów na liście. Nazwa techniczna -> podpis dla człowieka.
const CHANNELS = [
  { key: "email", label: "poczta" },
  { key: "telegram", label: "Telegram" },
] as const;

// Polski dzień kalendarzowy, nie doba UTC. Format sv-SE daje od razu
// „RRRR-MM-DD”, czyli dokładnie to, czego oczekuje <input type="date">.
const warsawDay = (shiftDays = 0) => {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Warsaw" }).format(new Date());
  if (shiftDays === 0) return today;
  const [y, m, d] = today.split("-").map(Number);
  // Południe UTC: przesunięcie o dni nigdy nie przeskoczy doby przez DST.
  const moved = new Date(Date.UTC(y, m - 1, d, 12) + shiftDays * 86400000);
  return moved.toISOString().slice(0, 10);
};

export default function AdminLeads() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [source, setSource] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [processed, setProcessed] = useState<"all" | "no" | "yes">("all");
  const [search, setSearch] = useState("");
  const [searchApplied, setSearchApplied] = useState("");

  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [csvBusy, setCsvBusy] = useState(false);
  const [mail, setMail] = useState<MailStatus | null>(null);

  // Stan zapisu per wiersz i niezapisane komentarze.
  const [rows, setRows] = useState<Record<string, RowState>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  // Wpisywanie w pole szukania nie może strzelać zapytaniem na każdą literę.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchApplied(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    params.set("order", order);
    if (source) params.set("source", source);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    if (processed !== "all") params.set("processed", processed);
    if (searchApplied) params.set("q", searchApplied);
    return params;
  }, [page, pageSize, order, source, from, to, processed, searchApplied]);

  // Token wygasł — wracamy na stronę z formularzem logowania, tak jak robi to
  // RequireAdmin w App.tsx. Drugiego formularza logowania tu świadomie nie ma.
  const handleUnauthorized = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    navigate("/admin/packages", { replace: true });
  }, [navigate]);

  useEffect(() => {
    let cancelled = false;
    const token = sessionStorage.getItem(TOKEN_KEY) ?? "";

    setLoading(true);
    setError("");

    fetch(apiUrl(`/admin/leads?${query.toString()}`), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          handleUnauthorized();
          return null;
        }
        if (res.status === 429) {
          throw new Error("Za dużo zapytań — odczekaj minutę i spróbuj ponownie.");
        }
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.error ? `${body.error}` : `HTTP ${res.status}`);
        }
        return (await res.json()) as LeadsResponse;
      })
      .then((payload) => {
        if (cancelled || !payload) return;
        setData(payload);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Nieznany błąd");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, handleUnauthorized]);

  // Stan kanału powiadomień. Sprawdzany osobno, bo pokazuje zepsutą pocztę
  // także wtedy, gdy nowych leadów jeszcze nie było — a właśnie tak przez
  // pięć miesięcy leżał martwy klucz Brevo.
  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY) ?? "";
    let cancelled = false;
    fetch(apiUrl("/admin/leads/mail-status"), { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!cancelled && payload) setMail(payload as MailStatus);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  // Ostrzeżenie przed wyjściem z niezapisanym komentarzem.
  useEffect(() => {
    const dirty = Object.keys(drafts).length > 0;
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [drafts]);

  const setRowState = (id: string, patch: Partial<RowState>) =>
    setRows((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? { busy: false, error: "" }), ...patch },
    }));

  const replaceItem = (item: Lead) =>
    setData((prev) =>
      prev ? { ...prev, items: prev.items.map((row) => (row.id === item.id ? item : row)) } : prev
    );

  // Jedyna droga zapisu. Zwraca rekord z serwera — ekran pokazuje to, co
  // naprawdę jest w bazie, a nie to, czego się spodziewał.
  async function patchLead(id: string, patch: Record<string, unknown>): Promise<Lead> {
    const token = sessionStorage.getItem(TOKEN_KEY) ?? "";
    const res = await fetch(apiUrl(`/admin/leads/${id}`), {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.status === 401) {
      handleUnauthorized();
      throw new Error("Sesja wygasła");
    }
    if (res.status === 429) throw new Error("Za dużo zapytań — odczekaj chwilę.");
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.error ? String(body.error) : `HTTP ${res.status}`);
    }
    return (await res.json()).item as Lead;
  }

  async function toggleProcessed(lead: Lead) {
    const previous = lead;
    const next = !lead.processedAt;
    // Optymistycznie: znacznik przeskakuje od razu, wiersz idzie w stan zapisu.
    replaceItem({ ...lead, processedAt: next ? new Date().toISOString() : null });
    setRowState(lead.id, { busy: true, error: "" });
    try {
      const saved = await patchLead(lead.id, { processed: next });
      replaceItem(saved);
      setRowState(lead.id, { busy: false, error: "" });
      refreshCounters(next ? -1 : 1);
    } catch (err: unknown) {
      // Zapis padł — cofamy znacznik do stanu z bazy. Właściciel widzi
      // „nie zapisano”, a nie fałszywy znacznik.
      replaceItem(previous);
      setRowState(lead.id, {
        busy: false,
        error: err instanceof Error ? err.message : "Nie zapisano",
      });
    }
  }

  async function saveComment(lead: Lead) {
    const draft = drafts[lead.id] ?? "";
    setRowState(lead.id, { busy: true, error: "" });
    try {
      const saved = await patchLead(lead.id, { comment: draft.trim() ? draft : null });
      replaceItem(saved);
      // Tekst znika z bufora dopiero po potwierdzeniu z serwera.
      setDrafts((prev) => {
        const copy = { ...prev };
        delete copy[lead.id];
        return copy;
      });
      setRowState(lead.id, { busy: false, error: "" });
    } catch (err: unknown) {
      setRowState(lead.id, {
        busy: false,
        error: err instanceof Error ? err.message : "Nie zapisano",
      });
    }
  }

  // Licznik nieobsłużonych trzymamy zgodny bez przeładowania listy.
  const refreshCounters = (delta: number) =>
    setData((prev) => (prev ? { ...prev, unprocessed: Math.max(0, prev.unprocessed + delta) } : prev));

  // CSV nie może pójść zwykłym <a href>: endpoint czyta token wyłącznie
  // z nagłówka Authorization, więc pobieramy przez fetch i oddajemy blobem.
  async function downloadCsv() {
    setCsvBusy(true);
    setError("");
    try {
      const token = sessionStorage.getItem(TOKEN_KEY) ?? "";
      const params = new URLSearchParams(query);
      params.set("format", "csv");
      params.delete("page");
      params.delete("pageSize");

      const res = await fetch(apiUrl(`/admin/leads?${params.toString()}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="([^"]+)"/);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = match ? match[1] : "solimax-leads.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Nie udało się pobrać CSV");
    } finally {
      setCsvBusy(false);
    }
  }

  function resetFilters() {
    setSource("");
    setFrom("");
    setTo("");
    setProcessed("all");
    setSearch("");
    setSearchApplied("");
    setPage(1);
  }

  const setToday = () => {
    const day = warsawDay();
    const already = from === day && to === day;
    setFrom(already ? "" : day);
    setTo(already ? "" : day);
    setPage(1);
  };

  const setWeek = () => {
    const start = warsawDay(-6);
    const end = warsawDay();
    const already = from === start && to === end;
    setFrom(already ? "" : start);
    setTo(already ? "" : end);
    setPage(1);
  };

  const total = data?.total ?? 0;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const firstShown = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastShown = Math.min(page * pageSize, total);
  const filtered = Boolean(source || from || to || searchApplied || processed !== "all");
  const isToday = from === warsawDay() && to === warsawDay();
  const isWeek = from === warsawDay(-6) && to === warsawDay();

  const quickBtn = (active: boolean) =>
    `px-3 py-2 text-sm rounded-md border ${
      active
        ? "border-slate-900 bg-slate-900 text-white"
        : "border-slate-300 hover:bg-slate-50"
    }`;

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Admin — Leady</h1>
          <p className="text-slate-600 text-sm mt-1">
            Zgłoszenia z formularzy i z asystenta telefonicznego. Można oznaczyć
            lead jako obsłużony i dopisać komentarz — reszta danych jest tylko
            do odczytu.
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Daty i filtr okresu w czasie polskim ({data?.timezone ?? "Europe/Warsaw"}).
            Lista pokazuje wszystkie rekordy, także testowe — filtruj ręcznie po źródle.
          </p>
        </div>
        <button
          onClick={downloadCsv}
          disabled={csvBusy || loading}
          className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {csvBusy ? "Pobieranie..." : "Pobierz CSV"}
        </button>
      </div>

      {/* Sygnały, które mają być widoczne zanim ktokolwiek o nie zapyta */}
      <div className="flex flex-wrap gap-2 text-sm">
        {(data?.unprocessed ?? 0) > 0 && (
          <span className="rounded-md border border-sky-300 bg-sky-50 px-3 py-1.5 text-sky-900">
            Nieobsłużone: <strong>{data?.unprocessed}</strong>
          </span>
        )}
        {(data?.undelivered ?? 0) > 0 && (
          <span className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-amber-900">
            Powiadomienia niewysłane: <strong>{data?.undelivered}</strong>
          </span>
        )}
        {mail && (() => {
          // Kanały pokazujemy OSOBNO. Wyłączony Telegram to nie awaria —
          // to stan, i wygląda inaczej niż zepsuta poczta.
          const chans = mail.channels;
          const anyOk = mail.anyWorking ?? mail.ok;
          if (!chans) {
            return (
              <span
                className={`rounded-md border px-3 py-1.5 ${
                  mail.ok
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-red-300 bg-red-50 text-red-900"
                }`}
                title={mail.error ?? ""}
              >
                Kanał powiadomień: <strong>{mail.ok ? "działa" : "nie działa"}</strong>
                {!mail.ok && mail.error ? ` — ${mail.error}` : ""}
              </span>
            );
          }
          const cell = (label: string, st: ChannelStatus) => {
            const off = st.enabled === false;
            const look = st.ok
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : off
                ? "border-slate-300 bg-slate-50 text-slate-600"
                : "border-red-300 bg-red-50 text-red-900";
            const word = st.ok ? "działa" : off ? "wyłączony" : "nie działa";
            return (
              <span key={label} className={`rounded-md border px-3 py-1.5 ${look}`} title={st.error ?? ""}>
                {label}: <strong>{word}</strong>
                {!st.ok && !off && st.error ? ` — ${st.error}` : ""}
              </span>
            );
          };
          return (
            <>
              {cell("Poczta", chans.email)}
              {cell("Telegram", chans.telegram)}
              {!anyOk && (
                <span className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-red-900">
                  <strong>Żaden kanał nie działa</strong> — o nowych leadach nie przyjdzie powiadomienie
                </span>
              )}
            </>
          );
        })()}
      </div>

      {/* Szybkie filtry */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setProcessed(processed === "no" ? "all" : "no");
            setPage(1);
          }}
          className={quickBtn(processed === "no")}
        >
          Nieobsłużone
        </button>
        <button onClick={setToday} className={quickBtn(isToday)}>
          Dziś
        </button>
        <button onClick={setWeek} className={quickBtn(isWeek)}>
          Tydzień
        </button>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Szukaj: telefon, imię, e-mail, treść"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm min-w-[20rem] flex-1"
        />
      </div>

      {/* Filtry */}
      <div className="rounded-lg border border-slate-200 p-4 flex flex-wrap items-end gap-4">
        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Źródło</span>
          <select
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setPage(1);
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm min-w-[16rem]"
          >
            <option value="">wszystkie ({data?.sources.reduce((s, x) => s + x.count, 0) ?? 0})</option>
            {(data?.sources ?? []).map((s) => (
              <option key={s.source} value={s.source}>
                {s.source} ({s.count})
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Od (dzień)</span>
          <input
            type="date"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setPage(1);
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Do (dzień)</span>
          <input
            type="date"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setPage(1);
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Obsługa</span>
          <select
            value={processed}
            onChange={(e) => {
              setProcessed(e.target.value as "all" | "no" | "yes");
              setPage(1);
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">wszystkie</option>
            <option value="no">nieobsłużone</option>
            <option value="yes">obsłużone</option>
          </select>
        </label>

        <label className="text-sm">
          <span className="block text-slate-600 mb-1">Na stronie</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setOrder(order === "desc" ? "asc" : "desc")}
          className="px-3 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-50"
        >
          Data: {order === "desc" ? "najnowsze pierwsze" : "najstarsze pierwsze"}
        </button>

        {filtered && (
          <button
            onClick={resetFilters}
            className="px-3 py-2 text-sm rounded-md border border-slate-300 hover:bg-slate-50"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {error && (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>
          {loading
            ? "Wczytywanie..."
            : total === 0
              ? "Brak rekordów dla wybranych filtrów"
              : `Pokazano ${firstShown}–${lastShown} z ${total}`}
        </span>
        <span className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
          >
            ‹ Poprzednia
          </button>
          <span>
            {page} / {lastPage}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
            disabled={page >= lastPage || loading}
            className="px-3 py-1 rounded-md border border-slate-300 disabled:opacity-40 hover:bg-slate-50"
          >
            Następna ›
          </button>
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Obsł.</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Data</th>
              <th className="text-left font-medium px-3 py-2">Imię</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Telefon</th>
              <th className="text-left font-medium px-3 py-2">E-mail</th>
              <th className="text-left font-medium px-3 py-2">Źródło</th>
              <th className="text-left font-medium px-3 py-2">Produkt</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">RODO</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Powiad.</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Treść</th>
            </tr>
          </thead>
          <tbody>
            {(data?.items ?? []).map((lead) => {
              const isOpen = expanded === lead.id;
              const body = lead.message ?? lead.meta;
              const state = rows[lead.id] ?? { busy: false, error: "" };
              const draft = drafts[lead.id];
              const dirty = draft !== undefined && draft !== (lead.comment ?? "");
              const done = Boolean(lead.processedAt);

              return (
                <tr
                  key={lead.id}
                  className={`border-t border-slate-100 align-top ${
                    done ? "bg-slate-50/70 text-slate-500" : ""
                  } ${state.busy ? "opacity-60" : ""}`}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={done}
                      disabled={state.busy}
                      onChange={() => toggleProcessed(lead)}
                      title={
                        lead.processedAtLocal
                          ? `Obsłużone: ${lead.processedAtLocal}`
                          : "Oznacz jako obsłużone"
                      }
                      className="h-4 w-4 accent-slate-900 cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                    {lead.createdAtLocal}
                    {done && lead.processedAtLocal && (
                      <span className="block text-xs text-slate-400">
                        obsłużone {lead.processedAtLocal}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">{lead.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{lead.phone}</td>
                  <td className="px-3 py-2 break-all">{lead.email}</td>
                  <td className="px-3 py-2">{lead.source}</td>
                  <td className="px-3 py-2">{lead.productType}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {lead.consentRODO ? (
                      <span className="rounded px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800">
                        zgoda
                      </span>
                    ) : (
                      <span className="rounded px-2 py-0.5 text-xs bg-amber-100 text-amber-900">
                        brak zgody
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {/* Stan KAŻDEGO kanału osobno, nie jedną etykietą.
                        Najważniejszy przypadek: poczta padła, a Telegram
                        doszedł — właściciel i tak się dowiedział. Jedna
                        etykieta tego nie pokaże. */}
                    {lead.notifications && Object.keys(lead.notifications).length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {CHANNELS.map((ch) => {
                          const st = lead.notifications?.[ch.key];
                          if (!st) return null;
                          const look =
                            st.status === "sent"
                              ? "bg-emerald-100 text-emerald-800"
                              : st.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-slate-100 text-slate-500";
                          const label =
                            st.status === "sent"
                              ? "wysłane"
                              : st.status === "failed"
                                ? "błąd"
                                : "wyłączony";
                          return (
                            <span
                              key={ch.key}
                              className={`rounded px-2 py-0.5 text-xs whitespace-nowrap ${look}`}
                              title={st.error ?? ""}
                            >
                              {ch.label}: {label}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <>
                        {lead.notifyStatus === "sent" && (
                          <span className="rounded px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800">
                            wysłane
                          </span>
                        )}
                        {lead.notifyStatus === "failed" && (
                          <span
                            className="rounded px-2 py-0.5 text-xs bg-red-100 text-red-800"
                            title={lead.notifyError ?? ""}
                          >
                            błąd
                          </span>
                        )}
                        {lead.notifyStatus === "pending" && (
                          <span className="rounded px-2 py-0.5 text-xs bg-slate-200 text-slate-700">
                            w toku
                          </span>
                        )}
                        {!lead.notifyStatus && <span className="text-slate-400">—</span>}
                      </>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => {
                        setExpanded(isOpen ? null : lead.id);
                        if (!isOpen && drafts[lead.id] === undefined) {
                          setDrafts((prev) => ({ ...prev, [lead.id]: lead.comment ?? "" }));
                        }
                      }}
                      className="text-slate-600 underline hover:text-slate-900 whitespace-nowrap"
                    >
                      {isOpen ? "Zwiń" : "Pokaż"}
                    </button>

                    {lead.comment && !isOpen && (
                      <span className="ml-2 text-xs text-slate-500 italic">
                        {lead.comment.length > 60 ? `${lead.comment.slice(0, 60)}…` : lead.comment}
                      </span>
                    )}

                    {isOpen && (
                      <div className="mt-2 max-w-3xl space-y-2">
                        {body ? (
                          <pre className="whitespace-pre-wrap break-words rounded-md bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800">
                            {body}
                          </pre>
                        ) : (
                          <p className="text-slate-400 text-xs">Brak treści zgłoszenia.</p>
                        )}

                        <label className="block text-xs text-slate-600">
                          Komentarz
                          <textarea
                            value={draft ?? lead.comment ?? ""}
                            maxLength={2000}
                            rows={3}
                            onChange={(e) =>
                              setDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) saveComment(lead);
                            }}
                            placeholder="np. oddzwonić w poniedziałek"
                            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
                          />
                        </label>

                        <div className="flex items-center gap-3 text-xs">
                          <button
                            onClick={() => saveComment(lead)}
                            disabled={state.busy || !dirty}
                            className="px-3 py-1.5 rounded-md bg-slate-900 text-white disabled:opacity-40"
                          >
                            {state.busy ? "Zapisywanie..." : "Zapisz"}
                          </button>
                          <span className="text-slate-500">Ctrl+Enter</span>
                          {dirty && !state.busy && (
                            <span className="text-amber-700">niezapisane zmiany</span>
                          )}
                        </div>
                      </div>
                    )}

                    {state.error && (
                      <p className="mt-2 text-xs text-red-700">
                        Nie zapisano: {state.error}{" "}
                        <button
                          onClick={() => setRowState(lead.id, { error: "" })}
                          className="underline"
                        >
                          ukryj
                        </button>
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
