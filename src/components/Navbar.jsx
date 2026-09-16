import { useState } from "react";
import { useTranslation } from "react-i18next";
import { navLinks, languages } from "../data/mockData";
import useTheme from "../hooks/useTheme";
import { smoothScrollTo } from "../utils/smoothScroll";

// Durée du défilement doux (1,5 s) : commune à tous les liens d'ancre
const SCROLL_DURATION = 1500;

// ============================================================
// Navbar — Barre de navigation Yummy (Phase B : traduite + Dark Mode)
// - Textes via t('nav.*') : changent instantanément à chaque
//   i18n.changeLanguage() (useTranslation ré-abonne le composant)
// - Dark Mode : bouton toggle SVG Soleil/Lune (hook useTheme, persisté en
//   localStorage), classes dark: sur fond/liens/menus. Le bouton
//   rouge "Reserve" reste inchangé (lisible sur les 2 thèmes).
// - Responsive : burger sous lg, sélecteur inline en bas du menu
// ============================================================

// ---------- Bouton Dark Mode (SVG Soleil/Lune, style Lucide, sans dépendance) ----------
// - Soleil affiché en thème clair, Lune en thème sombre.
// - Cercle h-10 w-10 (cohérent avec le bouton burger), icône
//   text-gray-600 / dark:text-gray-300 (contraste vérifié), survol
//   hover:bg-gray-100 / dark:hover:bg-gray-700.
// - Animation : rotation 180° (transition-transform duration-500)
//   à chaque bascule de thème.
// - Accessibilité : aria-label + title décrivant l'ACTION (ex: en mode
//   clair, le bouton propose "Activer le mode sombre").
function ThemeToggleButton({ theme, onToggle, className = "" }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full p-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 ${className}`}
    >
      {isDark ? (
        // Lune (thème sombre actif) — path Lucide "moon"
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-500 rotate-180"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        // Soleil (thème clair actif) — icône Lucide "sun"
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-500"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}

// ---------- Sélecteur de langue (desktop : dropdown absolu) ----------
function DesktopLanguageSelector({ currentLang, onSelect }) {
  // Ouverture/fermeture du dropdown (état local à l'instance)
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsLangOpen(false); // fermeture auto après sélection
  };

  return (
    <div className="relative hidden lg:block">
      {/* Bouton : drapeau + code + chevron */}
      <button
        type="button"
        onClick={() => setIsLangOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isLangOpen}
        aria-label="Choisir la langue"
        className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span aria-hidden="true">{currentLang.flag}</span>
        <span className="font-semibold text-gray-700 dark:text-gray-200">{currentLang.code}</span>
        {/* Chevron : pivote à l'ouverture */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isLangOpen && (
        <ul
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-[150px] rounded-md bg-white p-2 shadow-lg dark:bg-gray-800 dark:shadow-black/40"
        >
          {languages.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-red-50 dark:hover:bg-gray-700 ${
                  lang.code === currentLang.code
                    ? "font-semibold text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span>{lang.name}</span>
                <span className="ml-auto text-xs text-gray-400">
                  {lang.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------- Sélecteur de langue (mobile : liste inline dépliable) ----------
// Pas de dropdown absolu ici : le menu burger est en overflow-x-hidden,
// une liste inline reste 100% tactile et ne peut pas être rognée.
function MobileLanguageSelector({ currentLang, onSelect }) {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsLangOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsLangOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isLangOpen}
        aria-label="Choisir la langue"
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800"
      >
        <span aria-hidden="true">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <span className="text-xs text-gray-400">{currentLang.code}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`ml-auto h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isLangOpen && (
        <ul role="menu" className="mt-1 space-y-1 rounded-md bg-gray-50 p-2 dark:bg-gray-800">
          {languages.map((lang) => (
            <li key={lang.code} role="none">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleSelect(lang)}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-red-50 dark:hover:bg-gray-700 ${
                  lang.code === currentLang.code
                    ? "font-semibold text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span>{lang.name}</span>
                <span className="ml-auto text-xs text-gray-400">
                  {lang.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // i18n : `t` pour les libellés, `i18n` pour changer de langue.
  // Le composant se ré-affiche automatiquement à chaque changement.
  const { t, i18n } = useTranslation();
  // Thème clair/sombre (persisté, indépendant de la langue)
  const { theme, toggleTheme } = useTheme();

  // Langue active lue depuis i18next (ex: 'en' -> entrée EN).
  // Repli sur EN si le code courant est inconnu.
  const currentLang =
    languages.find(
      (lang) => lang.code.toLowerCase() === i18n.language
    ) ?? languages[0];

  // Changement de langue : i18next recharge `t()` partout (Navbar + Hero),
  // puis confirmation console (bonus).
  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang.code.toLowerCase());
    console.log(`Langue changée en ${lang.name} (${lang.code})`);
  };

  // Clic ancre : défilement lent JS (1500ms) + fermeture du burger.
  // preventDefault = pas de saut natif (aucun conflit CSS/JS).
  const handleNavClick = (targetId) => (e) => {
    e.preventDefault();
    setIsOpen(false);
    smoothScrollTo(targetId, SCROLL_DURATION);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm transition-colors duration-300 dark:bg-gray-900">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo (shrink-0 : jamais écrasé sur 320px) */}
        <a
          href="#home"
          onClick={handleNavClick("home")}
          className="flex shrink-0 items-center gap-2 text-xl font-bold"
        >
          Yummy
          <span className="text-red-600">.</span>
        </a>

        {/* Liens desktop — centrés, libellés traduits.
            Clé déduite du href : "#about" -> t('nav.about'). */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={handleNavClick(link.href.slice(1))}
                className="text-sm font-medium text-gray-600 transition hover:text-red-600 dark:text-gray-200 dark:hover:text-red-400"
              >
                {t(`nav.${link.href.slice(1)}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* Sélecteur langue + Dark Mode + CTA + Burger */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Sélecteur desktop : juste avant le bouton, visible en lg+ */}
          <DesktopLanguageSelector
            currentLang={currentLang}
            onSelect={handleLangChange}
          />

          {/* Toggle Dark Mode desktop (à côté du sélecteur) */}
          <ThemeToggleButton
            theme={theme}
            onToggle={toggleTheme}
            className="hidden lg:inline-flex"
          />

          <a
            href="#booking"
            onClick={handleNavClick("booking")}
            className="hidden rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:inline-block"
          >
            {t("nav.reserve")}
          </a>

          {/* Bouton burger (mobile uniquement) */}
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {isOpen ? (
              // Icône X
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Icône burger
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menu mobile déroulant : pleine largeur, sans scroll horizontal */}
      {isOpen && (
        <div className="w-full overflow-x-hidden border-t border-gray-100 bg-white lg:hidden dark:border-gray-800 dark:bg-gray-900">
          <ul className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleNavClick(link.href.slice(1))}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-red-400"
                >
                  {t(`nav.${link.href.slice(1)}`)}
                </a>
              </li>
            ))}
            {/* Sélecteur de langue + Dark Mode mobile : en bas de la liste */}
            <li className="flex items-center gap-2 border-t border-gray-100 pt-2 dark:border-gray-800">
              <div className="flex-1">
                <MobileLanguageSelector
                  currentLang={currentLang}
                  onSelect={handleLangChange}
                />
              </div>
              <ThemeToggleButton theme={theme} onToggle={toggleTheme} />
            </li>
            <li className="pt-2">
              <a
                href="#booking"
                onClick={handleNavClick("booking")}
                className="block rounded-full bg-red-600 px-5 py-2 text-center text-sm font-semibold text-white hover:bg-red-700"
              >
                {t("nav.reserve")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
