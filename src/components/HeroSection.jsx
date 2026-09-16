import { useTranslation } from "react-i18next";
import { hero } from "../data/mockData";
import { smoothScrollTo } from "../utils/smoothScroll";

// Durée du défilement doux (1,5 s), identique à la Navbar

// ============================================================
// HeroSection — Section Hero Yummy (Phase B : traduite)
// - Textes via t('hero.*') : titre, sous-titre, 2 boutons.
//   Changent instantanément via i18n.changeLanguage() (le hook
//   useTranslation ré-affiche le composant automatiquement).
// - mockData.hero conservé UNIQUEMENT pour le non-textuel :
//   image + hrefs des CTA (aucun texte en dur restant).
// - Audit responsive inchangé : titre text-3xl -> md:text-4xl ->
//   lg:text-6xl, image aspect-square w-64/md:w-80/lg:w-96.
// ============================================================
export default function HeroSection() {
  const { t } = useTranslation();

  // CTA internes : défilement lent JS (le CSS smooth est retiré,
  // sans onClick ces liens sauteraient instantanément).
  const handleCta = (targetId) => (e) => {
    e.preventDefault();
    smoothScrollTo(targetId, 1500);
  };

  return (
    <section id="home" className="bg-gray-50 transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* ---------- Colonne gauche : texte (traduit) ---------- */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-gray-600 lg:mx-0 dark:text-gray-300">
            {t("hero.subtitle")}
          </p>

          {/* Boutons alignés en flex */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            {/* CTA principal rouge */}
            <a
              href={hero.ctaPrimary.href}
              onClick={handleCta(hero.ctaPrimary.href.slice(1))}
              className="rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700"
            >
              {t("hero.bookTable")}
            </a>

            {/* CTA secondaire avec icône play */}
            <a
              href={hero.ctaSecondary.href}
              onClick={handleCta(hero.ctaSecondary.href.slice(1))}
              className="group flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-red-600 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                {/* Icône play */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 translate-x-[1px]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
                </svg>
              </span>
              {t("hero.watchVideo")}
            </a>
          </div>
        </div>

        {/* ---------- Colonne droite : image (non traduite) ---------- */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={hero.image}
            alt="Healthy delicious food"
            className="aspect-square w-64 max-w-full rounded-full object-cover shadow-2xl animate-spin [animation-duration:40s] md:w-80 lg:w-96"
          />
        </div>
      </div>
    </section>
  );
}
