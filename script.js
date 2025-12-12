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
    input.addEventListener('input', function (e) {
      const cursorPosition = this.selectionStart;

      let value = this.value;
      let cleanValue = value.replace(/\D/g, '');

      if (cleanValue) {
        if (cleanValue.startsWith('385') && !value.startsWith('+385')) {
          value = '+' + cleanValue;
        } else if (cleanValue.startsWith('0') && !value.startsWith('+385')) {
          value = '+385' + cleanValue.substring(1);
        } else {
          value = cleanValue;
        }

        if (this.value !== value) {
          this.value = value;

          this.selectionStart = this.selectionEnd = Math.min(cursorPosition, value.length);
        }
      }
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

document.addEventListener('DOMContentLoaded', function () {
  // Carousel elements
  const carouselTrack = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const circles = document.querySelectorAll('.nav-circle');
  const navArrows = document.querySelectorAll('.nav-arrow');

  // Carousel state
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoRotateInterval;

  // Initialize carousel
  function initCarousel() {
    // Set initial position
    updateCarouselPosition();
    updateActiveCircle();

    // Add click handlers to circles
    circles.forEach(circle => {
      circle.addEventListener('click', function () {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        if (slideIndex !== currentSlide) {
          goToSlide(slideIndex);
        }
      });
    });

    // Add click handlers to arrows
    navArrows.forEach(arrow => {
      arrow.addEventListener('click', function () {
        const direction = this.getAttribute('data-direction');
        if (direction === 'up') {
          goToPrevSlide();
        } else {
          goToNextSlide();
        }
      });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToNextSlide();
      }
    });

    // Start auto rotation
    startAutoRotate();

    // Pause auto rotation on hover
    const carousel = document.querySelector('.hero-carousel');
    const svgNavigation = document.querySelector('.hero-svg-navigation');

    carousel.addEventListener('mouseenter', stopAutoRotate);
    carousel.addEventListener('mouseleave', startAutoRotate);
    svgNavigation.addEventListener('mouseenter', stopAutoRotate);
    svgNavigation.addEventListener('mouseleave', startAutoRotate);

    // Pause auto rotation on touch
    carousel.addEventListener('touchstart', stopAutoRotate);
    svgNavigation.addEventListener('touchstart', stopAutoRotate);

    carousel.addEventListener('touchend', () => {
      setTimeout(startAutoRotate, 5000);
    });
    svgNavigation.addEventListener('touchend', () => {
      setTimeout(startAutoRotate, 5000);
    });
  }

  // Go to specific slide
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarouselPosition();
    updateActiveCircle();
  }

  // Go to next slide
  function goToNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarouselPosition();
    updateActiveCircle();
  }

  // Go to previous slide
  function goToPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarouselPosition();
    updateActiveCircle();
  }

  // Update carousel position
  function updateCarouselPosition() {
    const translateX = -(currentSlide * 100);
    carouselTrack.style.transform = `translateX(${translateX}%)`;
  }

  // Update active circle styling
  function updateActiveCircle() {
    // Remove active class from all circles
    circles.forEach(circle => {
      circle.classList.remove('active');
    });

    // Add active class to current circle
    circles[currentSlide].classList.add('active');

    // Update all circles
    circles.forEach((circle, index) => {
      // Clear any existing rect element
      const existingRect = circle.querySelector('rect');
      if (existingRect) {
        circle.removeChild(existingRect);
      }

      // Get the circle element
      const circleElement = circle.querySelector('circle');

      if (index === currentSlide) {
        // Active circle: Add background rect and make circle blue
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '40');
        rect.setAttribute('height', '40');
        rect.setAttribute('rx', '20');
        rect.setAttribute('fill', 'white');
        rect.setAttribute('fill-opacity', '0.25');

        // Position the rect based on which circle is active
        let yPos;
        if (index === 0) yPos = "0";
        else if (index === 1) yPos = "74";
        else if (index === 2) yPos = "128";
        else if (index === 3) yPos = "177";

        rect.setAttribute('transform', `matrix(-1 0 0 1 52.7917 ${yPos})`);

        // Insert rect before the circle
        circle.insertBefore(rect, circleElement);

        // Update circle properties
        circleElement.setAttribute('cx', '20');
        circleElement.setAttribute('cy', '20');
        circleElement.setAttribute('r', '14');
        circleElement.setAttribute('fill', '#4CC7DD');
        circleElement.setAttribute('fill-opacity', '1');
        circleElement.setAttribute('transform', `matrix(-1 0 0 1 52.7917 ${yPos})`);
      } else {
        // Inactive circles: No background, white with specific opacity
        let yPos, r, opacity;
        if (index === 0) {
          yPos = "0"; r = "14"; opacity = "0.4"; // CHANGED: First circle when inactive now has 40% opacity
        } else if (index === 1) {
          yPos = "74"; r = "10"; opacity = "0.4";
        } else if (index === 2) {
          yPos = "128"; r = "7.5"; opacity = "0.3";
        } else if (index === 3) {
          yPos = "177"; r = "5"; opacity = "0.3";
        }

        // Update circle properties
        circleElement.setAttribute('cx', '20');
        circleElement.setAttribute('cy', '20');
        circleElement.setAttribute('r', r);
        circleElement.setAttribute('fill', 'white');
        circleElement.setAttribute('fill-opacity', opacity);
        circleElement.setAttribute('transform', `matrix(-1 0 0 1 52.7917 ${yPos})`);
      }
    });
  }

  // Auto rotation functions
  function startAutoRotate() {
    stopAutoRotate(); // Clear any existing interval
    autoRotateInterval = setInterval(() => {
      goToNextSlide();
    }, 5000);
  }

  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Initialize the carousel
  initCarousel();

  // Handle window resize
  window.addEventListener('resize', function () {
    updateCarouselPosition();
  });
});