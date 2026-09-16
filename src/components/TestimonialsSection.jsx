import { useState } from "react";
import { useTranslation } from "react-i18next";
import { testimonials } from "../data/mockData";

// ============================================================
// TestimonialsSection — Carrousel de témoignages (traduit)
// - currentIndex (useState) : seul le témoignage actif s'affiche.
// - prevTestimonial / nextTestimonial : navigation circulaire
//   (boucle début <-> fin).
// - Flèches absolues (left-4 / right-4, centrées verticalement),
//   style p-2 rounded-full bg-white shadow-md, hover rouge.
//   Conteneur relative + px-12 md:px-16 (pas de chevauchement texte).
// - Transition douce : figure remontée (key) + transition-opacity.
// - Pagination dynamique depuis mockData (1 point / témoignage),
//   actif bg-red-600, clic = saut direct.
// - Titre : t('testimonials.title'). Rôle : t('testimonials.role')
//   UNIQUEMENT pour "Store Owner" (autres rôles mock intacts).
// - aria-labels flèches : t('testimonials.prev' / 'next').
// - NON traduit : noms, citation latin, images.
// ============================================================
export default function TestimonialsSection() {
  const { t } = useTranslation();

  // Index du témoignage actif
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonial = testimonials[currentIndex];

  // Saut direct (pagination) avec boucle de sécurité
  const goTo = (index) => {
    const total = testimonials.length;
    setCurrentIndex(((index % total) + total) % total);
  };

  // Suivant : boucle au début si on dépasse la fin
  const nextTestimonial = () => goTo(currentIndex + 1);
  // Précédent : boucle à la fin si on est au début
  const prevTestimonial = () => goTo(currentIndex - 1);

  // Rôle traduit seulement pour "Store Owner", autres rôles mock intacts
  const roleLabel =
    testimonial.role === "Store Owner"
      ? t("testimonials.role")
      : testimonial.role;

  // Style partagé des flèches (absolute, cercle blanc, hover rouge)
  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-gray-700 shadow-md transition-colors hover:bg-red-600 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-red-600 dark:hover:text-white";

  return (
    <section id="testimonials" className="bg-gray-50 transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {/* Titre (traduit) */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Testimonials
        </p>
        <h2 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
          {t("testimonials.title").split(" ").slice(0, -3).join(" ")}{" "}
          <span className="text-red-600">
            {t("testimonials.title").split(" ").slice(-3).join(" ")}
          </span>
        </h2>

        {/* ---------- Carrousel : conteneur relative + padding flèches ---------- */}
        <div className="relative mt-10 px-12 md:px-16">
          {/* Bouton Précédent (gauche, centré verticalement) */}
          <button
            type="button"
            onClick={prevTestimonial}
            aria-label={t("testimonials.prev")}
            className={`${arrowClass} left-4`}
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

          {/* Carte témoignage (key = réinitialise + transition à chaque changement) */}
          <figure
            key={testimonial.id}
            className="transition-opacity duration-500"
          >
            {/* Citation entre guillemets (taille fluide mobile -> desktop) */}
            <blockquote className="text-base italic leading-8 text-gray-600 md:text-lg dark:text-gray-300">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Avatar rond (compact sur mobile) */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="mx-auto mt-6 h-16 w-16 rounded-full object-cover shadow-md md:h-20 md:w-20"
            />

            {/* Nom (non traduit) + rôle (traduit si Store Owner) */}
            <figcaption className="mt-4 font-bold text-gray-900 dark:text-white">
              {testimonial.name}
            </figcaption>
            <p className="text-sm text-gray-500 dark:text-gray-400">{roleLabel}</p>

            {/* Étoiles jaunes */}
            <div
              className="mt-2 flex justify-center gap-1 text-yellow-500"
              aria-label={`${testimonial.stars} étoiles sur 5`}
            >
              {Array.from({ length: testimonial.stars }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>
          </figure>

          {/* Bouton Suivant (droite, centré verticalement) */}
          <button
            type="button"
            onClick={nextTestimonial}
            aria-label={t("testimonials.next")}
            className={`${arrowClass} right-4`}
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

        {/* ---------- Pagination dynamique, reflète l'index actif ---------- */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Aller au témoignage ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${
                index === currentIndex ? "bg-red-600" : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
