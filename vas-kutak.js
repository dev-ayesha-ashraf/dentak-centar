// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };
      
      // Validate form
      if (!validateForm(formData)) {
        return;
      }
      
      // Here you would typically send data to server
      // For demo, show success message
      alert('Hvala na poruci! Odgovorit ćemo vam u najkraćem mogućem roku.');
      contactForm.reset();
    });
  }
});

function validateForm(data) {
  // Simple validation
  if (!data.name || !data.email || !data.phone || !data.message) {
    alert('Molimo ispunite sva obavezna polja (označena sa *).');
    return false;
  }
  
  if (!isValidEmail(data.email)) {
    alert('Molimo unesite ispravnu email adresu.');
    return false;
  }
  
  if (!isValidPhone(data.phone)) {
    alert('Molimo unesite ispravan broj telefona.');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  // Simple phone validation - adjust for your country
  const re = /^[0-9\-\+\(\)\s]{8,}$/;
  return re.test(phone);
}