(function () {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const year = document.querySelector("[data-year]");
  const links = document.querySelectorAll('.site-nav a[href^="#"]');

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    const label = toggle.querySelector(".sr-only");
    if (label) label.textContent = "메뉴 열기";
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav?.classList.toggle("is-open", !open);
    const label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "메뉴 열기" : "메뉴 닫기";
  });

  links.forEach((link) => {
    link.addEventListener("click", () => closeNav());
  });

  window.addEventListener("scroll", () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  });

  const sections = ["about", "work"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = "";
    sections.forEach((section) => {
      if (section.offsetTop <= y) current = section.id;
    });
    links.forEach((link) => {
      const match = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", match);
    });
  };

  window.addEventListener("scroll", setActive);
  setActive();
})();
