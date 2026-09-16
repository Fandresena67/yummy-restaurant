// ============================================================
// mockData.js — Données centralisées du site Yummy
// Toutes les images vivent dans public/img/ -> chemins en /img/...
// Ce fichier évite de polluer les composants avec du texte en dur.
// ============================================================

// ---------- Navbar ----------
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Chefs", href: "#chefs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

// ---------- Langues (sélecteur de langue Navbar) ----------
export const languages = [
  { code: "EN", name: "English", flag: "🇬🇧" },
  { code: "FR", name: "Français", flag: "🇫🇷" },
  { code: "DE", name: "Deutsch", flag: "🇩🇪" },
];

// ---------- Hero ----------
export const hero = {
  title: "Enjoy Your Healthy Delicious Food",
  subtitle:
    "We are team of talented designers making websites with Bootstrap",
  ctaPrimary: { label: "Book a Table", href: "#booking" },
  ctaSecondary: { label: "Watch Video", href: "#about" },
  image: "/img/hero-img.png",
};

// ---------- About ----------
export const about = {
  sectionLabel: "About Us",
  titlePrefix: "Learn More",
  titleAccent: "About Us",
  imageMain: "/img/about.jpg",
  imageSecondary: "/img/about-2.jpg",
  phoneLabel: "Book a Table",
  phone: "+1 5589 55488 55",
  points: [
    "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit.",
    "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ],
  description:
    "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
};

// ---------- Why Choose Yummy ----------
export const whyChoose = {
  highlight: {
    title: "Why Choose Yummy",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    cta: { label: "Learn More", href: "#about" },
  },
  cards: [
    {
      title: "Corporis voluptates officia",
      text: "Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip.",
    },
    {
      title: "Ullamco laboris ladore pan",
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    },
    {
      title: "Labore consequatur incidid",
      text: "Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere.",
    },
  ],
};

// ---------- Stats ----------
// Libellés alignés sur la maquette : Clients, Menus, Chefs, Years.
export const stats = [
  { value: 232, label: "Clients" },
  { value: 521, label: "Menus" },
  { value: 1453, label: "Chefs" },
  { value: 32, label: "Years" },
];

// ---------- Menu ----------
export const menuCategories = ["Starters", "Breakfast", "Lunch", "Dinner"];

export const menuItems = [
  {
    id: 1,
    name: "Magnam Tiste",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$5.95",
    image: "/img/menu/menu-item-1.png",
    category: "Starters",
  },
  {
    id: 2,
    name: "Aut Luia",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$14.95",
    image: "/img/menu/menu-item-2.png",
    category: "Starters",
  },
  {
    id: 3,
    name: "Est Eligendi",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$8.95",
    image: "/img/menu/menu-item-3.png",
    category: "Starters",
  },
  {
    id: 4,
    name: "Eos Luibusdam",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$12.95",
    image: "/img/menu/menu-item-4.png",
    category: "Starters",
  },
  {
    id: 5,
    name: "Eos Luibusdam",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$12.95",
    image: "/img/menu/menu-item-5.png",
    category: "Starters",
  },
  {
    id: 6,
    name: "Laboriosam Direva",
    description: "Lorem, deren, trataro, filede, nerada",
    price: "$9.95",
    image: "/img/menu/menu-item-6.png",
    category: "Starters",
  },
];

// ---------- Testimonials ----------
export const testimonials = [
  {
    id: 1,
    // Texte forcé de la maquette (template2.png) : "Sara Willson", "Store Owner".
    // Les vraies données seront corrigées plus tard si besoin.
    name: "Sara Willson",
    role: "Store Owner",
    stars: 5,
    image: "/img/testimonials/testimonials-1.jpg",
    text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.",
  },
  {
    id: 2,
    name: "Saul Goodman",
    role: "Ceo & Founder",
    stars: 5,
    image: "/img/testimonials/testimonials-2.jpg",
    text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.",
  },
  {
    id: 3,
    name: "Jena Karlis",
    role: "Store Owner",
    stars: 5,
    image: "/img/testimonials/testimonials-3.jpg",
    text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.",
  },
  {
    id: 4,
    name: "John Larson",
    role: "Entrepreneur",
    stars: 5,
    image: "/img/testimonials/testimonials-4.jpg",
    text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et.",
  },
];

// ---------- Events ----------
export const events = [
  {
    id: 1,
    title: "Private Parties",
    price: "$289",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image: "/img/events-1.jpg",
  },
  {
    id: 2,
    title: "Birthday Parties",
    price: "$499",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image: "/img/events-2.jpg",
  },
  {
    id: 3,
    title: "Wedding Parties",
    price: "$899",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image: "/img/events-3.jpg",
  },
  {
    id: 4,
    title: "Custom Parties",
    price: "$99",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image: "/img/events-4.jpg",
  },
];

// ---------- Chefs ----------
export const chefs = [
  {
    id: 1,
    name: "Walter White",
    role: "Master Chef",
    description:
      "Velit aut quia fugit et et. Dolorum ea voluptate vel tempore tenetur ipsa quae aut.",
    image: "/img/chefs/chefs-1.jpg",
  },
  {
    id: 2,
    name: "Sarah Jhonson",
    role: "Patissier",
    description:
      "Quo esse repellendus quia id. Est eum et accusantium pariatur fugit nihil minima suscipit corporis.",
    image: "/img/chefs/chefs-2.jpg",
  },
  {
    id: 3,
    name: "William Anderson",
    role: "Cook",
    description:
      "Vero omnis enim consequatur. Voluptas consectetur unde qui molestiae deserunt.",
    image: "/img/chefs/chefs-3.jpg",
  },
];

// ---------- Gallery ----------
export const galleryImages = [
  "/img/gallery/gallery-1.jpg",
  "/img/gallery/gallery-2.jpg",
  "/img/gallery/gallery-3.jpg",
  "/img/gallery/gallery-4.jpg",
  "/img/gallery/gallery-5.jpg",
  "/img/gallery/gallery-6.jpg",
  "/img/gallery/gallery-7.jpg",
  "/img/gallery/gallery-8.jpg",
];

// ---------- Footer / Contact ----------
export const footerInfo = {
  address: "A108 Adam Street, New York, NY 535022",
  phone: "+1 5589 55488 55",
  email: "info@example.com",
  hours: "Mon-Sat: 11AM - 23PM",
  // Liens rapides : label + ancre vers l'id de section correspondante
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Events", href: "#events" },
    { label: "Chefs", href: "#chefs" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  // Réseaux/contact : `icon` = clé mappée vers un SVG dans Footer.jsx
  // (on garde les données sérialisables, pas de JSX dans mockData)
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com", icon: "facebook" },
    { name: "WhatsApp", url: "https://wa.me/155895548855", icon: "whatsapp" },
    { name: "Email", url: "mailto:contact@yummy.com", icon: "email" },
  ],
  copyright: "© Copyright Yummy. All Rights Reserved",
};
