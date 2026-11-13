const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

/* Typing effect: short, relevant focus areas with no external library. */
const typedRole = document.querySelector("#typed-role");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (typedRole && !reducedMotion.matches) {
  const roles = [
    "Penetration Testing",
    "Web Application Security",
    "Vulnerability Assessment"
  ];
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = false;

  const typeNext = () => {
    const current = roles[roleIndex];

    if (!deleting) {
      characterIndex++;
      typedRole.textContent = current.slice(0, characterIndex);
      if (characterIndex >= current.length) {
        deleting = true;
        window.setTimeout(typeNext, 1550);
        return;
      }
    } else {
      characterIndex--;
      typedRole.textContent = current.slice(0, characterIndex);
      if (characterIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    window.setTimeout(typeNext, deleting ? 42 : 78);
  };

  window.setTimeout(() => {
    deleting = true;
    typeNext();
  }, 1700);
}

/* Scroll reveal: progressively reveals content as it enters the viewport. */
if (!reducedMotion.matches && "IntersectionObserver" in window) {
  const revealTargets = document.querySelectorAll(
    ".intro-content, .section-heading, .tool, .platform-row, .work-heading, .project, .education-card, .contact > .eyebrow, .contact h2, .email-link, .socials"
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    if (element.classList.contains("tool") || element.classList.contains("project") || element.classList.contains("education-card")) {
      element.style.transitionDelay = `${(index % 3) * 75}ms`;
    }
  });

  document.documentElement.classList.add("reveal-ready");

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealTargets.forEach(element => observer.observe(element));
}
