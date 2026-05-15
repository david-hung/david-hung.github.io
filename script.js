const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const projectGrid = document.querySelector("[data-project-grid]");
const projectToggle = document.querySelector("[data-project-toggle]");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const setMenuOpen = (isOpen) => {
  header?.classList.toggle("menu-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenuOpen(false);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

const syncProjectToggle = () => {
  if (!projectGrid || !projectToggle) {
    return;
  }

  const isMobile = window.matchMedia("(max-width: 620px)").matches;
  const hasExtraProjects = projectGrid.children.length > 4;

  projectToggle.hidden = !isMobile || !hasExtraProjects;
  if (!isMobile) {
    projectGrid.classList.remove("is-collapsed");
    projectToggle.setAttribute("aria-expanded", "true");
    projectToggle.textContent = "Show all projects";
    return;
  }

  if (!projectGrid.dataset.projectState) {
    projectGrid.dataset.projectState = "collapsed";
    projectGrid.classList.add("is-collapsed");
  }

  const isExpanded = projectGrid.dataset.projectState === "expanded";
  projectGrid.classList.toggle("is-collapsed", !isExpanded);
  projectToggle.setAttribute("aria-expanded", String(isExpanded));
  projectToggle.textContent = isExpanded ? "Show fewer projects" : "Show all projects";
};

projectToggle?.addEventListener("click", () => {
  if (!projectGrid) {
    return;
  }

  const isExpanded = projectGrid.dataset.projectState === "expanded";
  projectGrid.dataset.projectState = isExpanded ? "collapsed" : "expanded";
  syncProjectToggle();
});

updateHeader();
syncProjectToggle();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", syncProjectToggle);
