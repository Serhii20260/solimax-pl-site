import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/api";

/**
 * Podgląd leadów. Strona TYLKO do odczytu: nie ma tu edycji ani usuwania.
 * Dane pochodzą z GET /api/admin/leads, chronionego tym samym JWT, co
 * pozostałe trasy administracyjne (logowanie na /pl/admin/packages).
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
};

const PAGE_SIZES = [25, 50, 100, 200];

export default function AdminLeads() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [source, setSource] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [csvBusy, setCsvBusy] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));
    params.set("order", order);
    if (source) params.set("source", source);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    return params;
  }, [page, pageSize, order, source, from, to]);

  // Токен протух — повертаємо на сторінку з формою логіна, як це вже
  // робить RequireAdmin у App.tsx. Другої форми логіна тут свідомо немає.
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
    setPage(1);
  }

  const total = data?.total ?? 0;
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const firstShown = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastShown = Math.min(page * pageSize, total);
  const filtered = Boolean(source || from || to);

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Admin — Leady</h1>
          <p className="text-slate-600 text-sm mt-1">
            Podgląd zgłoszeń z formularzy i z asystenta telefonicznego. Strona
            wyłącznie do odczytu — nic tu nie da się zmienić ani usunąć.
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
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Data</th>
              <th className="text-left font-medium px-3 py-2">Imię</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Telefon</th>
              <th className="text-left font-medium px-3 py-2">E-mail</th>
              <th className="text-left font-medium px-3 py-2">Źródło</th>
              <th className="text-left font-medium px-3 py-2">Produkt</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">RODO</th>
              <th className="text-left font-medium px-3 py-2 whitespace-nowrap">Treść</th>
            </tr>
          </thead>
          <tbody>
            {(data?.items ?? []).map((lead) => {
              const isOpen = expanded === lead.id;
              const body = lead.message ?? lead.meta;
              return (
                <tr key={lead.id} className="border-t border-slate-100 align-top">
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">{lead.createdAtLocal}</td>
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
                  <td className="px-3 py-2">
                    {body ? (
                      <>
                        <button
                          onClick={() => setExpanded(isOpen ? null : lead.id)}
                          className="text-slate-600 underline hover:text-slate-900 whitespace-nowrap"
                        >
                          {isOpen ? "Zwiń" : "Pokaż"}
                        </button>
                        {isOpen && (
                          <pre className="mt-2 max-w-3xl whitespace-pre-wrap break-words rounded-md bg-slate-50 border border-slate-200 p-3 text-xs text-slate-800">
                            {body}
                          </pre>
                        )}
                      </>
                    ) : (
                      <span className="text-slate-400">—</span>
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
