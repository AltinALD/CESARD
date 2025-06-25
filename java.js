// Custom Language Selector Logic
document.addEventListener('DOMContentLoaded', function() {
  // Desktop language selector
  const desktopSelector = document.getElementById('customLangSelector');
  const desktopBtn = document.getElementById('langSelectedBtn');
  const desktopOptions = document.getElementById('langOptions');
  
  // Mobile language selector
  const mobileSelector = document.getElementById('customLangSelectorMobile');
  const mobileBtn = document.getElementById('langSelectedBtnMobile');
  const mobileOptions = document.getElementById('langOptionsMobile');
  
  // Set current language based on current page
  function setCurrentLanguage() {
    const currentPage = window.location.pathname;
    let currentLang = 'sq';
    let currentFlag = 'flags/al.png';
    let currentText = 'SQ';
    
    if (currentPage.includes('index-en.html')) {
      currentLang = 'en';
      currentFlag = 'flags/en.png';
      currentText = 'EN';
    } else if (currentPage.includes('index-mk.html')) {
      currentLang = 'mk';
      currentFlag = 'flags/mk.png';
      currentText = 'MK';
    }
    
    // Update desktop selector
    if (desktopBtn) {
      desktopBtn.innerHTML = `<img src="${currentFlag}" alt="Flag" class="lang-flag"> ${currentText}<span class="lang-arrow">▼</span>`;
    }
    
    // Update mobile selector
    if (mobileBtn) {
      mobileBtn.innerHTML = `<img src="${currentFlag}" alt="Flag" class="lang-flag"> ${currentText}<span class="lang-arrow">▼</span>`;
    }
  }
  
  // Toggle language options
  function toggleLangOptions(selector, options) {
    if (selector && options) {
      selector.classList.toggle('open');
    }
  }
  
  // Handle language selection
  function selectLanguage(lang) {
    localStorage.setItem('cesard-lang', lang);
    
    let newPage = '';
    switch(lang) {
      case 'en':
        newPage = 'index-en.html';
        break;
      case 'mk':
        newPage = 'index-mk.html';
        break;
      case 'sq':
      default:
        newPage = 'index.html';
        break;
    }
    
    window.location.href = newPage;
  }
  
  // Event listeners for desktop selector
  if (desktopBtn) {
    desktopBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleLangOptions(desktopSelector, desktopOptions);
    });
  }
  
  if (desktopOptions) {
    desktopOptions.addEventListener('click', function(e) {
      if (e.target.closest('.lang-option')) {
        const langOption = e.target.closest('.lang-option');
        const lang = langOption.getAttribute('data-lang');
        selectLanguage(lang);
      }
    });
  }
  
  // Event listeners for mobile selector
  if (mobileBtn) {
    mobileBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleLangOptions(mobileSelector, mobileOptions);
    });
  }
  
  if (mobileOptions) {
    mobileOptions.addEventListener('click', function(e) {
      if (e.target.closest('.lang-option')) {
        const langOption = e.target.closest('.lang-option');
        const lang = langOption.getAttribute('data-lang');
        selectLanguage(lang);
      }
    });
  }
  
  // Close language selectors when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.custom-lang-selector')) {
      if (desktopSelector) desktopSelector.classList.remove('open');
      if (mobileSelector) mobileSelector.classList.remove('open');
    }
  });
  
  // Initialize current language
  setCurrentLanguage();
});

// On page load, redirect to preferred language if needed
(function() {
  const lang = localStorage.getItem('cesard-lang');
  const page = window.location.pathname.split('/').pop();
  if (lang === 'en' && page !== 'index-en.html') {
    window.location.href = 'index-en.html';
  } else if (lang === 'mk' && page !== 'index-mk.html') {
    window.location.href = 'index-mk.html';
  } else if ((lang === 'sq' || !lang) && page !== 'index.html') {
    window.location.href = 'index.html';
  }
})();

// Slideshow logic
let slideIndex = 0;
const slides = document.getElementsByClassName('slide');
const nextBtn = document.getElementById('slide-next');
const prevBtn = document.getElementById('slide-prev');

function showSlide(idx) {
  if (!slides.length) return;
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[idx].classList.add('active');
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
}

function autoSlide() {
  nextSlide();
  setTimeout(autoSlide, 5000);
}

// Mobile Navigation
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

// Toggle mobile menu
function toggleMobileMenu() {
  mobileNavToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  mobileMenuOverlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu
function closeMobileMenu() {
  mobileNavToggle.classList.remove('active');
  mobileMenu.classList.remove('active');
  mobileMenuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Event listeners for mobile navigation
if (mobileNavToggle) mobileNavToggle.addEventListener('click', toggleMobileMenu);
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on navigation links
const mobileNavLinks = document.querySelectorAll('.mobile-menu-nav a');
mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Smooth scrolling for mobile navigation
mobileNavLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Close mobile menu on window resize (if screen becomes larger)
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
});

// Touch gesture support for mobile menu
let touchStartX = 0;
let touchEndX = 0;

if (mobileMenu) {
  mobileMenu.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  mobileMenu.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
}

function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (swipeDistance > swipeThreshold) {
    // Swipe right - close menu
    closeMobileMenu();
  }
}

// Auto-advance slides
setInterval(nextSlide, 5000);

// Smooth scrolling for desktop navigation
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    header.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));
  
  // Initialize slideshow
  showSlide(slideIndex);
  setTimeout(autoSlide, 5000);

  // Scroll fade-in
  const fadeEls = document.querySelectorAll('.fade-in');
  function checkFade() {
    fadeEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkFade);
  checkFade();
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Ju lutem plotësoni të gjitha fushat e detyrueshme.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Ju lutem vendosni një email të vlefshëm.');
      return;
    }
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Faleminderit për mesazhin tuaj! Do t\'ju kontaktojmë së shpejti.');
    this.reset();
  });
}

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  });
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
  // Close mobile menu with Escape key
  if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
    closeMobileMenu();
  }
  
  // Navigate slideshow with arrow keys
  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
} 