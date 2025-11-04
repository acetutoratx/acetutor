// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    const toggleMenu = () => {
      hamburger.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
      document.body.classList.toggle('menu-open');
      
      // Update ARIA attributes
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
    };
    
    // Toggle menu on click
    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          toggleMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar') && navMenu.classList.contains('is-active')) {
        toggleMenu();
      }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
          hamburger.classList.remove('is-active');
          navMenu.classList.remove('is-active');
          document.body.classList.remove('menu-open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }, 250);
    });
  }
  
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('appear');
    });
  }, { threshold: 0.1 });
  fadeElements.forEach(el => observer.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        if (menuToggle && navLinks && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
        
        // Smooth scroll to target
        window.scrollTo({ 
          top: target.offsetTop - 80, 
          behavior: 'smooth' 
        });
      }
    });
  });

  // Plan Toggle
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const planDescriptions = document.querySelectorAll('.plan-description');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleButtons.forEach(b => b.classList.remove('active'));
      planDescriptions.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const plan = btn.dataset.plan;
      document.querySelector(`.plan-description[data-plan="${plan}"]`).classList.add('active');
    });
  });

  if (toggleButtons.length > 0) toggleButtons[0].click();

  // Card hover animations
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 40px rgba(42, 77, 122, 0.18)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 6px 25px rgba(42, 77, 122, 0.06)';
    });
  });
});