// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
});

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 70; // Account for fixed navbar
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards for animation
document.querySelectorAll('section, .skill-card, .project-card, .cert-card, .timeline-item, .education-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const text = heroSubtitle.textContent;
heroSubtitle.textContent = '';

let i = 0;
const typeWriter = () => {
  if (i < text.length) {
    heroSubtitle.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
};

// Start typing effect after page load
window.addEventListener('load', () => {
  setTimeout(typeWriter, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const rate = scrolled * -0.5;
  
  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Smooth reveal animation for elements
const revealElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-item, .education-item, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, index * 100);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
  .skill-card, .project-card, .cert-card, .timeline-item, .education-item, .contact-item {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  body.loaded {
    overflow-x: hidden;
  }
`;
document.head.appendChild(style);