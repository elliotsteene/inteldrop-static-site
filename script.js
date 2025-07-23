// IntelDrop Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  initSmoothScrolling();
  initScrollAnimations();
  initAppStoreTracking();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        trackEvent("Navigation", "Scroll Click", targetId);
      }
    });
  });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// App Store button tracking and interactions
function initAppStoreTracking() {
  const appStoreButtons = document.querySelectorAll(
    ".app-store-btn, .app-store-btn-white",
  );

  appStoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      trackEvent("App Store", "Click", "Download Button");
      console.log("button clicked");
    });

    button.addEventListener("mouseenter", function () {
      trackEvent("App Store", "Hover", "Download Button");
    });
  });
}

// Analytics tracking function
function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value: 1,
    });
  }
}

// Debounce utility
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

// Header scroll behavior
window.addEventListener(
  "scroll",
  debounce(function () {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, 100),
);
