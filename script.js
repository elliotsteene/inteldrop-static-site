// IntelDrop Landing Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initSmoothScrolling();
  initScrollAnimations();
  initAppStoreTracking();
  initPerformanceOptimizations();
  initAccessibilityFeatures();

  console.log("🚀 IntelDrop landing page initialized");
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

        // Track scroll clicks
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

  // Observe elements that should fade in
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Sections are visible by default - fade-in class is added manually to specific elements in HTML
}

// App Store button tracking and interactions
function initAppStoreTracking() {
  const appStoreButtons = document.querySelectorAll(
    ".app-store-btn, .app-store-btn-white",
  );

  appStoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Track the click
      trackEvent("App Store", "Click", "Download Button");

      // Add loading state
      this.classList.add("loading");

      // In a real implementation, you would redirect to the actual App Store URL
      // For now, we'll just show a placeholder
      setTimeout(() => {
        this.classList.remove("loading");
        // Redirect to App Store URL would go here
        // window.location.href = 'https://apps.apple.com/app/inteldrop/id123456789';
      }, 200);
    });

    // Add hover analytics
    button.addEventListener("mouseenter", function () {
      trackEvent("App Store", "Hover", "Download Button");
    });
  });
}

// Performance optimizations
function initPerformanceOptimizations() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("loading");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Preload critical resources
  const criticalImages = ["./assets/hero-mockup.png", "./assets/logo.png"];

  criticalImages.forEach((src) => {
    try {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      document.head.appendChild(link);
    } catch (error) {
      console.warn(`Failed to preload image: ${src}`, error);
    }
  });
}

// Accessibility features
function initAccessibilityFeatures() {
  // Skip to main content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Skip to main content";
  skipLink.className =
    "sr-only focus:not-sr-only fixed top-0 left-0 z-50 bg-primary text-white px-4 py-2 transform -translate-y-full focus:translate-y-0 transition-transform";
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const mainContent = document.querySelector("main") || document.body;
  if (!mainContent.id) {
    mainContent.id = "main-content";
  }

  // Keyboard navigation for app store buttons
  const focusableElements = document.querySelectorAll(
    ".app-store-btn, .app-store-btn-white",
  );
  focusableElements.forEach((element) => {
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");

    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Analytics tracking function
function trackEvent(category, action, label) {
  // Google Analytics 4 event tracking
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
      value: 1,
    });
  }

  // Console log for development
  console.log(`📊 Event tracked: ${category} - ${action} - ${label}`);
}

// Utility functions
const utils = {
  // Debounce function for performance
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Check if element is in viewport
  isInViewport: function (element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get scroll percentage
  getScrollPercentage: function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
  },
};

// Header scroll behavior
window.addEventListener(
  "scroll",
  utils.debounce(function () {
    const header = document.querySelector("header");
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Track scroll depth
    const scrollPercentage = utils.getScrollPercentage();
    if (scrollPercentage > 25 && !window.scrollTracked25) {
      trackEvent("Scroll", "Depth", "25%");
      window.scrollTracked25 = true;
    }
    if (scrollPercentage > 50 && !window.scrollTracked50) {
      trackEvent("Scroll", "Depth", "50%");
      window.scrollTracked50 = true;
    }
    if (scrollPercentage > 75 && !window.scrollTracked75) {
      trackEvent("Scroll", "Depth", "75%");
      window.scrollTracked75 = true;
    }
  }, 100),
);

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  try {
    trackEvent("Error", "JavaScript", e.error?.message || "Unknown error");
  } catch (trackingError) {
    console.warn("Failed to track error:", trackingError);
  }
});

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
  try {
    trackEvent("Error", "Promise Rejection", e.reason?.message || "Unknown rejection");
  } catch (trackingError) {
    console.warn("Failed to track promise rejection:", trackingError);
  }
});

// Page visibility API for analytics
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    trackEvent("Page", "Hidden", "Tab Switch");
  } else {
    trackEvent("Page", "Visible", "Tab Return");
  }
});

// Service worker registration removed to prevent file:// protocol errors
// Can be re-added later when implementing PWA features on a proper server

// Export utilities for potential module use
window.IntelDrop = {
  utils: utils,
  trackEvent: trackEvent,
};
