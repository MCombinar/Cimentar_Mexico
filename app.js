
// Cimentar México — lógica interactiva
const WHATSAPP_NUMERO = "5215522685235";

const acciones = [
  "📚 Verifica la última noticia que compartiste en 3 fuentes independientes.",
  "📣 Reporta un bache, una fuga o una luminaria fundida a tu municipio.",
  "🗣️ Preséntate formalmente a un vecino que no conoces.",
  "📖 Lee un análisis profundo sobre un tema que te interesa.",
  "🎧 Escucha, sin interrumpir, la opinión de alguien con quien no estás de acuerdo.",
  "🧹 Limpia la banqueta frente a tu casa.",
  "🗳️ Investiga el desempeño de tu alcalde o gobernador con datos.",
  "💧 Consulta datos oficiales sobre tu municipio.",
  "👵 Pregunta a un adulto mayor de tu colonia cómo podrías ayudar.",
  "📝 Evalúa tu colonia en seis temas comunitarios.",
  "🤝 Ofrece una hora de mentoría a un joven.",
  "🔇 Toma una hora sin redes sociales.",
  "📢 Comparte algo positivo que funcione en tu comunidad.",
  "🏛️ Investiga cuándo será el próximo cabildo abierto.",
  "🪞 Lee una opinión contraria a la tuya y reflexiona.",
  "🌱 Planta o riega algo en tu comunidad.",
  "📞 Contacta a un representante sobre un tema concreto.",
  "👥 Invita a tres personas a conocer esta iniciativa."
];

const $ = selector => document.querySelector(selector);

const dado = $("#dado-resultado");
const btnDado = $("#btn-dado");
const btnCompartir = $("#btn-compartir");
const btnPiedra = $("#btn-piedra");
const msgPiedra = $("#piedra-msg");

let accionActual = "";

function abrirWhatsApp(texto) {
  window.open(
    `https://wa.me/?text=${encodeURIComponent(texto)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

// Dado cívico
if (btnDado && dado) {
  btnDado.addEventListener("click", () => {
    let nueva;
    do {
      nueva = acciones[Math.floor(Math.random() * acciones.length)];
    } while (nueva === accionActual && acciones.length > 1);

    accionActual = nueva;
    dado.textContent = nueva;
    dado.classList.remove("pop");
    void dado.offsetWidth;
    dado.classList.add("pop");

    if (btnCompartir) {
      btnCompartir.style.display = "inline-block";
    }
  });
}

// Compartir acción
if (btnCompartir) {
  btnCompartir.addEventListener("click", () => {
    if (!accionActual) return;

    abrirWhatsApp(
      `Mi acción cívica de hoy desde Cimentar México 🧱🇲🇽:\n${accionActual}\n\n¿Te animas? Pon tu primera piedra: ${location.href}`
    );
  });
}

// Invitación por WhatsApp
const linkGrupo = $("#wa-hero");

if (linkGrupo) {
  linkGrupo.href =
    `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
      "Hola, quiero poner mi primera piedra y participar en Cimentar México 🧱🇲🇽"
    )}`;

  linkGrupo.target = "_blank";
  linkGrupo.rel = "noopener noreferrer";
}

// Compromisos ciudadanos
if (btnPiedra) {
  btnPiedra.addEventListener("click", () => {
    const marcadas = [
      ...document.querySelectorAll("#piedras input:checked")
    ].map(cb =>
      cb.dataset.text || cb.parentElement.textContent.trim()
    );

    if (!msgPiedra) return;

    if (marcadas.length === 0) {
      msgPiedra.textContent =
        "⚠️ Marca al menos una piedra para comprometerte.";
      msgPiedra.style.color = "#9a3f1f";
      return;
    }

    msgPiedra.style.color = "#3a7d44";
    msgPiedra.textContent =
      `🧱 Compromiso preparado: ${marcadas.length} piedra${marcadas.length > 1 ? "s" : ""}. ¡Que se note!`;

    const texto = [
      "Acabo de poner mi primera piedra en Cimentar México 🧱🇲🇽.",
      "Mi compromiso:",
      "",
      ...marcadas.map(m => `• ${m}`),
      "",
      "¿Pones la tuya?",
      location.href
    ].join("\n");

    abrirWhatsApp(texto);
  });
}
