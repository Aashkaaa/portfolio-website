// ---------- Data ----------
const skills = [
  "HTML5", "CSS3", "JavaScript", "TypeScript",
  "React", "Next.js", "Node.js", "Git & GitHub"
];

const projects = [
  {
    title: "TaskFlow",
    category: "react",
    label: "React",
    description: "A React task manager with an AI subtask feature.",
    link: "https://task-flow-six-wine.vercel.app"
  },
  {
    title: "Weather Dashboard",
    category: "javascript",
    label: "JavaScript",
    description: "Search any city and view live weather using a public API.",
    link: "https://github.com/Aashkaaa"
  },
  {
    title: "Landing Page",
    category: "html-css",
    label: "HTML/CSS",
    description: "A fully responsive landing page built with Flexbox and Grid.",
    link: "https://github.com/Aashkaaa"
  },
  {
    title: "Quiz App",
    category: "javascript",
    label: "JavaScript",
    description: "An interactive quiz with scoring and DOM updates.",
    link: "https://github.com/Aashkaaa"
  },
  {
    title: "Accessible Components",
    category: "react",
    label: "React",
    description: "Reusable ARIA-compliant UI components following W3C APG.",
    link: "https://github.com/Aashkaaa"
  },
  {
    title: "Personal Blog Layout",
    category: "html-css",
    label: "HTML/CSS",
    description: "A clean, semantic blog template with a mobile-first design.",
    link: "https://github.com/Aashkaaa"
  }
];

// ---------- State ----------
let activeFilter = "all";
let searchTerm = "";

// ---------- Elements ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const skillsGrid = document.getElementById("skillsGrid");
const projectsGrid = document.getElementById("projectsGrid");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const form = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Mobile nav ----------
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ---------- Skills ----------
function renderSkills() {
  skillsGrid.innerHTML = "";
  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.className = "skill";
    li.textContent = skill;
    skillsGrid.appendChild(li);
  });
}

// ---------- Projects ----------
function renderProjects() {
  const term = searchTerm.trim().toLowerCase();

  const visible = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(term) ||
      project.description.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  projectsGrid.innerHTML = "";

  visible.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <span class="tag">${project.label}</span>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a class="project-link" href="${project.link}" target="_blank" rel="noopener">View project &rarr;</a>
    `;
    projectsGrid.appendChild(card);
  });

  noResults.hidden = visible.length !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderProjects();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderProjects();
});

// ---------- Contact form validation ----------
function setError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.toggle("invalid", message !== "");
  return message === "";
}

function validateName() {
  const input = form.elements.name;
  const value = input.value.trim();
  if (value.length < 2) {
    return setError(input, "nameError", "Please enter your name (at least 2 characters).");
  }
  return setError(input, "nameError", "");
}

function validateEmail() {
  const input = form.elements.email;
  const value = input.value.trim();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(value)) {
    return setError(input, "emailError", "Please enter a valid email address.");
  }
  return setError(input, "emailError", "");
}

function validateMessage() {
  const input = form.elements.message;
  const value = input.value.trim();
  if (value.length < 10) {
    return setError(input, "messageError", "Message must be at least 10 characters.");
  }
  return setError(input, "messageError", "");
}

form.elements.name.addEventListener("blur", validateName);
form.elements.email.addEventListener("blur", validateEmail);
form.elements.message.addEventListener("blur", validateMessage);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameOk = validateName();
  const emailOk = validateEmail();
  const messageOk = validateMessage();

  if (nameOk && emailOk && messageOk) {
    formSuccess.hidden = false;
    form.reset();
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 4000);
  } else {
    formSuccess.hidden = true;
  }
});

// ---------- Init ----------
renderSkills();
renderProjects();