document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop();
  
  const pageName = currentPage.replace('.html', '') || 'index';
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.replace('.html', '');
      if ((pageName === 'index' && linkPage === '') || 
          (pageName !== 'index' && linkPage === pageName)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
  
  const contactButtons = document.querySelectorAll('.btn-contact, .btn-primary');
  contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.getAttribute('href')) {
        window.location.href = 'contact.html';
      }
    });
  });
});