// Configure aqui o número com DDI+DDD, só dígitos (ex.: "5551999999999"). Vazio = abre o WhatsApp sem destinatário.
const WHATSAPP_NUMBER = "";
const WHATSAPP_MESSAGE = "Olá! Conheci a Clínica Kossmann pelo site e gostaria de agendar uma avaliação.";
const waUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
document.querySelectorAll("[data-wa]").forEach(a => { a.href = waUrl; a.target = "_blank"; a.rel = "noopener"; });

// Header ao rolar
const hd = document.querySelector("header.top");
const onScroll = () => hd.classList.toggle("scrolled", window.scrollY > 10);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Menu mobile
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
const setMenu = open => { burger.setAttribute("aria-expanded", open); burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu"); menu.classList.toggle("open", open); };
burger.addEventListener("click", () => setMenu(burger.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); } });

// FAQ (respostas são placeholders)
const faq = [
  ["Como funciona a avaliação?", "Como funciona a avaliação"],
  ["A clínica trabalha com alinhadores?", "Informação sobre alinhadores"],
  ["Como funciona o clareamento?", "Informação sobre clareamento"],
  ["Como posso agendar um horário?", "Você pode solicitar pelo botão de WhatsApp desta página. Detalhes de horários serão confirmados pela clínica"],
  ["Quais são as formas de pagamento?", "Formas de pagamento"]
];
const list = document.getElementById("faqlist");
faq.forEach(([q, a], i) => {
  const it = document.createElement("div"); it.className = "it";
  it.innerHTML = `<h3 style="margin:0"><button id="fq${i}" aria-expanded="false" aria-controls="fp${i}">${q}</button></h3>
  <div class="pn" id="fp${i}" role="region" aria-labelledby="fq${i}"><div><p>[Placeholder] ${a}: resposta a ser confirmada pela clínica.</p></div></div>`;
  list.appendChild(it);
});
list.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  const open = b.getAttribute("aria-expanded") === "true";
  b.setAttribute("aria-expanded", !open);
  document.getElementById(b.getAttribute("aria-controls")).classList.toggle("open", !open);
});

// Entrada suave dos elementos
const els = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: .12 });
  els.forEach(el => io.observe(el));
} else els.forEach(el => el.classList.add("in"));
