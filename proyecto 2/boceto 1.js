const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const STORAGE_KEY = "nova-ideas";
const THEME_KEY = "nova-theme";

const featureDetails = {
  velocidad: "La página carga en menos de un segundo y las transiciones son instantáneas.",
  simple: "Cada sección tiene un propósito claro. Nada de menús anidados.",
  responsive: "El diseño se adapta automáticamente a cualquier tamaño de pantalla.",
  guiado: "La navegación resalta dónde estás y te guía al siguiente paso.",
  feedback: "Botones, formularios y tarjetas responden visualmente a cada clic.",
  accesible: "Contraste alto, etiquetas claras y áreas de clic generosas.",
  temas: "Modo claro u oscuro según tu preferencia o la hora del día.",
  animaciones: "Movimientos suaves que dan vida sin distraer.",
  personalizable: "Estructura lista para añadir más opciones de configuración.",
};

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = $(".theme-icon");
  if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
  showToast(next === "dark" ? "Modo oscuro activado" : "Modo claro activado");
}

function initNav() {
  const toggle = $("#navToggle");
  const links = $("#navLinks");

  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle?.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = $$("section[id], header[id]");
  const navLinks = $$(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

function animateCounters() {
  $$("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString("es");
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  });
}

function initHero() {
  $("#ctaStart")?.addEventListener("click", () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
    showToast("¡Vamos! Prueba la demo interactiva.");
  });

  $("#ctaDemo")?.addEventListener("click", () => {
    document.querySelector("#explorar")?.scrollIntoView({ behavior: "smooth" });
  });

  $("#boostBtn")?.addEventListener("click", () => {
    const fills = $$(".progress-fill");
    fills.forEach((fill) => {
      const current = parseInt(fill.style.width, 10);
      const next = Math.min(current + Math.floor(Math.random() * 8) + 3, 100);
      fill.style.width = `${next}%`;
      const label = fill.closest(".progress-item")?.querySelector(".progress-label span:last-child");
      if (label) label.textContent = `${next}%`;
    });
    showToast("¡Proyecto impulsado! Barras actualizadas.");
  });

  const heroStats = $(".hero-stats");
  if (heroStats) {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(heroStats);
  }
}

function initTabs() {
  const tabs = $$(".tab");
  const panels = $$(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const name = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });
      panels.forEach((p) => {
        const show = p.id === `panel-${name}`;
        p.classList.toggle("active", show);
        p.hidden = !show;
      });
      $$(".feature-card").forEach((c) => c.classList.remove("selected"));
      $("#featureHint").textContent = "Selecciona una tarjeta para ver más detalles.";
    });
  });

  $$(".feature-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".feature-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      const key = card.dataset.feature;
      $("#featureHint").textContent = featureDetails[key] || "";
    });
  });
}

function loadIdeas() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveIdeas(ideas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
}

function renderIdeas(ideas) {
  const list = $("#ideaList");
  const count = $("#ideaCount");
  if (!list) return;

  count.textContent = ideas.length;

  if (ideas.length === 0) {
    list.innerHTML = '<li class="idea-empty">Aún no hay ideas. ¡Agrega la primera!</li>';
    return;
  }

  list.innerHTML = ideas
    .map(
      (idea, i) => `
    <li class="idea-item" data-index="${i}">
      <span class="idea-text">${escapeHtml(idea.text)}</span>
      <span class="priority-tag ${idea.priority}">${idea.priority}</span>
      <button class="idea-remove" aria-label="Eliminar idea" data-index="${i}">×</button>
    </li>`
    )
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function initDemo() {
  let ideas = loadIdeas();
  renderIdeas(ideas);

  $("#ideaForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#ideaInput");
    const text = input.value.trim();
    if (!text) return;

    const priority = $('input[name="priority"]:checked')?.value || "baja";
    ideas.unshift({ text, priority, id: Date.now() });
    saveIdeas(ideas);
    renderIdeas(ideas);
    input.value = "";
    input.focus();
    showToast("Idea agregada correctamente.");
  });

  $("#ideaList")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".idea-remove");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    ideas.splice(index, 1);
    saveIdeas(ideas);
    renderIdeas(ideas);
    showToast("Idea eliminada.");
  });

  $("#clearIdeas")?.addEventListener("click", () => {
    if (ideas.length === 0) {
      showToast("No hay ideas que limpiar.");
      return;
    }
    ideas = [];
    saveIdeas(ideas);
    renderIdeas(ideas);
    showToast("Lista vaciada.");
  });
}

function validateField(field) {
  const input = field.querySelector("input, textarea");
  const error = field.querySelector(".error-msg");
  let message = "";

  if (!input.value.trim()) {
    message = "Este campo es obligatorio.";
  } else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    message = "Introduce un correo válido.";
  }

  field.classList.toggle("invalid", Boolean(message));
  if (error) error.textContent = message;
  return !message;
}

function initContact() {
  const form = $("#contactForm");
  if (!form) return;

  $$("#contactForm .field input, #contactForm .field textarea").forEach((input) => {
    input.addEventListener("input", () => {
      validateField(input.closest(".field"));
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = $$("#contactForm .field");
    const valid = fields.every(validateField);

    if (!valid) {
      showToast("Revisa los campos marcados.");
      return;
    }

    form.reset();
    fields.forEach((f) => {
      f.classList.remove("invalid");
      f.querySelector(".error-msg").textContent = "";
    });
    showToast("¡Mensaje enviado! (simulación)");
  });
}

function initScrollTop() {
  $("#scrollTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initReveal() {
  const elements = $$(".section-head, .feature-card, .demo-form, .demo-list-wrap, .contact-card");
  elements.forEach((el) => el.classList.add("reveal"));

  const style = document.createElement("style");
  style.textContent = `
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initHero();
  initTabs();
  initDemo();
  initContact();
  initScrollTop();
  initReveal();

  $("#themeBtn")?.addEventListener("click", toggleTheme);
});
