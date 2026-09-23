/* ============================================================
   loader.js — Animación de la pantalla de carga (preloader)
   Enciende los 4 símbolos elementales de izquierda a derecha
   y luego desvanece el overlay.
   ============================================================ */

(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const simbolos = preloader.querySelectorAll('.preloader__simbolo');
  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.body.style.overflow = 'hidden';

  const ocultarPreloader = () => {
    preloader.classList.add('oculto');
    document.body.style.overflow = '';
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  };

  if (prefiereMenosMovimiento) {
    simbolos.forEach((s) => s.classList.add('encendido'));
    ocultarPreloader();
    return;
  }

  const DEMORA_ENTRE_SIMBOLOS = 260; // ms
  const ESPERA_FINAL = 550; // ms tras encender el último símbolo

  simbolos.forEach((simbolo, indice) => {
    setTimeout(() => {
      simbolo.classList.add('encendido');
    }, indice * DEMORA_ENTRE_SIMBOLOS);
  });

  const tiempoTotal = simbolos.length * DEMORA_ENTRE_SIMBOLOS + ESPERA_FINAL;

  window.addEventListener('load', () => {
    setTimeout(ocultarPreloader, tiempoTotal);
  });

  // Salvaguarda: si "load" ya disparó o tarda demasiado, ocultar de todas formas.
  setTimeout(ocultarPreloader, tiempoTotal + 2500);
})();
