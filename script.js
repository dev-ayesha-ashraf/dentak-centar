document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle-btn');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation(); 

      const dropdownMenu = this.closest('.nav-item').querySelector('.dropdown-menu');
      const arrow = this.querySelector('.dropdown-arrow-icon');

      const isOpen = dropdownMenu.classList.contains('show');

      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
        const otherArrow = menu.closest('.nav-item').querySelector('.dropdown-arrow-icon');
        if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        dropdownMenu.classList.add('show');
        arrow.style.transform = 'rotate(180deg)';
      }
    });
  });

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

  const reviewCards = document.querySelectorAll('.review-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.nav-btn.prev');
  const nextBtn = document.querySelector('.nav-btn.next');

  let currentReview = 0;
  const totalReviews = reviewCards.length;

  function showReview(index) {
    reviewCards.forEach(card => card.classList.remove('featured'));
    dots.forEach(dot => dot.classList.remove('active'));
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
  if (nextBtn) {
    nextBtn.addEventListener('click', nextReview);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevReview);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentReview = index;
      showReview(currentReview);
    });
  });

  setInterval(nextReview, 5000);

  const contactForms = document.querySelectorAll('form');
  contactForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
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
        alert('Hvala vam na poruci! Kontaktirat ćemo vas uskoro.');
        form.reset();
      } else {
        alert('Molimo popunite sva obavezna polja.');
      }
    });
  });

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

  const animateElements = document.querySelectorAll('.service-card, .review-card, .about-text, .section-header');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
  });

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

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });

  const images = document.querySelectorAll('img');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.src; 
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });
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
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });

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
  const debouncedScrollHandler = debounce(function () {
  }, 10);

  window.addEventListener('scroll', debouncedScrollHandler);

});
