import { useTranslation } from "react-i18next";
import { stats } from "../data/mockData";

// ============================================================
// StatsSection — Bannière de statistiques (traduite)
// - Libellés via t('stats.*') : clé déduite du label mock
//   ("Clients" -> t('stats.clients')). Chiffres NON traduits.
// - mockData.stats conservé pour les valeurs numériques.
// - Fond /img/stats-bg.jpg + overlay bg-black/60, section w-full
//   overflow-hidden, chiffres text-2xl -> md:text-4xl.
// ============================================================
export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section id="stats" className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat">
      {/* Image de fond via style inline (chemin public/img) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img/stats-bg.jpg)" }}
        aria-hidden="true"
      />
      {/* Calque sombre pour la lisibilité (renforcé en mode sombre) */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/75" aria-hidden="true" />

      {/* Contenu au-dessus de l'overlay */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-16 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-2xl font-bold text-white md:text-4xl">{stat.value}</p>
            {/* Clé déduite : "Clients" -> stats.clients, etc. */}
            <p className="mt-2 text-sm text-gray-300 dark:text-gray-400">
              {t(`stats.${stat.label.toLowerCase()}`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
