const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const body = document.body;
const formspreeEndpoint = 'https://formspree.io/f/xkjgjrnw';

$('#year').textContent = new Date().getFullYear();

const contactEmailLink = $('.email');
if (contactEmailLink) contactEmailLink.remove();

const responsiveStyles = document.createElement('link');
responsiveStyles.rel = 'stylesheet';
responsiveStyles.href = 'responsive.css';
document.head.appendChild(responsiveStyles);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') body.classList.add('dark');

const theme = $('.theme-toggle');
if (theme) {
  theme.textContent = body.classList.contains('dark') ? '☀' : '☾';
  theme.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    theme.textContent = body.classList.contains('dark') ? '☀' : '☾';
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

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: 0.12 }
);
$$('.reveal').forEach((element) => observer.observe(element));

$$('.filter').forEach((button) => button.addEventListener('click', () => {
  $$('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  $$('.project').forEach((project) => {
    project.classList.toggle('hidden', filter !== 'all' && project.dataset.category !== filter);
  });
}));

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
    const cv = `ODWILLIO / MELANIE\nSelf-taught Designer & Developer\n\nABOUT\nSelf-taught designer and developer creating thoughtful digital experiences.\n\nEXPERIENCE\n2022 — NOW\nIndependent learning, design, and development under the names Odwillio and Melanie.\n\nCONTACT\nodwillwayno@gmail.com`;
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
