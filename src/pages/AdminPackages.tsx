import { useEffect, useRef, useState } from "react";
import { apiUrl } from "../lib/api";

const TOKEN_KEY = "admin_token";
const SESSION_KEY = "solimax_admin_auth";

type Category = "all" | "home" | "heatpumps" | "business" | "carport" | "anker_product";

interface SpecRow {
  key: string;
  value: string;
}

interface Package {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  priceLabel: string;
  imageUrl: string;
  isActive: boolean;
  isPromo: boolean;
  promoLabel: string;
  category: string;
  subcategory: string;
  price: number;
  specs: SpecRow[];
  components: unknown[];
  images?: string[];
}

interface EditState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  priceLabel: string;
  imageUrl: string;
  isActive: boolean;
  isPromo: boolean;
  promoLabel: string;
  subcategory: string;
  price: number | "";
  specs: SpecRow[];
  componentsRaw: string;
  componentsError: string;
  images: string[];
}

function toEditState(pkg: Package): EditState {
  return {
    title: pkg.title ?? "",
    shortDescription: pkg.shortDescription ?? "",
    fullDescription: pkg.fullDescription ?? "",
    priceLabel: pkg.priceLabel ?? "",
    imageUrl: pkg.imageUrl ?? "",
    isActive: pkg.isActive ?? true,
    isPromo: pkg.isPromo ?? false,
    promoLabel: pkg.promoLabel ?? "",
    subcategory: pkg.subcategory ?? "",
    price: pkg.price ?? "",
    specs: Array.isArray(pkg.specs) ? pkg.specs : [],
    componentsRaw: JSON.stringify(pkg.components ?? [], null, 2),
    componentsError: "",
    images: Array.isArray(pkg.images) ? pkg.images : [],
  };
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "Wszystkie" },
  { value: "home", label: "Dom" },
  { value: "heatpumps", label: "Pompy ciepla" },
  { value: "business", label: "Biznes" },
  { value: "carport", label: "Carport" },
  { value: "anker_product", label: "Anker" },
];

