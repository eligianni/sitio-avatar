/* ============================================================
   main.js — Navegación mobile + tarjeta de personaje rotativa
   ============================================================ */

/* ---------- NAVBAR: MENÚ HAMBURGUESA ---------- */
(function () {
  const toggle = document.getElementById('navToggle');
  const lista = document.getElementById('navLista');
  if (!toggle || !lista) return;

  toggle.addEventListener('click', () => {
    const abierto = lista.classList.toggle('abierto');
    toggle.classList.toggle('activo', abierto);
    toggle.setAttribute('aria-expanded', String(abierto));
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  lista.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      lista.classList.remove('abierto');
      toggle.classList.remove('activo');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ---------- FICHAS: HABILIDAD OCULTA (click para revelar) ---------- */
(function () {
  const botones = document.querySelectorAll('.habilidad-oculta');
  if (!botones.length) return;

  botones.forEach((boton) => {
    const pista = boton.querySelector('.habilidad-oculta__pista');
    if (pista) pista.textContent = 'Click para revelar';

    boton.addEventListener('click', () => {
      const revelada = boton.classList.toggle('revelada');
      const pistaTexto = boton.querySelector('.habilidad-oculta__pista');
      if (pistaTexto) pistaTexto.textContent = revelada ? 'Click para ocultar' : 'Click para revelar';
    });
  });
})();

/* ---------- TARJETA DE PERSONAJE ROTATIVA ---------- */
(function () {
  const tarjeta = document.getElementById('tarjetaPersonaje');
  const elNombre = document.getElementById('tarjetaNombre');
  const elRol = document.getElementById('tarjetaRol');
  const elSimbolo = document.getElementById('tarjetaSimbolo');
  const elVisual = document.getElementById('tarjetaVisual');
  const elFoto = document.getElementById('tarjetaFoto');
  const elPlaceholder = document.getElementById('tarjetaPlaceholder');
  const elPuntos = document.getElementById('tarjetaPuntos');
  if (!tarjeta || !elNombre || !elRol || !elSimbolo || !elPuntos) return;

  const simbolosPorElemento = {
    agua: '<svg viewBox="0 0 48 48" fill="none" width="32"><path d="M24 6C24 6 12 22 12 30a12 12 0 0 0 24 0C36 22 24 6 24 6Z" stroke="var(--water-2)" stroke-width="2" stroke-linejoin="round"/></svg>',
    tierra: '<svg viewBox="0 0 48 48" fill="none" width="32"><path d="M6 34 18 14l6 10 4-6 14 26H6Z" stroke="var(--earth-2)" stroke-width="2" stroke-linejoin="round"/></svg>',
    fuego: '<svg viewBox="0 0 48 48" fill="none" width="32"><path d="M24 6c4 8-4 10-4 16a8 8 0 0 0 16 0c0-6-4-8-2-14 6 4 10 12 10 18a16 16 0 0 1-32 0c0-8 6-14 12-20Z" stroke="var(--fire-2)" stroke-width="2" stroke-linejoin="round"/></svg>',
    aire: '<svg viewBox="0 0 48 48" fill="none" width="32"><circle cx="24" cy="24" r="4" stroke="var(--air-1)" stroke-width="2"/><path d="M24 4c8 0 8 10 0 10M44 24c0 8-10 8-10 0M24 44c-8 0-8-10 0-10M4 24c0-8 10-8 10 0" stroke="var(--air-1)" stroke-width="2" stroke-linecap="round"/></svg>',
    ninguno: '<svg viewBox="0 0 48 48" fill="none" width="32"><path d="M24 8c-9 6-9 22 0 32 9-10 9-26 0-32Z" stroke="var(--creature)" stroke-width="2" stroke-linejoin="round"/></svg>'
  };

  const personajes = [
    { nombre: 'Aang', elemento: 'aire', rol: 'El último Avatar, sobreviviente de los Nómadas Aire. Pasó 100 años congelado en un iceberg y ahora debe dominar los cuatro elementos para detener la guerra.', img: 'assets/img/aang-agua.png' },
    { nombre: 'Katara', elemento: 'agua', rol: 'Maestra Agua de la Tribu del Sur. Encontró a Aang en el iceberg y se convirtió en su primera maestra de Agua control.', img: 'assets/img/personajes/katara.jpg' },
    { nombre: 'Sokka', elemento: 'ninguno', rol: 'Guerrero de la Tribu Agua del Sur. Sin dominio elemental, compensa con estrategia, ingenio y un humor que no siempre cae bien.', img: 'assets/img/personajes/sokka.jpg' },
    { nombre: 'Toph', elemento: 'tierra', rol: 'Maestra Tierra invidente y la mejor de su generación. "Ve" a través de las vibraciones del suelo, algo que la hace casi imposible de engañar.', img: 'assets/img/personajes/toph.jpg' },
    { nombre: 'Zuko', elemento: 'fuego', rol: 'Príncipe exiliado de la Nación del Fuego. Persigue al Avatar para recuperar su honor y el trono que su padre le arrebató.', img: 'assets/img/personajes/zuko.jpg' }
  ];

  const INTERVALO_MS = 4200;
  let indiceActual = 0;
  let temporizador = null;

  function construirPuntos() {
    elPuntos.innerHTML = '';
    personajes.forEach((_, indice) => {
      const punto = document.createElement('button');
      punto.type = 'button';
      punto.setAttribute('role', 'tab');
      punto.setAttribute('aria-label', `Mostrar a ${personajes[indice].nombre}`);
      if (indice === indiceActual) punto.classList.add('activo');
      punto.addEventListener('click', () => mostrarPersonaje(indice, true));
      elPuntos.appendChild(punto);
    });
  }

  function mostrarPersonaje(indice, reiniciarTemporizador) {
    indiceActual = indice;
    const personaje = personajes[indiceActual];

    tarjeta.classList.add('cambiando');
    window.setTimeout(() => {
      elNombre.textContent = personaje.nombre;
      elRol.textContent = personaje.rol;
      elSimbolo.innerHTML = simbolosPorElemento[personaje.elemento];
      tarjeta.setAttribute('data-elemento', personaje.elemento);

      if (elFoto) {
        if (personaje.img) {
          elFoto.src = personaje.img;
          elFoto.alt = personaje.nombre;
          elFoto.style.display = 'block';
          if (elPlaceholder) elPlaceholder.style.display = 'none';
        } else {
          elFoto.style.display = 'none';
          if (elPlaceholder) {
            elPlaceholder.style.display = 'flex';
            elPlaceholder.innerHTML = `<div class="tarjeta-personaje__emblema">${simbolosPorElemento[personaje.elemento]}</div>`;
          }
        }
      }

      tarjeta.classList.remove('cambiando');
    }, 280);

    elPuntos.querySelectorAll('button').forEach((punto, i) => {
      punto.classList.toggle('activo', i === indiceActual);
    });

    if (reiniciarTemporizador) reiniciarCiclo();
  }

  function siguientePersonaje() {
    mostrarPersonaje((indiceActual + 1) % personajes.length, false);
  }

  function reiniciarCiclo() {
    window.clearInterval(temporizador);
    temporizador = window.setInterval(siguientePersonaje, INTERVALO_MS);
  }

  construirPuntos();
  reiniciarCiclo();
})();

/* ---------- GALERÍA: LIGHTBOX (ampliar y navegar) ---------- */
(function () {
  const marcos = Array.from(document.querySelectorAll('.galeria-item__marco[data-lightbox]'));
  if (!marcos.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button type="button" class="lightbox__cerrar" aria-label="Cerrar">&times;</button>
    <button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Imagen anterior">&#8249;</button>
    <button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Imagen siguiente">&#8250;</button>
    <div class="lightbox__marco">
      <img src="" alt="">
      <p class="lightbox__pie"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imgGrande = lightbox.querySelector('img');
  const pie = lightbox.querySelector('.lightbox__pie');
  const btnCerrar = lightbox.querySelector('.lightbox__cerrar');
  const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
  const btnNext = lightbox.querySelector('.lightbox__nav--next');

  let indice = 0;

  function abrir(i) {
    indice = i;
    const marco = marcos[indice];
    const src = marco.getAttribute('data-lightbox');
    const texto = marco.getAttribute('data-caption') || '';
    imgGrande.src = src;
    imgGrande.alt = texto;
    pie.textContent = texto;
    lightbox.classList.add('abierto');
    document.body.style.overflow = 'hidden';
  }

  function cerrar() {
    lightbox.classList.remove('abierto');
    document.body.style.overflow = '';
  }

  function siguiente() { abrir((indice + 1) % marcos.length); }
  function anterior() { abrir((indice - 1 + marcos.length) % marcos.length); }

  marcos.forEach((marco, i) => {
    marco.addEventListener('click', () => abrir(i));
  });

  btnCerrar.addEventListener('click', cerrar);
  btnNext.addEventListener('click', siguiente);
  btnPrev.addEventListener('click', anterior);
  lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox) cerrar();
  });

  document.addEventListener('keydown', (evento) => {
    if (!lightbox.classList.contains('abierto')) return;
    if (evento.key === 'Escape') cerrar();
    if (evento.key === 'ArrowRight') siguiente();
    if (evento.key === 'ArrowLeft') anterior();
  });
})();
