import { useTranslation } from "react-i18next";
import { about } from "../data/mockData";

// ============================================================
// AboutSection — "Learn More About Us" (traduite)
// - Textes via t('about.*') : titre, paragraphes, points, bouton.
// - Points : t('about.points', { returnObjects: true }) -> .map().
// - Titre accentué : les 2 derniers mots en rouge (EN "About Us",
//   FR "Sur Nous", DE "Über Uns") — découpe programmatique.
// - NON traduit (règle) : images, numéro de téléphone.
// - Petit label "About Us" : sans clé i18n, gardé depuis mockData.
// ============================================================
export default function AboutSection() {
  const { t } = useTranslation();

  // Découpe du titre : début gris + 2 derniers mots en rouge
  const titleWords = t("about.title").split(" ");
  const titleStart = titleWords.slice(0, -2).join(" ");
  const titleAccent = titleWords.slice(-2).join(" ");

  // Points de la liste (tableau depuis le JSON)
  const points = t("about.points", { returnObjects: true });

  return (
    <section id="about" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Petit label + titre centrés comme sur la maquette */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          {about.sectionLabel}
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {titleStart} <span className="text-red-600">{titleAccent}</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* ---------- Colonne gauche : image + contact ---------- */}
          <div>
            <img
              src={about.imageMain}
              alt="Restaurant Yummy interior"
              className="h-auto w-full rounded-lg object-cover"
            />
            {/* Bloc blanc avec ombre : Book a Table (break-words : pas de
                débordement du numéro sur très petit écran) */}
            <div className="mt-4 rounded-lg bg-white p-6 text-center shadow-md transition-colors duration-300 dark:bg-gray-800 dark:shadow-lg dark:shadow-black/30">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {t("about.bookTable")}
              </p>
              <p className="mt-1 break-words text-lg font-bold text-red-600 md:text-xl">
                {about.phone}
              </p>
            </div>
          </div>

          {/* ---------- Colonne droite : texte ---------- */}
          <div>
            <p className="text-sm italic leading-6 text-gray-500 dark:text-gray-400">
              {t("about.paragraph1")}
            </p>

            {/* Liste à puces avec coches rouges */}
            <ul className="mt-4 space-y-3">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                  {/* Icône validation rouge */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400">
              {t("about.paragraph2")}
            </p>

            {/* Deuxième image en bas de colonne */}
            <img
              src={about.imageSecondary}
              alt="Delicious dishes"
              className="mt-6 h-auto w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