export default function AdminPackages() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(TOKEN_KEY));
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [category, setCategory] = useState<Category>("all");

  const [editId, setEditId] = useState<string | null>(null);
  const [editState, setEditState] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState("");

  async function handleGalleryUpload(file: File) {
    const token = sessionStorage.getItem(TOKEN_KEY);
    setGalleryUploading(true);
    setGalleryUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(apiUrl("/admin/packages/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.url) {
        setEditState((prev) => {
          if (!prev) return prev;
          const newImages = [...prev.images, data.url];
          return { ...prev, images: newImages, imageUrl: newImages[0] };
        });
      } else throw new Error("Brak pola url w odpowiedzi");
    } catch (err) {
      setGalleryUploadError(err instanceof Error ? err.message : "Błąd uploadu");
    } finally {
      setGalleryUploading(false);
    }
  }

  async function handleGalleryDelete(url: string) {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const filename = url.split("/").pop();
    if (!filename) return;
    try {
      await fetch(apiUrl(`/admin/packages/upload/${encodeURIComponent(filename)}`), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore - still remove from UI
    }
    setEditState((prev) => {
      if (!prev) return prev;
      const newImages = prev.images.filter((u) => u !== url);
      return { ...prev, images: newImages, imageUrl: newImages[0] ?? prev.imageUrl };
    });
  }

  async function handleImageUpload(file: File) {
    const token = sessionStorage.getItem(TOKEN_KEY);
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(apiUrl("/admin/packages/upload"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.url) setField("imageUrl", data.url);
      else throw new Error("Brak pola url w odpowiedzi");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Błąd uploadu");
    } finally {
      setUploading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwLoading(true);
    setPwError("");
    try {
      const res = await fetch(apiUrl("/admin/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "admin@solimax.local", password: pwInput }),
      });
      const data = await res.json();
      if (data.token) {
        sessionStorage.setItem(TOKEN_KEY, data.token);
        setAuthed(true);
      } else {
        setPwError(data.detail ?? data.message ?? "Nieprawidlowe haslo");
      }
    } catch {
      setPwError("Blad polaczenia z serwerem");
    } finally {
      setPwLoading(false);
    }
  }

  useEffect(() => {
    if (!authed) return;
    const token = sessionStorage.getItem(TOKEN_KEY);
    setLoading(true);
    setFetchError("");
    fetch(apiUrl("/admin/packages"), {
      headers: { Authorization: `Bearer ${token ?? ""}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Package[]) => setPackages(data))
      .catch((err: Error) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [authed]);

  const filtered =
    category === "all" ? packages : packages.filter((p) => p.category === category);

  function startEdit(pkg: Package) {
    setEditId(pkg.id);
    setEditState(toEditState(pkg));
    setSaveMsg("");
  }

  function cancelEdit() {
    setEditId(null);
    setEditState(null);
    setSaveMsg("");
  }

  function setField<K extends keyof EditState>(key: K, val: EditState[K]) {
    setEditState((prev) => prev ? { ...prev, [key]: val } : prev);
  }

  function addSpec() {
    setEditState((prev) =>
      prev ? { ...prev, specs: [...prev.specs, { key: "", value: "" }] } : prev
    );
  }

  function updateSpec(i: number, field: "key" | "value", val: string) {
    setEditState((prev) => {
      if (!prev) return prev;
      const next = prev.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s);
      return { ...prev, specs: next };
    });
  }

  function removeSpec(i: number) {
    setEditState((prev) => {
      if (!prev) return prev;
      return { ...prev, specs: prev.specs.filter((_, idx) => idx !== i) };
    });
  }

  async function handleSave() {
    if (!editState || !editId) return;
    let components: unknown[];
    try {
      components = JSON.parse(editState.componentsRaw);
    } catch (e: unknown) {
      setField("componentsError", "Blad JSON: " + (e instanceof Error ? e.message : "invalid"));
      return;
    }
    setField("componentsError", "");
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch(apiUrl(`/admin/packages/${editId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem(TOKEN_KEY) ?? ""}`,
        },
        body: JSON.stringify({
          title: editState.title,
          shortDescription: editState.shortDescription,
          fullDescription: editState.fullDescription,
          priceLabel: editState.priceLabel,
          price: editState.price === "" ? 0 : Number(editState.price),
          subcategory: editState.subcategory,
          imageUrl: editState.imageUrl,
          isActive: editState.isActive,
          isPromo: editState.isPromo,
          promoLabel: editState.promoLabel,
          specs: editState.specs,
          components,
          images: editState.images,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated: Package = await res.json();
      setPackages((prev) => prev.map((p) => (p.id === editId ? updated : p)));
      setSaveMsg("Zapisano");
      window.setTimeout(() => setSaveMsg(""), 2000);
    } catch (err: unknown) {
      setSaveMsg("Blad: " + (err instanceof Error ? err.message : "unknown"));
    } finally {
      setSaving(false);
    }
  }

  // --- Auth screen ---
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Admin — Pakiety</h1>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Haslo</label>
            <input
              type="password"
              autoFocus
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
            />
          </div>
          {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
          <button
            type="submit"
            disabled={pwLoading}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {pwLoading ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>
      </div>
    );
  }

  // --- Main ---
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Admin — Pakiety</h1>
          <button
            onClick={() => { sessionStorage.removeItem(TOKEN_KEY); sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            Wyloguj
          </button>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                category === c.value
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-slate-500">Ladowanie...</p>}
        {fetchError && <p className="text-red-600">Blad: {fetchError}</p>}

        {!loading && !fetchError && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Tytul</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Kategoria</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Cena</th>
                    <th className="text-center px-4 py-3 font-semibold text-slate-700">Aktywny</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-slate-400">Brak pakietow</td>
                    </tr>
                  )}
                  {filtered.map((pkg) => (
                    <>
                      <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-slate-900">{pkg.title}</td>
                        <td className="px-4 py-3 text-slate-500">{pkg.category}</td>
                        <td className="px-4 py-3 text-slate-600">{pkg.priceLabel}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-block w-3 h-3 rounded-full ${pkg.isActive ? "bg-green-500" : "bg-slate-300"}`} />
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => editId === pkg.id ? cancelEdit() : startEdit(pkg)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
                          >
                            {editId === pkg.id ? "Zamknij" : "Redaguj"}
                          </button>
                        </td>
                      </tr>

                      {editId === pkg.id && editState && (
                        <tr key={`${pkg.id}-edit`}>
                          <td colSpan={5} className="px-4 py-6 bg-slate-50 border-b border-slate-200">
                            <div className="space-y-4 max-w-3xl">
                              <h3 className="font-semibold text-slate-900 text-base">Edytuj: {pkg.title}</h3>

                              <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Tytul">
                                  <input
                                    className={inputCls}
                                    value={editState.title}
                                    onChange={(e) => setField("title", e.target.value)}
                                  />
                                </Field>
                                <Field label="Krotki opis">
                                  <input
                                    className={inputCls}
                                    value={editState.shortDescription}
                                    onChange={(e) => setField("shortDescription", e.target.value)}
                                  />
                                </Field>
                              </div>

                              <Field label="Pelny opis">
                                <textarea
                                  rows={5}
                                  className={inputCls + " resize-none"}
                                  value={editState.fullDescription}
                                  onChange={(e) => setField("fullDescription", e.target.value)}
                                />
                              </Field>

                              <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Cena (label)">
                                  <input
                                    className={inputCls}
                                    value={editState.priceLabel}
                                    onChange={(e) => setField("priceLabel", e.target.value)}
                                  />
                                </Field>
                                <Field label="Cena (liczba, PLN)">
                                  <input
                                    type="number"
                                    min={0}
                                    step={1}
                                    className={inputCls}
                                    value={editState.price}
                                    onChange={(e) => setField("price", e.target.value === "" ? "" : Number(e.target.value))}
                                  />
                                </Field>
                              </div>

                              <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Podkategoria">
                                  <select
                                    className={inputCls}
                                    value={editState.subcategory}
                                    onChange={(e) => setField("subcategory", e.target.value)}
                                  >
                                    <option value="">(brak)</option>
                                    <option value="balcony">balcony</option>
                                    <option value="accessory">accessory</option>
                                    <option value="panel">panel</option>
                                    <option value="powerstation">powerstation</option>
                                  </select>
                                </Field>
                                <Field label="URL obrazka">
                                  <div className="flex gap-2 items-center">
                                    <input
                                      className={inputCls + " flex-1"}
                                      value={editState.imageUrl}
                                      onChange={(e) => setField("imageUrl", e.target.value)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => fileInputRef.current?.click()}
                                      disabled={uploading}
                                      className="shrink-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
                                    >
                                      {uploading ? "..." : "📁 Завантажити"}
                                    </button>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept="image/png,image/jpeg,image/webp"
                                      className="hidden"
                                      onChange={(e) => {
                                        const f = e.target.files?.[0];
                                        if (f) handleImageUpload(f);
                                        e.target.value = "";
                                      }}
                                    />
                                  </div>
                                  {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
                                  {editState.imageUrl && (
                                    <img loading="lazy" decoding="async" src={editState.imageUrl} alt="preview" className="mt-2 h-16 rounded border border-slate-200 object-contain bg-slate-50" />
                                  )}
                                </Field>
                              </div>

                              <Field label="Галерея зображень">
                                <div className="space-y-2">
                                  {editState.images.length === 0 && (
                                    <p className="text-xs text-slate-400">Немає зображень</p>
                                  )}
                                  <div className="flex flex-wrap gap-2">
                                    {editState.images.map((url, i) => (
                                      <div key={i} className="relative group">
                                        <img loading="lazy" decoding="async" src={url} alt={`img-${i}`} className={`h-16 w-16 object-contain rounded border bg-slate-50 ${i === 0 ? 'border-yellow-400' : 'border-slate-200'}`} />
                                        <button
                                          type="button"
                                          onClick={() => handleGalleryDelete(url)}
                                          className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >✕</button>
                                        {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[9px] bg-yellow-400 text-black rounded-b leading-tight">main</span>}
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => galleryFileInputRef.current?.click()}
                                    disabled={galleryUploading}
                                    className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                  >
                                    {galleryUploading ? "..." : "+ Додати зображення"}
                                  </button>
                                  <input
                                    ref={galleryFileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={(e) => {
                                      const f = e.target.files?.[0];
                                      if (f) handleGalleryUpload(f);
                                      e.target.value = "";
                                    }}
                                  />
                                  {galleryUploadError && <p className="text-xs text-red-600">{galleryUploadError}</p>}
                                </div>
                              </Field>

                              <div className="flex flex-wrap gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={editState.isActive}
                                    onChange={(e) => setField("isActive", e.target.checked)}
                                    className="w-4 h-4 rounded accent-yellow-500"
                                  />
                                  <span className="text-sm text-slate-700">Aktywny</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={editState.isPromo}
                                    onChange={(e) => setField("isPromo", e.target.checked)}
                                    className="w-4 h-4 rounded accent-yellow-500"
                                  />
                                  <span className="text-sm text-slate-700">Promo</span>
                                </label>
                                {editState.isPromo && (
                                  <div className="flex-1 min-w-[180px]">
                                    <input
                                      className={inputCls}
                                      placeholder="Etykieta promo"
                                      value={editState.promoLabel}
                                      onChange={(e) => setField("promoLabel", e.target.value)}
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Specs */}
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700">Specyfikacje</span>
                                  <button
                                    type="button"
                                    onClick={addSpec}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold transition-colors"
                                  >
                                    + Dodaj
                                  </button>
                                </div>
                                {editState.specs.length === 0 && (
                                  <p className="text-xs text-slate-400">Brak specyfikacji</p>
                                )}
                                <div className="space-y-2">
                                  {editState.specs.map((s, i) => (
                                    <div key={i} className="flex gap-2 items-center">
                                      <input
                                        className={inputCls + " flex-1"}
                                        placeholder="Klucz"
                                        value={s.key}
                                        onChange={(e) => updateSpec(i, "key", e.target.value)}
                                      />
                                      <input
                                        className={inputCls + " flex-1"}
                                        placeholder="Wartosc"
                                        value={s.value}
                                        onChange={(e) => updateSpec(i, "value", e.target.value)}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeSpec(i)}
                                        className="text-red-500 hover:text-red-700 text-lg leading-none px-1"
                                        title="Usun"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Components JSON */}
                              <Field label="Components (JSON)">
                                <textarea
                                  rows={6}
                                  className={`${inputCls} font-mono text-xs resize-none ${editState.componentsError ? "border-red-500 focus:ring-red-400" : ""}`}
                                  value={editState.componentsRaw}
                                  onChange={(e) => setEditState((prev) => prev ? { ...prev, componentsRaw: e.target.value, componentsError: "" } : prev)}
                                />
                                {editState.componentsError && (
                                  <p className="text-red-600 text-xs mt-1">{editState.componentsError}</p>
                                )}
                              </Field>

                              {/* Actions */}
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={handleSave}
                                  disabled={saving}
                                  className="px-5 py-2.5 rounded-xl bg-yellow-500 text-black text-sm font-semibold hover:bg-yellow-400 transition-colors disabled:opacity-50"
                                >
                                  {saving ? "Zapisywanie..." : "Zapisz"}
                                </button>
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-300 transition-colors"
                                >
                                  Anuluj
                                </button>
                                {saveMsg && (
                                  <span className={`text-sm ${saveMsg.startsWith("Blad") ? "text-red-600" : "text-green-600"}`}>
                                    {saveMsg}
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
