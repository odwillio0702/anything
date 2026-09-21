const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const body = document.body;
const formspreeEndpoint = 'https://formspree.io/f/xkjgjrnw';

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

const contactEmailLink = $('.email');
if (contactEmailLink) contactEmailLink.remove();

const responsiveStyles = document.createElement('link');
responsiveStyles.rel = 'stylesheet';
responsiveStyles.href = 'responsive.css';
document.head.appendChild(responsiveStyles);

if (localStorage.getItem('theme') === 'dark') body.classList.add('dark');

const theme = $('.theme-toggle');
if (theme) {
  const updateThemeLabel = () => {
    const dark = body.classList.contains('dark');
    theme.textContent = dark ? '☀' : '☾';
    theme.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  updateThemeLabel();
  theme.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeLabel();
  });
}

const menu = $('.menu-toggle');
const nav = $('.nav-links');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  $$('.nav-links a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open menu');
  }));
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12 }
  );
  $$('.reveal').forEach((element) => observer.observe(element));
} else {
  $$('.reveal').forEach((element) => element.classList.add('visible'));
}

$$('.filter').forEach((button) => button.addEventListener('click', () => {
  $$('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  $$('.project').forEach((project) => {
    project.classList.toggle('hidden', filter !== 'all' && project.dataset.category !== filter);
  });
}));

// Link the Web project card to the construction-company portfolio.
const webProject = $$('.project').find((project) => project.dataset.category === 'web');
if (webProject) {
  const projectUrl = 'construction-company.html';
  webProject.setAttribute('role', 'link');
  webProject.setAttribute('tabindex', '0');
  webProject.setAttribute('aria-label', 'Open Luma Labs construction company portfolio');
  webProject.style.cursor = 'pointer';
  const openProject = () => { window.location.href = projectUrl; };
  webProject.addEventListener('click', openProject);
  webProject.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  });
}

const skills = ['Figma', 'HTML', 'CSS', 'Python', 'JavaScript', 'React', 'C', 'C++'];
const skillsContainer = $('.skills');
if (skillsContainer) {
  skillsContainer.innerHTML = skills
    .map((skill, index) => `<span class="skill-pill" style="--skill-index:${index}">${skill}</span>`)
    .join('');
  skillsContainer.setAttribute('aria-label', 'Skills and technologies');
}

const contactForm = $('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const status = $('.form-status');
    const originalText = submitButton.textContent;
    const formData = new FormData(contactForm);
    const senderEmail = formData.get('email');

    formData.set('_subject', 'New portfolio contact request — Odwillio/Melanie');
    formData.set('_replyto', senderEmail);
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = 'Sending your message…';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Form submission failed');
      status.textContent = 'Thank you — your message was sent successfully.';
      contactForm.reset();
    } catch (error) {
      status.textContent = 'Something went wrong. Please email odwillwayno@gmail.com directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

const downloadButton = $('#download-cv');
if (downloadButton) {
  downloadButton.addEventListener('click', () => {
    const cv = `ODWILLIO / MELANIE\nSelf-taught Designer & Developer\n\nSKILLS\nFigma, HTML, CSS, Python, JavaScript, React, C, C++\n\nABOUT\nSelf-taught designer and developer creating thoughtful digital experiences.\n\nEXPERIENCE\n2022 — NOW\nIndependent learning, design, and development under the names Odwillio and Melanie.\n\nCONTACT\nodwillwayno@gmail.com`;
    const url = URL.createObjectURL(new Blob([cv], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'odwillio-melanie-cv.txt';
    link.click();
    URL.revokeObjectURL(url);
  });
}

const dot = $('.cursor-dot');
const ring = $('.cursor-ring');
document.addEventListener('mousemove', (event) => {
  if (dot && ring) {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;
  }
});
