// Cimentar México — lógica interactiva
// ⚙️ CONFIGURA AQUÍ TU NÚMERO DE WHATSAPP (con código de país, sin + ni espacios)
const WHATSAPP_NUMERO = "5215522685235";

const acciones = [
  "📚 Verifica la última noticia que compartiste en 3 fuentes independientes.",
  "📣 Reporta un bache, una fuga o una luminaria fundida a tu municipio (app o línea ciudadana).",
  "🗣️ Preséntate formalmente a un vecino que no conoces y anota su nombre.",
  "📖 Lee un análisis profundo (no titulares) sobre un tema que te indigna.",
  "🎧 Escucha, sin interrumpir, la opinión de alguien con quien no estás de acuerdo.",
  "🧹 Sal 20 minutos a la calle y limpia la banqueta frente a tu casa.",
  "🗳️ Investiga el desempeño actual de tu alcalde o gobernador con datos, no opiniones.",
  "💧 Revisa una fuente oficial (datos.gob.mx o INEGI) sobre tu municipio y comparte un dato.",
  "👵 Pregunta a un adulto mayor de tu colonia qué necesita y cómo podrías ayudar.",
  "📝 Escribe tu semáforo comunitario: puntúa tu colonia del 1 al 5 en 6 temas.",
  "🤝 Ofrece una hora de mentoría esta semana a un joven de tu comunidad.",
  "🔇 Toma una hora sin redes sociales y úsala para leer o conversar con tu familia.",
  "📢 Publica una sola cosa buena que funcione en tu comunidad y explica por qué.",
  "🏛️ Busca la fecha del próximo cabildo abierto de tu municipio y agenda asistir.",
  "🪞 Identifica un sesgo propio: lee una columna contraria y anota qué parte te parece válida.",
  "🌱 Planta o riega algo en un espacio público de tu cuadra.",
  "📞 Llama o escribe a un representante (síndico, regidor, diputado local) sobre un tema concreto.",
  "👥 Invita a 3 personas a conocer esta guía. La consciencia se contagia."
];

const dado = document.getElementById("dado-resultado");
const btnDado = document.getElementById("btn-dado");
const btnCompartir = document.getElementById("btn-compartir");
let accionActual = "";

btnDado.addEventListener("click", () => {
  let nueva;
  do { nueva = acciones[Math.floor(Math.random() * acciones.length)]; }
  while (nueva === accionActual && acciones.length > 1);
  accionActual = nueva;
  dado.textContent = nueva;
  dado.classList.remove("pop"); void dado.offsetWidth; dado.classList.add("pop");
  btnCompartir.style.display = "inline-block";
});

btnCompartir.addEventListener("click", () => {
  const texto = `Mi acción cívica de hoy desde Cimentar México 🧱🇲🇽: ${accionActual}

¿Te animas? Pon tu primera piedra: `;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto + location.href)}`, "_blank");
});

// Botones de WhatsApp
const linkGrupo = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent("Hola, quiero poner mi primera piedra y participar en Cimentar México 🧱🇲🇽")}`;
document.getElementById("wa-hero").href = linkGrupo;

// Compromiso
document.getElementById("btn-piedra").addEventListener("click", () => {
  const marcadas = [...document.querySelectorAll("#piedras input:checked")]
    .map(cb => cb.dataset.text);
  const msg = document.getElementById("piedra-msg");
  if (marcadas.length === 0) {
    msg.textContent = "⚠️ Marca al menos una piedra para comprometerte.";
    msg.style.color = "#9a3f1f";
    return;
  }
  msg.style.color = "#3a7d44";
  msg.textContent = `🧱 Compromiso registrado: ${marcadas.length} piedra${marcadas.length > 1 ? "s" : ""}. ¡Que se note!`;
  const texto = `Acabo de poner mi primera piedra en Cimentar México 🧱🇲🇽. Mi compromiso:
${marcadas.map(m => "• " + m).join("
")}

¿Pones la tuya? `;
  window.open(`https://wa.me/?text=${encodeURIComponent(texto + location.href)}`, "_blank");
});
