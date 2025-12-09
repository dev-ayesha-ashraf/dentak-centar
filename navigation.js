// Handle active navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Get current page filename
  const currentPage = window.location.pathname.split('/').pop();
  
  // Remove .html extension for comparison
  const pageName = currentPage.replace('.html', '') || 'index';
  
  // Find and activate the correct nav link
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
  
  // Handle contact button click
  const contactButtons = document.querySelectorAll('.btn-contact, .btn-primary');
  contactButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!this.getAttribute('href')) {
        window.location.href = 'contact.html';
      }
    });
  });
});