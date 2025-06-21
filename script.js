// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all components
  initializeLoading()
  initializeNavigation()
  initializeThemeToggle()
  initializeTypingAnimation()
  initializeScrollAnimations()
  initializeProgressBars()
  initializeCounters()
  initializeServiceCards()
  initializeContactForm()
  initializeBackToTop()
  initializeTooltips()
  initializeSmoothScroll()
  initializeCarousel()

  // Initialize AOS (Animate On Scroll)
  const AOS = window.AOS // Declare AOS variable
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  })
})

// Loading Screen
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1500)
  })
}

// Navigation
function initializeNavigation() {
  const navbar = document.getElementById("mainNav")
  const navLinks = document.querySelectorAll(".nav-link")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update active nav link
    updateActiveNavLink()
  })

  // Mobile menu toggle animation
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  navbarToggler.addEventListener("click", function () {
    setTimeout(() => {
      this.classList.toggle("active")
    }, 100)
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove("show")
        navbarToggler.classList.remove("active")
      }
    })
  })
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Theme Toggle
function initializeThemeToggle() {
  const themeSwitch = document.getElementById("theme-switch")
  const body = document.body

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme)
    themeSwitch.checked = savedTheme === "dark"
  }

  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      body.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      body.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  })
}

// Typing Animation
function initializeTypingAnimation() {
  const typingText = document.getElementById("typing-text")
  const texts = ["Dr. Faissal Lkwisse", "Cardiac Surgeon", "Medical Innovator", "Healthcare Leader"]

  let textIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeText() {
    const currentText = texts[textIndex]

    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1)
      charIndex++
    }

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000 // Pause at end
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length
      typeSpeed = 500 // Pause before next text
    }

    setTimeout(typeText, typeSpeed)
  }

  // Start typing animation after a delay
  setTimeout(typeText, 1000)
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".timeline-item, .service-card, .stat-card")
  animateElements.forEach((el) => observer.observe(el))
}

// Progress Bars Animation
function initializeProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar")

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.getAttribute("data-width")

          setTimeout(() => {
            progressBar.style.width = width + "%"
          }, 500)

          progressObserver.unobserve(progressBar)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => progressObserver.observe(bar))
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          const duration = 2000
          const step = target / (duration / 16)
          let current = 0

          const updateCounter = () => {
            current += step
            if (current < target) {
              counter.textContent = Math.floor(current)
              requestAnimationFrame(updateCounter)
            } else {
              counter.textContent = target
            }
          }

          updateCounter()
          counterObserver.unobserve(counter)
        }
      })
    },
    { threshold: 0.5 },
  )

  counters.forEach((counter) => counterObserver.observe(counter))
}

// Service Cards Toggle
function initializeServiceCards() {
  const toggleButtons = document.querySelectorAll(".toggle-details")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const serviceCard = this.closest(".service-card")
      const details = serviceCard.querySelector(".service-details")
      const icon = this.querySelector("i")
      const text = this.querySelector(".details-text")

      if (details.classList.contains("active")) {
        details.classList.remove("active")
        this.classList.remove("active")
        text.textContent = "View Details"
        icon.style.transform = "rotate(0deg)"
      } else {
        details.classList.add("active")
        this.classList.add("active")
        text.textContent = "Hide Details"
        icon.style.transform = "rotate(180deg)"
      }
    })
  })
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const btnText = submitBtn.querySelector(".btn-text")
  const btnLoading = submitBtn.querySelector(".btn-loading")

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Validate form
    if (validateForm()) {
      // Show loading state
      btnText.classList.add("d-none")
      btnLoading.classList.remove("d-none")
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        // Reset form
        contactForm.reset()

        // Reset button state
        btnText.classList.remove("d-none")
        btnLoading.classList.add("d-none")
        submitBtn.disabled = false

        // Show success message
        showNotification("Message sent successfully!", "success")

        // Clear validation classes
        const formControls = contactForm.querySelectorAll(".form-control")
        formControls.forEach((control) => {
          control.classList.remove("is-valid", "is-invalid")
        })
      }, 2000)
    }
  })

  // Real-time validation
  const formInputs = contactForm.querySelectorAll(".form-control")
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateField(this)
      }
    })
  })
}

// Form Validation
function validateForm() {
  const form = document.getElementById("contactForm")
  const inputs = form.querySelectorAll(".form-control[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!validateField(input)) {
      isValid = false
    }
  })

  return isValid
}

function validateField(field) {
  const value = field.value.trim()
  const fieldName = field.name
  let isValid = true
  let errorMessage = ""

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    isValid = false
    errorMessage = "This field is required."
  }

  // Email validation
  if (fieldName === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
      errorMessage = "Please enter a valid email address."
    }
  }

  // Phone validation
  if (fieldName === "phone" && value) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
      isValid = false
      errorMessage = "Please enter a valid phone number."
    }
  }

  // Update field appearance
  const feedback = field.parentNode.querySelector(".invalid-feedback")
  if (isValid) {
    field.classList.remove("is-invalid")
    field.classList.add("is-valid")
    feedback.textContent = ""
  } else {
    field.classList.remove("is-valid")
    field.classList.add("is-invalid")
    feedback.textContent = errorMessage
  }

  return isValid
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `alert alert-${type} notification`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// Tooltips
function initializeTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  const bootstrap = window.bootstrap // Declare bootstrap variable
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
}

// Smooth Scroll
function initializeSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]')

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80 // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Carousel Enhancement
function initializeCarousel() {
  const carousel = document.getElementById("testimonialCarousel")
  if (carousel) {
    // Pause carousel on hover
    carousel.addEventListener("mouseenter", () => {
      window.bootstrap.Carousel.getInstance(carousel).pause() // Use window.bootstrap
    })

    carousel.addEventListener("mouseleave", () => {
      window.bootstrap.Carousel.getInstance(carousel).cycle() // Use window.bootstrap
    })
  }
}

// Print Functionality
document.getElementById("printBtn").addEventListener("click", () => {
  window.print()
})

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key to close mobile menu
  if (e.key === "Escape") {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    const navbarToggler = document.querySelector(".navbar-toggler")

    if (navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show")
      navbarToggler.classList.remove("active")
    }
  }
})

// Intersection Observer for animations
const observeElements = () => {
  const elements = document.querySelectorAll(".fade-in, .slide-up")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  elements.forEach((el) => observer.observe(el))
}

// Performance optimization
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  updateActiveNavLink()
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)

// Lazy loading for images
const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading
lazyLoadImages()

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
  // You could send this to an error reporting service
})

// Unhandled promise rejection handling
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
  // You could send this to an error reporting service
})
