# 🍽️ Yummy Restaurant

Un site web vitrine moderne pour un restaurant, avec système de traduction multilingue, mode sombre, carrousels interactifs et formulaire de réservation fonctionnel.

![Yummy Restaurant](public/img/hero-img.png)

👉 **[https://fandresena-restaurant.vercel.app](https://fandresena-restaurant.vercel.app)**

---

## ✨ Fonctionnalités

- 🌍 **Multilingue :** Anglais, Français, Allemand (avec react-i18next)
- 🌙 **Mode sombre :** Basculement clair/sombre avec persistance (localStorage)
- 📱 **100% Responsive :** Mobile, tablette, desktop
- 🎠 **Carrousels interactifs :** Témoignages et Galerie
- 📝 **Formulaire de réservation :** Envoi d'emails via FormSubmit
- ⚡ **Smooth Scroll :** Navigation fluide entre les sections
- 🎨 **Design moderne :** Tailwind CSS + animations
- 🔍 **SEO-friendly :** Balises meta, lang dynamique

---

## 🛠️ Technologies Utilisées

| Technologie | Rôle |
|-------------|------|
| React | Bibliothèque UI |
| Vite | Bundler et serveur de développement |
| Tailwind CSS | Framework CSS utilitaire |
| react-i18next | Internationalisation (i18n) |
| JavaScript (ES6+) | Langage principal |
| FormSubmit | Service d'envoi d'emails |
| Vercel | Hébergement et déploiement |

---

## 📂 Structure du Projet

```text
yummy-restaurant/
├── public/
│   └── img/                    # Toutes les images du site
│       ├── chefs/              # Photos des chefs
│       ├── menu/               # Photos des plats
│       ├── gallery/            # Photos de la galerie
│       └── testimonials/       # Photos des clients
├── src/
│   ├── components/             # Composants React
│   ├── data/
│   │   └── mockData.js         # Données centralisées
│   ├── locales/                # Fichiers de traduction
│   │   ├── en/translation.json
│   │   ├── fr/translation.json
│   │   └── de/translation.json
│   ├── utils/
│   │   └── smoothScroll.js     # Fonction de défilement doux
│   ├── hooks/
│   │   └── useTheme.js         # Hook pour le mode sombre
│   ├── i18n.js                 # Configuration i18next
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Installation et Lancement

### Prérequis

- [Node.js](https://nodejs.org/) (version 18+)
- npm (inclus avec Node.js)

### Étapes

```bash
# 1. Cloner le dépôt
git clone https://github.com/Fandresena67/yummy-restaurant.git

# 2. Aller dans le dossier du projet
cd yummy-restaurant

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev

# 5. Construire pour la production
npm run build

# 6. Prévisualiser le build de production
npm run preview
```

L'application sera ensuite accessible sur `http://localhost:5173`.

---

## 🌍 Configuration Multilingue

Le site supporte 3 langues :

- 🇬🇧 Anglais (`en`)
- 🇫🇷 Français (`fr`)
- 🇩🇪 Allemand (`de`)

La configuration se fait avec `react-i18next` dans `src/i18n.js`, avec détection automatique de la langue du navigateur et persistance du choix utilisateur.

### Comment ajouter une nouvelle langue

1. **Créer le fichier de traduction :**
   ```
   src/locales/XX/translation.json
   ```
   Remplacez `XX` par le code de la langue (ex : `es` pour l'espagnol). Copiez la structure d'un fichier existant (ex : `en/translation.json`) et traduisez les valeurs.

2. **Déclarer la langue dans `src/i18n.js` :**
   ```js
   import translationXX from './locales/XX/translation.json';

   resources: {
     en: { translation: translationEN },
     fr: { translation: translationFR },
     de: { translation: translationDE },
     xx: { translation: translationXX }, // <-- ajouter ici
   }
   ```

3. **Ajouter le drapeau dans `mockData.languages` :**
   ```js
   // src/data/mockData.js
   languages: [
     // ...
     { code: 'xx', label: 'Español', flag: '🇪🇸' },
   ]
   ```

---

## 📧 Configuration du Formulaire

Le formulaire de réservation (`BookingSection`) utilise [FormSubmit.co](https://formsubmit.co/) pour l'envoi d'emails sans backend.

Endpoint actuel :
```
https://formsubmit.co/ajax/fandresenanatolo@gmail.com
```

### Pour changer l'email destinataire

1. Ouvrez `src/components/BookingSection.jsx`
2. Remplacez `fandresenanatolo@gmail.com` par votre propre adresse (lignes de l'appel `fetch` vers `formsubmit.co/ajax/...`).

> **Note :** La première fois que vous utilisez une nouvelle adresse, FormSubmit envoie un email de vérification. Vous devez cliquer sur le lien d'activation avant de recevoir les réservations.

---

## 🎨 Personnalisation

- **Changer les couleurs :** modifiez les classes utilitaires Tailwind directement dans les composants (ex : `bg-red-600`, `text-red-600`, `hover:bg-red-700`).
- **Changer les images :** remplacez les fichiers dans `public/img/` (chefs, menu, gallery, testimonials, `hero-img.png`, `about.jpg`, etc.) en conservant les mêmes noms, ou mettez à jour les chemins dans `src/data/mockData.js`.
- **Changer le contenu :** modifiez les textes, plats, chefs, témoignages et liens dans `src/data/mockData.js` ainsi que les fichiers `src/locales/*/translation.json` pour chaque langue.

---

## 📱 Responsive

Le site est testé et entièrement fonctionnel sur toutes les tailles d'écran :

| Appareil | Largeur | Statut |
|----------|---------|--------|
| Mobile (iPhone SE) | 320px | ✅ |
| Mobile (iPhone 12) | 375px | ✅ |
| Tablette (iPad) | 768px | ✅ |
| Desktop | 1024px | ✅ |
| Grand écran | 1440px+ | ✅ |

---

## 🚀 Déploiement

Le site est déployé sur **Vercel** : [https://fandresena-restaurant.vercel.app](https://fandresena-restaurant.vercel.app)

Chaque `git push` sur la branche `main` déclenche un redéploiement automatique.

### Déployer votre propre copie sur Vercel

1. Forkez ce dépôt sur GitHub.
2. Créez un compte sur [vercel.com](https://vercel.com) (connexion avec GitHub).
3. Cliquez sur **New Project** → **Import** votre fork.
4. Laissez les réglages par défaut (Framework Preset : Vite, Build Command : `npm run build`, Output Directory : `dist`).
5. Cliquez sur **Deploy**.

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/ma-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Pushez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

## 👤 Auteur

**Fandresena**

- 🌐 Portfolio : [https://fandresena.vercel.app](https://fandresena.vercel.app)
- 🐙 GitHub : [@Fandresena67](https://github.com/Fandresena67)
- 📧 Email : [fandresenanatolo@gmail.com](mailto:fandresenanatolo@gmail.com)

---

## 🙏 Remerciements

- Design inspiré par [BootstrapMade](https://bootstrapmade.com/)
- Icônes SVG par [Lucide](https://lucide.dev/)
- Hébergement par [Vercel](https://vercel.com/)
- Service email par [FormSubmit](https://formsubmit.co/)

---

⭐ **Si ce projet vous a plu, n'hésitez pas à lui donner une étoile sur GitHub !**
