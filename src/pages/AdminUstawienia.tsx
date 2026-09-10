import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../lib/api";

/**
 * Ustawienia konta administratora. Na razie jedno: zmiana hasła.
 *
 * Formularz logowania zostaje tam, gdzie był (/pl/admin/packages) — drugiego
 * tu świadomie nie ma. Login jest jeden i zaszyty w aplikacji, więc pola
 * e-mail nie pokazujemy; serwer i tak bierze tożsamość z tokenu, a nie
 * z treści żądania.
 */

const TOKEN_KEY = "admin_token";
const MIN_LENGTH = 12;
const MAX_BYTES = 72;

// bcrypt patrzy tylko na pierwsze 72 BAJTY hasła — nie znaki. Polska litera
// zajmuje 2 bajty, więc „hasłoążćź” to 9 znaków, ale 14 bajtów. Liczymy tak
// samo jak serwer, żeby użytkownik zobaczył problem od razu w formularzu,
// a nie po odesłaniu.
const byteLength = (value: string) => new TextEncoder().encode(value).length;

export default function AdminUstawienia() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const bytes = byteLength(next);
  const tooShort = next.length > 0 && next.length < MIN_LENGTH;
  const tooLong = bytes > MAX_BYTES;
  const mismatch = repeat.length > 0 && next !== repeat;
  const sameAsOld = next.length > 0 && next === current;
  const canSubmit =
    current.length > 0 &&
    next.length >= MIN_LENGTH &&
    !tooLong &&
    next === repeat &&
    !sameAsOld &&
    !busy;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setDone(false);

    try {
      const token = sessionStorage.getItem(TOKEN_KEY) ?? "";
      const res = await fetch(apiUrl("/admin/change-password"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });

      if (res.status === 429) {
        throw new Error("Za dużo prób — odczekaj minutę.");
      }

      const body = await res.json().catch(() => null);

      // 401 na tym formularzu znaczy najczęściej złe obecne hasło, a nie
      // wygasłą sesję — dlatego nie wyrzucamy stąd na ekran logowania
      // bez wyraźnego powodu.
      if (!res.ok) {
        throw new Error(body?.error ? String(body.error) : `HTTP ${res.status}`);
      }

      // Serwer oddaje świeży token: zmiana hasła nie ma wyrzucać z sesji.
      if (body?.token) sessionStorage.setItem(TOKEN_KEY, body.token);

      setCurrent("");
      setNext("");
      setRepeat("");
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Nie udało się zmienić hasła");
    } finally {
      setBusy(false);
    }
  }

  const field = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-slate-900">Admin — Ustawienia</h1>
          <span className="flex items-center gap-3 text-sm">
            <a href="/pl/admin/packages" className="text-slate-600 underline hover:text-slate-900">
              Pakiety
            </a>
            <a href="/pl/admin/leads" className="text-slate-600 underline hover:text-slate-900">
              Leady
            </a>
            <button
              onClick={() => {
                sessionStorage.removeItem(TOKEN_KEY);
                navigate("/admin/packages", { replace: true });
              }}
              className="text-slate-500 hover:text-slate-700"
            >
              Wyloguj
            </button>
          </span>
        </div>

        <form onSubmit={submit} className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-slate-900">Zmiana hasła</h2>
            <p className="text-sm text-slate-600 mt-1">
              Konto: <code className="text-slate-800">admin@solimax.local</code>
            </p>
          </div>

          <label className="block text-sm">
            <span className="block text-slate-600 mb-1">Obecne hasło</span>
            <input
              type={show ? "text" : "password"}
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              autoComplete="current-password"
              className={field}
            />
          </label>

          <label className="block text-sm">
            <span className="block text-slate-600 mb-1">Nowe hasło</span>
            <input
              type={show ? "text" : "password"}
              value={next}
              onChange={(e) => setNext(e.target.value)}
              autoComplete="new-password"
              className={field}
            />
            <span className="block text-xs text-slate-500 mt-1">
              Minimum {MIN_LENGTH} znaków. {next.length > 0 && `Wpisano ${next.length} znaków (${bytes} bajtów).`}
            </span>
            {tooShort && (
              <span className="block text-xs text-amber-700 mt-1">
                Za krótkie — brakuje {MIN_LENGTH - next.length}.
              </span>
            )}
            {tooLong && (
              <span className="block text-xs text-red-700 mt-1">
                Za długie: {bytes} bajtów przy limicie {MAX_BYTES}. bcrypt i tak
                bierze pod uwagę tylko pierwsze {MAX_BYTES} bajtów, a polskie
                litery liczą się podwójnie.
              </span>
            )}
            {sameAsOld && (
              <span className="block text-xs text-amber-700 mt-1">
                Nowe hasło musi różnić się od obecnego.
              </span>
            )}
          </label>

          <label className="block text-sm">
            <span className="block text-slate-600 mb-1">Powtórz nowe hasło</span>
            <input
              type={show ? "text" : "password"}
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              autoComplete="new-password"
              className={field}
            />
            {mismatch && (
              <span className="block text-xs text-amber-700 mt-1">Hasła nie są identyczne.</span>
            )}
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={show}
              onChange={(e) => setShow(e.target.checked)}
              className="h-4 w-4 accent-slate-900"
            />
            Pokaż hasła
          </label>

          {error && (
            <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}

          {done && (
            <p className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
              Hasło zmienione. Zapisz je w menedżerze haseł — nie da się go odczytać później.
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-4 py-2 text-sm rounded-md bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-40"
            >
              {busy ? "Zapisywanie..." : "Zmień hasło"}
            </button>
            <span className="text-xs text-slate-500">
              Spacje na początku i końcu są częścią hasła — nie są obcinane.
            </span>
          </div>
        </form>

        <p className="text-xs text-slate-500">
          Zmiana hasła nie unieważnia tokenów wydanych wcześniej — wygasają same
          po 12 godzinach. Przy jednym koncie i tokenie trzymanym tylko w karcie
          przeglądarki to świadomie przyjęte uproszczenie.
        </p>
      </div>
    </div>
  );
}
