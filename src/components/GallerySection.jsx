import { useState } from "react";
import { useTranslation } from "react-i18next";
import { galleryImages } from "../data/mockData";

// ============================================================
// GallerySection — "Check Our Gallery" (traduite)
// - Titre via t('gallery.title'), accent rouge sur les 2 derniers
//   mots (EN "Our Gallery" identique à l'original).
// - Fond blanc, py-16, titre centré.
// - CARROUSEL : image principale (activeIndex via useState) +
//   flèches Prev/Next (navigation circulaire) + pagination cliquable.
// - Image principale w-full h-80 -> md:h-96 dans conteneur
//   overflow-hidden (zoom hover contenu, aucun débordement).
// - Bandeau miniatures à défilement horizontal (overflow-x-auto),
//   clic sur une miniature = saut direct, miniature active cerclée rouge.
// - Pagination flex-wrap (aucun débordement même à 320px).
// ============================================================
export default function GallerySection() {
  const { t } = useTranslation();
  // Index de l'image visible
  const [activeIndex, setActiveIndex] = useState(0);
  const total = galleryImages.length;

  // Navigation circulaire
  const goTo = (index) => {
    setActiveIndex(((index % total) + total) % total);
  };
  const goPrev = () => goTo(activeIndex - 1);
  const goNext = () => goTo(activeIndex + 1);

  return (
    <section id="gallery" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Gallery
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("gallery.title").split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-red-600">
            {t("gallery.title").split(" ").slice(-2).join(" ")}
          </span>
        </h2>

        {/* ---------- Image principale + flèches ---------- */}
        <div className="group relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg">
          <img
            key={galleryImages[activeIndex]}
            src={galleryImages[activeIndex]}
            alt={`Restaurant gallery ${activeIndex + 1}`}
            loading="lazy"
            className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-96"
          />
          {/* Overlay + loupe au survol */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
          </div>

          {/* Flèche Précédent (à gauche de l'image) */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-red-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flèche Suivant (à droite de l'image) */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition hover:bg-red-600 hover:text-white dark:bg-gray-800 dark:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* ---------- Pagination cliquable (flex-wrap : tient à 320px) ---------- */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Aller à l'image ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === activeIndex ? "bg-red-600" : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* ---------- Miniatures à défilement horizontal ---------- */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {galleryImages.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Voir l'image ${index + 1}`}
              className={`h-20 w-28 shrink-0 overflow-hidden rounded-md transition ${
                index === activeIndex
                  ? "ring-2 ring-red-600 ring-offset-2 dark:ring-offset-gray-900"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
