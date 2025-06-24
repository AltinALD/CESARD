// Language selector logic
const langSelect = document.getElementById('lang-select');
if (langSelect) {
  langSelect.addEventListener('change', function() {
    const lang = this.value;
    localStorage.setItem('cesard-lang', lang);
    if (lang === 'sq') window.location.href = 'index.html';
    if (lang === 'en') window.location.href = 'index-en.html';
    if (lang === 'mk') window.location.href = 'index-mk.html';
  });
}

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

window.addEventListener('DOMContentLoaded', function() {
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