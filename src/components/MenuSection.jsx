import { useState } from "react";
import { useTranslation } from "react-i18next";
import { menuCategories, menuItems } from "../data/mockData";

// ============================================================
// MenuSection — "Check Our Yummy Menu" (traduite)
// - Titre : t('menu.title'). Onglets + sous-titre catégorie :
//   t('menu.starters/breakfast/lunch/dinner').
// - FILTRE INTACT : l'état interne reste la chaîne EN de mockData
//   ("Starters"...), seule l'AFFICHAGE est traduit via categoryKeys.
//   Ainsi .filter() continue de matcher item.category.
// - NON traduit (règle) : noms de plats + descriptions mock.
// - NOTE mock : les 6 plats sont en "Starters" -> fallback sur tous
//   les plats si la catégorie filtrée est vide.
// ============================================================

// Clé i18n d'affichage pour chaque catégorie interne (EN)
const categoryKeys = {
  Starters: "starters",
  Breakfast: "breakfast",
  Lunch: "lunch",
  Dinner: "dinner",
};

export default function MenuSection() {
  const { t } = useTranslation();

  // Catégorie active (clé interne EN), "Starters" par défaut
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);

  // Filtrage des plats selon l'onglet actif (clés EN, non traduites)...
  const filtered = menuItems.filter(
    (item) => item.category === activeCategory
  );
  // ...avec fallback sur tous les plats si la catégorie est vide en mock
  const dishesToShow = filtered.length > 0 ? filtered : menuItems;

  // Libellé traduit de l'onglet / sous-titre actif
  const categoryLabel = (category) =>
    t(`menu.${categoryKeys[category] ?? "starters"}`);

  return (
    <section id="menu" className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre centré (traduit) */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Our Menu
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("menu.title").split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-red-600">
            {t("menu.title").split(" ").slice(-2).join(" ")}
          </span>
        </h2>

        {/* ---------- Barre d'onglets : scroll horizontal sur mobile
            (overflow-x-auto + nowrap + onglets shrink-0), centrée et
            multiligne à partir de md ---------- */}
        <div className="mt-8 flex items-center justify-start gap-6 overflow-x-auto whitespace-nowrap px-2 py-1 md:flex-wrap md:justify-center md:overflow-visible md:whitespace-normal">
          {menuCategories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 border-b-2 pb-1 text-sm font-semibold transition ${
                  isActive
                    ? "border-red-600 text-red-600 dark:border-red-400 dark:text-red-400"
                    : "border-transparent text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                }`}
              >
                {categoryLabel(category)}
              </button>
            );
          })}
        </div>

        {/* Sous-titre de la catégorie active (traduit) */}
        <p className="mt-4 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
          {categoryLabel(activeCategory)}
        </p>

        {/* ---------- Grille de plats (noms/descriptions mock intacts) ---------- */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dishesToShow.map((dish) => (
            <article key={dish.id} className="text-center">
              {/* Image ronde centrée (224px < 288px utiles à 320px : pas de
                  dépassement, max-w-full en garde-fou) */}
              <img
                src={dish.image}
                alt={dish.name}
                loading="lazy"
                className="mx-auto h-56 w-56 max-w-full rounded-full object-cover"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {dish.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {dish.description}
              </p>
              <p className="mt-2 font-bold text-red-600">{dish.price}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
