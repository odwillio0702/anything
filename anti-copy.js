document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.addEventListener('keydown', (event) => {
  const forbiddenKeys = ['PrintScreen', 'F12', 's', 'u', 'c', 'a', 'i'];
  if ((event.ctrlKey || event.metaKey) && forbiddenKeys.includes(event.key.toLowerCase())) {
    event.preventDefault();
  }

  if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'i')) {
    event.preventDefault();
  }
});

const disableSelection = () => {
  document.body.style.userSelect = 'none';
};

disableSelection();
