// js/main.js
document.addEventListener('DOMContentLoaded', () => {
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
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
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