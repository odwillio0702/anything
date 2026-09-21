const webProject = document.querySelector('.project[data-category="web"]');
if (webProject) {
  const openProject = () => {
    const url = webProject.dataset.url || 'construction-company.html';
    window.location.href = url;
  };

  webProject.style.cursor = 'pointer';
  webProject.setAttribute('role', 'link');
  webProject.setAttribute('tabindex', '0');
  webProject.setAttribute('aria-label', 'Open FORMAT construction company portfolio');

  webProject.addEventListener('click', openProject);
  webProject.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject();
    }
  });
}
