import { useState } from "react";
import { useTranslation } from "react-i18next";

// ============================================================
// BookingSection — "Book Your Stay With Us" (traduite)
// - Titre, placeholders, aria-labels date/heure et bouton via
//   t('booking.*'). Accent rouge sur les 3 derniers mots du titre
//   (EN "Stay With Us" identique à l'original).
// - NON traduit (règle/fonctionnel) : image, messages de validation
//   (pas de clés prévues), contenu de l'alert() (valeurs saisies).
// - Grille grid-cols-1 -> lg:grid-cols-2, lignes grid-cols-1 ->
//   sm:grid-cols-3 (1 colonne à 320px, donc jamais serré), champs
//   w-full, validation custom + dark:, `noValidate` (messages custom).
// - Gauche : image /img/reservation.jpg en h-full object-cover.
// - Droite : formulaire contrôlé (formData), submit -> alert().
// ============================================================

// Valeurs initiales du formulaire
const initialForm = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  people: "",
  message: "",
};

// Classe de base des champs ; la bordure passe en rouge si erreur.
// Variantes dark: : fond sombre + texte clair. En erreur on ajoute aussi
// dark:border-red-500 (sinon dark:border-gray-600 gagnerait en mode sombre).
const baseInputClass =
  "border rounded-md p-3 w-full bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500";
const fieldClass = (hasError) =>
  `${baseInputClass} ${hasError ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-600"}`;

// Petit texte d'erreur rouge sous un champ (classes spec : text-red-500)
function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-500 dark:text-red-400">{message}</p>;
}

export default function BookingSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialForm);
  // Erreurs de validation par champ : { name: "...", email: "...", ... }
  const [errors, setErrors] = useState({});
  // Envoi FormSubmit : spinner bouton + bandeau de statut traduit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"

  // Mise à jour d'un champ + efface son erreur (et le statut d'envoi) dès qu'on retape
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitStatus(null);
  };

  // Validation métier traduite (t) : nom non vide, email avec @ et .,
  // date requise PUIS non passée (2 messages distincts), heure requise,
  // personnes > 0. Chaque champ invalide a sa bordure rouge via
  // fieldClass(errors.*) + message <FieldError/> dédié.
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = t("booking.errors.nameRequired");
    if (
      !formData.email.includes("@") ||
      !formData.email.includes(".")
    )
      newErrors.email = t("booking.errors.emailInvalid");
    if (!formData.date) {
      newErrors.date = t("booking.errors.dateRequired");
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(`${formData.date}T00:00:00`);
      if (selected < today)
        newErrors.date = t("booking.errors.datePast");
    }
    if (!formData.time)
      newErrors.time = t("booking.errors.timeRequired");
    if (!formData.people || Number(formData.people) <= 0)
      newErrors.people = t("booking.errors.peopleMin");
    return newErrors;
  };

  // Envoi : bloque si erreurs, sinon POST vers FormSubmit (AJAX, sans
  // backend). endpoint : https://formsubmit.co/ajax/fandresenanatolo@gmail.com
  // NOTE : 1er envoi => FormSubmit expédie un email de vérification à
  // cette adresse ; cliquer son lien active la réception des réservations.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitStatus(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/fandresenanatolo@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            people: formData.people,
            message: formData.message,
            _subject: "Nouvelle réservation - Yummy Restaurant",
            _template: "table",
          }),
        }
      );
      if (response.ok) {
        setSubmitStatus("success");
        setFormData(initialForm); // réinitialise le formulaire après envoi
      } else {
        setSubmitStatus("error");
      }
    } catch {
      // Erreur réseau (hors-ligne, CORS...) : bandeau rouge traduit
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-gray-50 transition-colors duration-300 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Titre */}
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
          Book A Table
        </p>
        <h2 className="mt-1 text-center text-3xl font-bold text-gray-900 dark:text-white">
          {t("booking.title").split(" ").slice(0, -3).join(" ")}{" "}
          <span className="text-red-600">
            {t("booking.title").split(" ").slice(-3).join(" ")}
          </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* ---------- Colonne gauche : image ---------- */}
          <div className="min-h-80 overflow-hidden rounded-lg">
            <img
              src="/img/reservation.jpg"
              alt="Table réservée au restaurant Yummy"
              loading="lazy"
              className="h-full min-h-80 w-full object-cover"
            />
          </div>

          {/* ---------- Colonne droite : formulaire ---------- */}
          {/* noValidate : nos messages traduits priment sur les bulles natives.
              Les attributs `required` restent en marqueurs sémantiques/a11y. */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-lg bg-white p-6 shadow-md transition-colors duration-300 sm:p-8 dark:bg-gray-700 dark:shadow-lg dark:shadow-black/30"
          >
            {/* Ligne Nom / Email / Téléphone */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder={t("booking.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={fieldClass(errors.name)}
                />
                <FieldError message={errors.name} />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={t("booking.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClass(errors.email)}
                />
                <FieldError message={errors.email} />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("booking.phone")}
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClass(false)}
                />
              </div>
            </div>

            {/* Ligne Date / Heure / Personnes */}
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <input
                  type="date"
                  name="date"
                  aria-label={t("booking.date")}
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className={fieldClass(errors.date)}
                />
                <FieldError message={errors.date} />
              </div>
              <div>
                <input
                  type="time"
                  name="time"
                  aria-label={t("booking.time")}
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className={fieldClass(errors.time)}
                />
                <FieldError message={errors.time} />
              </div>
              <div>
                <input
                  type="number"
                  name="people"
                  placeholder={t("booking.people")}
                  min="1"
                  value={formData.people}
                  onChange={handleChange}
                  required
                  className={fieldClass(errors.people)}
                />
                <FieldError message={errors.people} />
              </div>
            </div>

            {/* Message */}
            <textarea
              name="message"
              placeholder={t("booking.message")}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`${fieldClass(false)} mt-4 resize-none`}
            />

            {/* Bandeau de statut (traduit, annoncé aux lecteurs d'écran) */}
            {submitStatus === "success" && (
              <p
                role="status"
                className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-center text-sm text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                {t("booking.success")}
              </p>
            )}
            {submitStatus === "error" && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300"
              >
                {t("booking.error")}
              </p>
            )}

            {/* Bouton d'envoi : désactivé + libellé "Envoi..." pendant l'envoi */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t("booking.submitting") : t("booking.button")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
