// ============================================================
// smoothScroll.js — Défilement lent contrôlé en JS (1500ms)
// - Remplace le CSS `scroll-behavior: smooth` (trop rapide, non
//   paramétrable) par une animation requestAnimationFrame avec
//   easing easeInOutQuad (démarrage/arrivée en douceur).
// - Offset -80px : compense la Navbar sticky (h-16 = 64px + marge).
// - Usage : onClick={(e) => { e.preventDefault();
//   smoothScrollTo('about', 1500); }} — le preventDefault empêche
//   le saut natif instantané (aucun conflit avec le CSS).
// ============================================================

export const smoothScrollTo = (targetId, duration = 1500) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset - 80; // -80 pour la navbar
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // Fonction d'easing pour un effet plus naturel (easeInOutQuad)
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};
