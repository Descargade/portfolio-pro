// PROYECTOS DINÁMICOS
const projects = [
  {title: "Sistema de Contacto", desc: "Backend con Node.js y SQLite"},
  {title: "Portfolio Web", desc: "Diseño moderno y responsive"},
  {title: "Landing Page", desc: "Optimizada para conversión"}
];

const container = document.getElementById("projectsContainer");

projects.forEach(p => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
  div.onclick = () => openModal(p);
  container.appendChild(div);
});

// MODAL
const modal = document.getElementById("modal");

function openModal(p) {
  modal.style.display = "flex";
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
}

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};

// FORM → BACKEND REAL
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    email: document.getElementById("email").value,
    mensaje: document.getElementById("mensaje").value
  };

  const status = document.getElementById("status");
  status.textContent = "Enviando...";

  try {
    const res = await fetch("/contacto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.ok) {
      status.textContent = "Mensaje enviado 🚀";
      document.getElementById("form").reset();
    } else {
      status.textContent = "Error";
    }

  } catch {
    status.textContent = "Error servidor";
  }
});

// REVEAL
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// NAV ACTIVO
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});