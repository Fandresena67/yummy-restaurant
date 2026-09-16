import { useTranslation } from "react-i18next";
import { smoothScrollTo } from "../utils/smoothScroll";

// Icônes SVG simples pour les 3 cartes (Calendrier, Cœur, Sac)
// Pas besoin de react-icons : SVG inline, style rouge sur fond clair.
// ============================================================
// WhyChooseSection — "Why Choose Yummy" (traduite)
// - Textes via t('whyChoose.*') : titre, description, bouton.
// - Cartes : t('whyChoose.cards', { returnObjects: true }) -> .map(),
//   icônes locales indexées dans le même ordre (non traduites).
// - mockData n'est plus importé : tout le texte vient du JSON.
// - Grille grid-cols-1 -> lg:grid-cols-4, bloc rouge w-full p-6/md:p-8.
// ============================================================

const cardIcons = [
  // Calendrier
  <svg
    key="calendar"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  // Cœur
  <svg
    key="heart"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.3 12.5l7.2 7.2a1 1 0 001.4 0l7.2-7.2a5 5 0 00-7.1-7.1l-.7.7-.7-.7a5 5 0 00-7.3 7.1z"
    />
  </svg>,
  // Sac
  <svg
    key="bag"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>,
];

export default function WhyChooseSection() {
  const { t } = useTranslation();

  // Cartes traduites (tableau depuis le JSON)
  const cards = t("whyChoose.cards", { returnObjects: true });

  return (
    <section id="why-choose" className="bg-gray-50 transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* ---------- Colonne 1 : bloc rouge (w-full, padding fluide) ---------- */}
        <div className="flex w-full flex-col justify-between rounded-lg bg-red-600 p-6 text-white md:p-8">
          <div>
            <h3 className="text-2xl font-bold">{t("whyChoose.title")}</h3>
            <p className="mt-4 text-sm leading-6 text-red-50">
              {t("whyChoose.description")}
            </p>
          </div>
          {/* Bouton "Learn More" : défilement lent JS vers #about
              (le CSS smooth est retiré, sans onClick => saut instantané) */}
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("about", 1500);
            }}
            className="mt-6 inline-block rounded-full bg-white px-6 py-2 text-center text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            {t("whyChoose.button")}
          </a>
        </div>

        {/* ---------- Colonnes 2-4 : cartes blanches ---------- */}
        {cards.map((card, index) => (
          <div
            key={card.title}
            className="flex w-full flex-col items-center rounded-lg bg-white p-6 text-center shadow-md transition-colors duration-300 dark:bg-gray-700 dark:shadow-lg dark:shadow-black/30"
          >
            {/* Icône dans un cercle rouge clair */}
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-600/20 dark:text-red-400">
              {cardIcons[index % cardIcons.length]}
            </span>
            <h4 className="mt-4 text-base font-bold text-gray-900 dark:text-white">
              {card.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-300">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
