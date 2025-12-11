document.addEventListener('DOMContentLoaded', function () {
  // Mobile Dropdown Toggle
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle-btn');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); 

      const dropdownMenu = this.closest('.nav-item').querySelector('.dropdown-menu');
      const arrow = this.querySelector('.dropdown-arrow-icon');

      // Toggle class logic
      const isOpen = dropdownMenu.classList.contains('show');

      // Reset all others first
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
        const otherArrow = menu.closest('.nav-item').querySelector('.dropdown-arrow-icon');
        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
      });

      // If it wasn't open before, open it now.
      if (!isOpen) {
        dropdownMenu.classList.add('show');
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.dropdown-arrow-icon').forEach(arrow => {
        arrow.style.transform = 'rotate(0deg)';
      });
    }
  });
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerIcon = document.querySelector('.hamburger-icon');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      hamburgerIcon.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Review carousel functionality
  const reviewCards = document.querySelectorAll('.review-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  let currentReview = 0;
  const totalReviews = reviewCards.length;

  function showReview(index) {
    // Remove active class from all cards and dots
    reviewCards.forEach(card => card.classList.remove('featured'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current card and dot
    if (reviewCards[index]) {
      reviewCards[index].classList.add('featured');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  }

  function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    showReview(currentReview);
  }

  function prevReview() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    showReview(currentReview);
  }

  // Event listeners for navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextReview);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevReview);
  }

  // Event listeners for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentReview = index;
      showReview(currentReview);
    });
  });

  // Auto-play carousel
  setInterval(nextReview, 5000);

  // Form validation and submission
  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic form validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });

      if (isValid) {
        // Simulate form submission
        alert('Hvala vam na poruci! Kontaktirat ćemo vas uskoro.');
        form.reset();
      } else {
        alert('Molimo popunite sva obavezna polja.');
      }
    });
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.service-card, .review-card, .about-text, .section-header');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
  });

  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px)';
      this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Button click effects
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; // Trigger loading
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Contact form phone number formatting
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');
      if (value.startsWith('385')) {
        value = '+' + value;
      } else if (value.startsWith('0')) {
        value = '+385' + value.substring(1);
      }
      this.value = value;
    });
  });

  // Accessibility improvements
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });

  // Performance optimization - debounce scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll handler
  const debouncedScrollHandler = debounce(function () {
    // Scroll-based animations or effects can go here
  }, 10);

  window.addEventListener('scroll', debouncedScrollHandler);

  // Hero SVG Arrow Scroll Functionality
  const heroSvg = document.querySelector('.hero-svg svg');

  if (heroSvg) {
    // Get the arrow button groups (the g elements with data-figma-bg-blur-radius)
    const arrowGroups = heroSvg.querySelectorAll('g[data-figma-bg-blur-radius]');

    if (arrowGroups.length >= 2) {
      // First arrow group (top one) - scrolls to top
      arrowGroups[1].addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        // Add slower custom scroll for better control
        const scrollDuration = 1200; // 2 seconds
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        const scrollInterval = setInterval(function () {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      });

      // Second arrow group (bottom one) - scrolls to bottom
      arrowGroups[0].addEventListener('click', function () {
        const scrollDuration = 1200; // 2 seconds
        const targetY = document.documentElement.scrollHeight - window.innerHeight;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const scrollStep = distance / (scrollDuration / 15);

        const scrollInterval = setInterval(function () {
          if (Math.abs(window.scrollY - targetY) > Math.abs(scrollStep)) {
            window.scrollBy(0, scrollStep);
          } else {
            window.scrollTo(0, targetY);
            clearInterval(scrollInterval);
          }
        }, 15);
      });
    }
  }
});

// Additional CSS for animations
const additionalStyles = `
  .animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  
  .keyboard-navigation *:focus {
    outline: 2px solid #4CC7DD;
    outline-offset: 2px;
  }
  
  img {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  img.loaded {
    opacity: 1;
  }
  
  .error {
    border-color: #ff4444 !important;
    box-shadow: 0 0 5px rgba(255, 68, 68, 0.3);
  }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
