// src/pages/Kontakty.tsx
import { useState } from "react";
import LeadFormSection from "../components/LeadFormSection";
import { apiUrl } from "../lib/api";
import { useLanguage } from "../lib/LanguageContext";

const CONTACT_PHONE_DISPLAY = "+48 732 071 337";
const CONTACT_PHONE_TEL = "+48732071337";
const SALES_PHONE_DISPLAY = "+48 732 071 393";
const SALES_PHONE_TEL = "+48732071393";
const SUPPORT_PHONE_DISPLAY = "+48 732 071 670";
const SUPPORT_PHONE_TEL = "+48732071670";
const CALLBACK_EMAIL_PLACEHOLDER = "callback@solimax.pl";

type ProductType = "pv" | "heat_pump";

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  productType: ProductType;
  region: string;
  consumption: string;
  packageName: string;
  consentRODO: boolean;
}

interface CallbackFormData {
  name: string;
  phone: string;
  consentRODO: boolean;
}

const initialFormData: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  productType: "pv",
  region: "",
  consumption: "",
  packageName: "",
  consentRODO: false,
};

const initialCallbackData: CallbackFormData = {
  name: "",
  phone: "",
  consentRODO: false,
};

export default function Kontakty() {
  const { t } = useLanguage();
  const contacts = [
    { title: t.kontaktMainContactTitle, phone: CONTACT_PHONE_DISPLAY, tel: CONTACT_PHONE_TEL, email: "info@solimax.pl" },
    { title: t.kontaktSalesTitle, phone: SALES_PHONE_DISPLAY, tel: SALES_PHONE_TEL, email: "sales@solimax.pl" },
    { title: t.kontaktSupportTitle, phone: SUPPORT_PHONE_DISPLAY, tel: SUPPORT_PHONE_TEL, email: "support@solimax.pl" },
  ];
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [callbackData, setCallbackData] = useState<CallbackFormData>(initialCallbackData);
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackStatus, setCallbackStatus] = useState<"idle" | "success" | "error">("idle");
  const [callbackErrorMessage, setCallbackErrorMessage] = useState("");
  const [callbackFieldErrors, setCallbackFieldErrors] = useState<{ name?: string; phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === 'name' || name === 'phone' || name === 'email') {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = e.target.checked;

    setCallbackData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "name" || name === "phone") {
      setCallbackFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Validate fields
    const errors: { name?: string; phone?: string; email?: string } = {};
    if (!formData.name.trim()) {
      errors.name = t.contactValidationName;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 9) {
      errors.phone = t.contactValidationPhone;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.contactValidationEmail;
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Validate RODO consent
    if (!formData.consentRODO) {
      setErrorMessage(t.contactConsentRequired);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(apiUrl("/consultant/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "contact",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || t.contactError);
      }

      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t.contactError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackSubmitting(true);
    setCallbackStatus("idle");
    setCallbackErrorMessage("");

    const errors: { name?: string; phone?: string } = {};
    if (!callbackData.name.trim()) {
      errors.name = t.contactValidationName;
    }
    if (!callbackData.phone.trim() || callbackData.phone.trim().length < 9) {
      errors.phone = t.contactValidationPhone;
    }
    if (Object.keys(errors).length > 0) {
      setCallbackFieldErrors(errors);
      setCallbackSubmitting(false);
      return;
    }
    if (!callbackData.consentRODO) {
      setCallbackErrorMessage(t.contactConsentRequired);
      setCallbackSubmitting(false);
      return;
    }

    try {
      const response = await fetch(apiUrl("/consultant/lead"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackData.name,
          phone: callbackData.phone,
          email: CALLBACK_EMAIL_PLACEHOLDER,
          productType: "pv",
          packageName: t.callbackPackageName,
          message: t.callbackEmailMessage,
          consentRODO: callbackData.consentRODO,
          source: "contact",
          meta: JSON.stringify({
            form: "callback",
            requestedAction: "phone_callback",
          }),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || t.callbackError);
      }

      setCallbackStatus("success");
      setCallbackData(initialCallbackData);
    } catch (err) {
      setCallbackStatus("error");
      setCallbackErrorMessage(err instanceof Error ? err.message : t.callbackError);
    } finally {
      setCallbackSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 md:space-y-24 md:px-6 md:py-24 lg:px-8">
      <section id="lead-form" className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            {t.contactFormTitle}
          </h1>

          <p className="text-slate-700 text-sm sm:text-lg leading-relaxed">
            {t.contactFormSubtitle}
          </p>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            {submitStatus === "success" ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {t.contactFormThankYou}
                </h3>
                <p className="text-slate-600">
                  {t.contactFormThankYouMsg}
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-6 text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  {t.contactFormSubmitAnother}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Product Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactProductType} *
                  </label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    required
                  >
                    <option value="pv">{t.contactProductPV}</option>
                    <option value="heat_pump">{t.contactProductHeatPump}</option>
                  </select>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactName} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${fieldErrors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    placeholder={t.contactNamePlaceholder}
                    maxLength={100}
                  />
                  {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactPhone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${fieldErrors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    placeholder={t.contactPhonePlaceholder}
                    maxLength={30}
                  />
                  {fieldErrors.phone && <p className="text-xs text-red-600">{fieldErrors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactEmail} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${fieldErrors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    placeholder={t.contactEmailPlaceholder}
                    maxLength={200}
                  />
                  {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactRegion}
                  </label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder={t.contactRegionPlaceholder}
                    maxLength={200}
                  />
                </div>

                {/* Consumption */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactConsumption}
                  </label>
                  <input
                    type="text"
                    name="consumption"
                    value={formData.consumption}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder={t.contactConsumptionPlaceholder}
                    maxLength={500}
                  />
                </div>

                {/* Package Name (manual input) */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.contactPackage}
                  </label>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder={t.contactPackagePlaceholder}
                    maxLength={200}
                  />
                </div>

                {/* RODO Consent */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    name="consentRODO"
                    id="consentRODO"
                    checked={formData.consentRODO}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    required
                  />
                  <label htmlFor="consentRODO" className="text-xs text-slate-600 leading-relaxed">
                    {t.contactConsent} *
                  </label>
                </div>

                {/* Error Message */}
                {submitStatus === "error" && (
                  <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {errorMessage || t.contactError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t.contactSubmitting}
                    </>
                  ) : (
                    t.contactSubmit
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section id="callback-form" className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6 sm:p-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              {t.callbackFormTitle}
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {t.callbackFormSubtitle}
            </p>
          </div>

          <div className="rounded-3xl border border-yellow-200 bg-white p-6 sm:p-8">
            {callbackStatus === "success" ? (
              <div className="text-center py-6">
                <div className="text-green-600 text-4xl mb-3">OK</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {t.callbackSuccessTitle}
                </h3>
                <p className="text-slate-600">
                  {t.callbackSuccessMessage}
                </p>
                <button
                  onClick={() => setCallbackStatus("idle")}
                  className="mt-6 text-sm text-slate-500 hover:text-slate-700 underline"
                >
                  {t.contactFormSubmitAnother}
                </button>
              </div>
            ) : (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleCallbackSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.callbackNameLabel} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={callbackData.name}
                    onChange={handleCallbackChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${callbackFieldErrors.name ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    placeholder={t.callbackNamePlaceholder}
                    maxLength={100}
                  />
                  {callbackFieldErrors.name && <p className="text-xs text-red-600">{callbackFieldErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-900">
                    {t.callbackPhoneLabel} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={callbackData.phone}
                    onChange={handleCallbackChange}
                    className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${callbackFieldErrors.phone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
                    placeholder={t.callbackPhonePlaceholder}
                    maxLength={30}
                  />
                  {callbackFieldErrors.phone && <p className="text-xs text-red-600">{callbackFieldErrors.phone}</p>}
                </div>

                <div className="flex items-start gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="consentRODO"
                    id="callbackConsentRODO"
                    checked={callbackData.consentRODO}
                    onChange={handleCallbackChange}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    required
                  />
                  <label htmlFor="callbackConsentRODO" className="text-xs text-slate-600 leading-relaxed">
                    {t.callbackConsent} *
                  </label>
                </div>

                {callbackStatus === "error" && (
                  <div className="sm:col-span-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {callbackErrorMessage || t.callbackError}
                  </div>
                )}

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={callbackSubmitting}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {callbackSubmitting ? t.callbackSubmitting : t.callbackSubmit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Karta 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">{t.kontaktHowTitle}</h3>
            <ol className="space-y-2 text-slate-700 text-sm sm:text-base list-decimal list-inside">
              <li>{t.kontaktHowStep1}</li>
              <li>{t.kontaktHowStep2}</li>
              <li>{t.kontaktHowStep3}</li>
            </ol>
            <p className="text-slate-600 text-sm">{t.kontaktHowNote}</p>
          </div>

          {/* Karta 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">{t.kontaktAskTitle}</h3>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
              <li>{t.kontaktAskItem1}</li>
              <li>{t.kontaktAskItem2}</li>
              <li>{t.kontaktAskItem3}</li>
              <li>{t.kontaktAskItem4}</li>
            </ul>
            <p className="text-slate-600 text-sm">{t.kontaktAskNote}</p>
          </div>

          {/* Karta 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">{t.kontaktImportantTitle}</h3>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
              <li>{t.kontaktImportantItem1}</li>
              <li>{t.kontaktImportantItem2}</li>
              <li>{t.kontaktImportantItem3}</li>
              <li>{t.kontaktImportantItem4}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          {t.kontaktInfoTitle}
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Lewa kolumna - kontakty i mapa */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">{t.kontaktAddressTitle}</h3>
                <p className="text-slate-700 text-sm sm:text-base">
                  Solimax Sp. z o.o.<br />
                  ul. Ruska 22<br />
                  {t.kontaktAddressLine3}
                </p>
                <div className="pt-2">
                  <h3 className="font-semibold text-slate-900">{t.kontaktTaxId}</h3>
                  <p className="text-slate-700 text-sm">8971959206</p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-900">{t.kontaktContactsTitle}</h3>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.email} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <h4 className="text-sm font-semibold text-slate-900">{contact.title}</h4>
                      <div className="mt-2 space-y-1 text-sm sm:text-base">
                        <p className="text-slate-700">
                          <span className="text-slate-500">{t.kontaktPhoneLabel}: </span>
                          <a href={`tel:${contact.tel}`} className="text-yellow-600 hover:text-yellow-500">{contact.phone}</a>
                        </p>
                        <p className="text-slate-700">
                          <span className="text-slate-500">{t.kontaktEmailLabel}: </span>
                          <a href={`mailto:${contact.email}`} className="text-yellow-600 hover:text-yellow-500">{contact.email}</a>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.933!2d17.0285!3d51.1105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc275d5c5f8f5%3A0x8e8e8e8e8e8e8e8e!2sul.%20Ruska%2022%2C%2050-079%20Wroc%C5%82aw%2C%20Poland!5e0!3m2!1sen!2spl!4v1680000000000!5m2!1sen!2spl"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.kontaktMapTitle}
                className="w-full"
              />
            </div>
            <a 
              href="https://maps.google.com/?q=ul.+Ruska+22,+50-079+Wroc%C5%82aw,+Polska" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-500 font-medium text-sm"
            >
              {t.kontaktOpenMaps}
            </a>
          </div>

          {/* Prawa kolumna - opinie Google */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">{t.kontaktReviewsTitle}</h3>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              {/* Google Reviews Widget Placeholder */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-slate-700 font-medium">5.0</span>
                <span className="text-slate-500 text-sm">{t.kontaktReviewsOnGoogle}</span>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">M</div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Marek K.</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{t.kontaktReviewMarek}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">A</div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Anna W.</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{t.kontaktReviewAnna}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 text-sm font-medium">P</div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Piotr N.</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{t.kontaktReviewPiotr}</p>
                </div>
              </div>
              
              <a 
                href="https://www.google.com/maps/place/ul.+Ruska+22,+50-079+Wroc%C5%82aw,+Poland/@51.1105,17.0285,17z/data=!4m7!3m6!1s0x0:0x0!8m2!3d51.1105!4d17.0285!9m1!1b1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-500 font-medium text-sm pt-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm1-11h4v2h-4v4h-2v-4H7v-2h4V7h2v4z"/>
                </svg>
                {t.kontaktAllReviews}
              </a>
            </div>
          </div>
        </div>
        <p className="pt-4 border-t border-slate-200 text-slate-700 text-sm sm:text-base">
          {t.kontaktBottomNote}
        </p>
      </section>

      <LeadFormSection 
        title={t.leadFormTitle}
        subtitle={t.leadFormSubtitle}
        description={t.leadFormDescription}
      />
    </div>
  );
}
