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


/* Reading progress indicator */
const progressBar = document.querySelector('.scroll-progress span');
let progressTicking = false;
const updateProgress = () => {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  progressTicking = false;
};
window.addEventListener('scroll', () => {
  if (!progressTicking) {
    window.requestAnimationFrame(updateProgress);
    progressTicking = true;
  }
}, { passive: true });
updateProgress();

/* Highlight the navigation item for the section currently in view. */
if ('IntersectionObserver' in window) {
  const sectionLinks = [...document.querySelectorAll('#nav a[href^="#"]')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-28% 0px -58% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}

/* Very soft pointer-following light in the hero, desktop pointers only. */
const hero = document.querySelector('.hero');
if (hero && window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  hero.addEventListener('pointermove', event => {
    const rect = hero.getBoundingClientRect();
    hero.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    hero.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--spot-x', '68%');
    hero.style.setProperty('--spot-y', '38%');
  });
}
