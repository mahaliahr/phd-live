document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.revision-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const diff = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      button.setAttribute('aria-expanded', !isExpanded);
      
      if (isExpanded) {
        diff.hidden = true;
      } else {
        diff.hidden = false;
      }
    });
  });
});