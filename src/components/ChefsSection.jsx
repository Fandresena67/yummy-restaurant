import { useTranslation } from "react-i18next";
import { chefs } from "../data/mockData";

// ============================================================
// ChefsSection — "Our Professional Chefs" (traduite)
// - Titre via t('chefs.title'), accent rouge sur les 2 derniers
//   mots (EN "Professional Chefs" identique à l'original).
// - NON traduit (règle) : noms (Walter White...), rôles
//   (Master Chef, Patissier, Cook), descriptions mock, images.
// - Grille grid-cols-1 -> md:grid-cols-3 (pleine largeur mobile)
// - Carte : image w-full h-80 -> md:h-96 object-cover (jamais de
//   dépassement, carte en overflow-hidden)
// - Sociaux : visibles au survol souris (md:group-hover) MAIS aussi
//   toujours visibles au tactile (opacity-100 de base, pas de hover
//   sur mobile) + focus clavier via group-focus-within
// - Images réelles : /img/chefs/chefs-1.jpg ... chefs-3.jpg (pluriel)
// ============================================================

// Libellés courts pour les pastilles sociales au survol
const socials = ["T", "F", "I"];

export default function ChefsSection() {
  const { t } = useTranslation();

  // Titre : début gris + 2 derniers mots en rouge
  const titleWords = t("chefs.title").split(" ");

  return (
    <section id="chefs" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Chefs
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {titleWords.slice(0, -2).join(" ")}{" "}
          <span className="text-red-600">{titleWords.slice(-2).join(" ")}</span>
        </h2>

        {/* ---------- Grille des chefs ---------- */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {chefs.map((chef) => (
            <article
              key={chef.id}
              className="group overflow-hidden rounded-lg bg-white shadow-md transition-colors duration-300 dark:bg-gray-800 dark:shadow-lg dark:shadow-black/30"
            >
              {/* Image avec overlay sociaux au survol */}
              <div className="relative overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  loading="lazy"
                  className="h-80 w-full max-w-full object-cover object-top transition-transform duration-300 group-hover:scale-105 md:h-96"
                />
                {/* Réseaux sociaux : toujours visibles au tactile, révélés
                    au survol souris sur desktop (md), accessibles au clavier */}
                <div className="absolute inset-x-0 top-4 flex justify-center gap-2 opacity-100 transition-opacity duration-300 group-focus-within:opacity-100 md:opacity-0 md:group-hover:opacity-100">
                  {socials.map((label) => (
                    <a
                      key={label}
                      href="#chefs"
                      aria-label={`${label} — ${chef.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-gray-700 shadow transition hover:bg-red-600 hover:text-white dark:bg-gray-700 dark:text-gray-200"
                      >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bloc texte */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {chef.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{chef.role}</p>
                <p className="mt-3 text-sm italic leading-6 text-gray-500 dark:text-gray-400">
                  {chef.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
