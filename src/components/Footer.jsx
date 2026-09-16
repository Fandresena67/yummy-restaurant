import { useTranslation } from "react-i18next";
import { footerInfo } from "../data/mockData";
import { smoothScrollTo } from "../utils/smoothScroll";

// Durée du défilement doux (1,5 s), identique à la Navbar
const SCROLL_DURATION = 1500;

// ============================================================
// Footer — Pied de page Yummy (traduit)
// - Titres colonnes, horaires, copyright et liens rapides via
//   t('footer.*'). Liens rapides : hrefs mock intacts, libellés via
//   t('footer.links.*') déduits du href ("#about" -> links.about).
// - NON traduit (règle) : adresse, téléphone, emails.
// - 5 colonnes : grid-cols-1 -> sm:grid-cols-2 -> lg:grid-cols-5.
// - Fond noir (bg-gray-900, dark:bg-black), texte blanc.
// - Icônes réelles Facebook, WhatsApp, Email.
// - Textes en break-words (pas de débordement à 320px).
// ============================================================

// Icônes SVG (clés = `icon` de mockData.footerInfo.socialLinks)
const socialIcons = {
  // Logo Facebook (rempli)
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z" />
    </svg>
  ),
  // Logo WhatsApp (rempli)
  whatsapp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  // Enveloppe Email (remplie)
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
};

// Un lien externe (http) s'ouvre dans un nouvel onglet, pas le mailto
const isExternal = (url) => url.startsWith("http");

export default function Footer() {
  const { t } = useTranslation();

  // Clic Quick Link : défilement lent JS (preventDefault = pas de saut natif)
  const handleQuickLink = (targetId) => (e) => {
    e.preventDefault();
    smoothScrollTo(targetId, SCROLL_DURATION);
  };

  return (
    <footer id="contact" className="w-full bg-gray-900 text-white transition-colors duration-300 dark:bg-black">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
        {/* Colonne 1 — Adresse (valeur mock non traduite) */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">
            {t("footer.address")}
          </h4>
          <p className="break-words text-sm leading-6 text-gray-300">
            {footerInfo.address}
          </p>
        </div>

        {/* Colonne 2 — Contact (valeurs mock non traduites) */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">
            {t("footer.contact")}
          </h4>
          <p className="break-words text-sm leading-6 text-gray-300">
            Phone: {footerInfo.phone}
            <br />
            Email: {footerInfo.email}
          </p>
        </div>

        {/* Colonne 3 — Quick Links (hrefs mock, libellés traduits) */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">
            {t("footer.quickLinks")}
          </h4>
          <ul className="space-y-2">
            {footerInfo.quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleQuickLink(link.href.slice(1))}
                  className="text-sm text-gray-300 transition-colors hover:text-red-500"
                >
                  {t(`footer.links.${link.href.slice(1)}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Horaires (traduits) */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">
            {t("footer.openingHours")}
          </h4>
          <p className="break-words text-sm leading-6 text-gray-300">
            {t("footer.hours")}
          </p>
        </div>

        {/* Colonne 5 — Réseaux sociaux (icônes réelles, non textuels) */}
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider">
            {t("footer.followUs")}
          </h4>
          <div className="flex items-center gap-3">
            {footerInfo.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.name}
                {...(isExternal(social.url)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 p-2 text-gray-300 transition-colors hover:bg-red-600 hover:text-white"
              >
                {socialIcons[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Barre copyright (traduite) */}
      <div className="border-t border-gray-800">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-400">
          {t("footer.copyright")}
        </p>
      </div>
    </footer>
  );
}
