import { useTranslation } from "react-i18next";
import { events } from "../data/mockData";

// ============================================================
// EventsSection — Events (traduite)
// - Titre de section : t('events.title') (ajouté, la maquette
//   n'affichait que les cartes).
// - Titres cartes : t('events.private/birthday/wedding'), mappés par
//   position sur les 3 events visibles (mock : Private/Birthday/
//   Wedding dans cet ordre). Descriptions : t('events.description').
// - NON traduit (règle) : prix ($289...), images.
// - Grille grid-cols-1 -> md:grid-cols-3, cartes h-72 -> md:h-96,
//   overlay bg-black/50, hover:scale-105 contenu (overflow-hidden).
// - NOTE : mockData contient 4 events, on affiche les 3 premiers
//   pour coller à la maquette (le 4e "Custom Parties" servira plus tard)
// ============================================================

// Clé i18n du titre pour chaque carte visible (par position)
const eventTitleKeys = ["private", "birthday", "wedding"];

export default function EventsSection() {
  const { t } = useTranslation();

  // Les 3 events de la maquette
  const visibleEvents = events.slice(0, 3);

  return (
    <section id="events" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre de section (traduit) */}
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("events.title")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {visibleEvents.map((event, index) => (
            <article
              key={event.id}
              className="group relative h-72 w-full overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-300 hover:scale-105 md:h-96"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              {/* Overlay sombre pour lisibilité (renforcé en mode sombre,
                  images de fond inchangées) */}
              <div
                className="absolute inset-0 bg-black/50 dark:bg-black/80"
                aria-hidden="true"
              />

              {/* Contenu positionné en bas, texte blanc */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                {/* Titre traduit par position, prix mock intact */}
                <h3 className="text-2xl font-bold text-white">
                  {t(`events.${eventTitleKeys[index]}`)}
                </h3>
                <p className="mt-1 font-bold text-red-500">{event.price}</p>
                <p className="mt-2 text-sm leading-6 text-gray-200">
                  {t("events.description")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
