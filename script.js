'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Custom cursor
const cursorInner = document.getElementById('cursor-inner');
const cursorOuter = document.getElementById('cursor-outer');

document.addEventListener('mousemove', (e) => {
  cursorInner.style.left = e.clientX + 'px';
  cursorInner.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorOuter.style.left = e.clientX + 'px';
    cursorOuter.style.top = e.clientY + 'px';
  }, 100);
});

// Hide cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  cursorInner.style.display = 'none';
  cursorOuter.style.display = 'none';
}

// Particles.js configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00d4ff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00d4ff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// Portfolio filter functionality
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    
    let selectedValue = this.innerText.toLowerCase();
    
    for (let k = 0; k < filterItems.length; k++) {
      
      if (selectedValue === "all") {
        filterItems[k].classList.add("active");
      } else if (selectedValue === filterItems[k].dataset.category) {
        filterItems[k].classList.add("active");
      } else {
        filterItems[k].classList.remove("active");
      }
    }
    
    // Remove active class from all filter buttons
    for (let j = 0; j < filterBtns.length; j++) {
      filterBtns[j].classList.remove("active");
    }
    
    // Add active class to clicked button
    this.classList.add("active");
  });
}

// Custom select functionality for mobile filter
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
  
  // Add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      
      // Filter portfolio items
      for (let k = 0; k < filterItems.length; k++) {
        
        if (selectedValue === "all") {
          filterItems[k].classList.add("active");
        } else if (selectedValue === filterItems[k].dataset.category) {
          filterItems[k].classList.add("active");
        } else {
          filterItems[k].classList.remove("active");
        }
      }
    });
  }
}

// Music Player functionality
const musicPlayer = document.getElementById('musicPlayer');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicIcon = musicPlayer.querySelector('.music-icon');

let isPlaying = false;
const musicSource = 'https://cdn.ferdev.my.id/cdn/t3yfw.mp3'; // Default music

musicPlayer.addEventListener('click', function() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

function playMusic() {
  if (musicSource && backgroundMusic.src !== musicSource) {
    backgroundMusic.src = musicSource;
  }
  
  backgroundMusic.play().then(() => {
    isPlaying = true;
    musicPlayer.classList.add('playing');
    musicIcon.name = 'pause';
  }).catch(error => {
    console.log('Music playback failed:', error);
  });
}

function pauseMusic() {
  backgroundMusic.pause();
  isPlaying = false;
  musicPlayer.classList.remove('playing');
  musicIcon.name = 'musical-notes';
}

// Tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
  const tooltipContainers = document.querySelectorAll('.tooltip-container');
  
  tooltipContainers.forEach(container => {
    let tooltipTimeout;
    
    container.addEventListener('mouseenter', function() {
      // Clear any existing timeout
      clearTimeout(tooltipTimeout);
      
      // Add active class for enhanced styling
      this.classList.add('tooltip-active');
      
      // Position tooltip based on viewport
      const rect = this.getBoundingClientRect();
      const tooltip = window.getComputedStyle(this, '::after');
      
      // Adjust position if tooltip would go off-screen
      if (rect.left < 150) {
        this.classList.add('tooltip-right');
      } else if (rect.right > window.innerWidth - 150) {
        this.classList.add('tooltip-left');
      }
    });
    
    container.addEventListener('mouseleave', function() {
      // Delay hiding tooltip slightly for better UX
      tooltipTimeout = setTimeout(() => {
        this.classList.remove('tooltip-active', 'tooltip-left', 'tooltip-right');
      }, 100);
    });
  });
});

// Theme Toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;
  
  // Check for saved theme preference or default to 'dark'
  const currentTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', currentTheme);
  
  // Update icon based on current theme
  updateThemeIcon(currentTheme);
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add pulse animation
    themeToggle.classList.add('active');
    setTimeout(() => {
      themeToggle.classList.remove('active');
    }, 2000);
    
    // Update theme
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateThemeIcon(newTheme);
    
    // Reinitialize particles with new theme
    setTimeout(() => {
      initializeParticles();
    }, 300);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.name = 'sunny';
      themeToggle.title = 'Switch to Dark Mode';
    } else {
      themeIcon.name = 'moon';
      themeToggle.title = 'Switch to Light Mode';
    }
  }
  
  // Initialize particles based on current theme
  function initializeParticles() {
    const currentTheme = body.getAttribute('data-theme');
    
    // Clear existing particles
    if (window.pJSDom && window.pJSDom[0]) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }
    
    // Particle configuration based on theme
    const particleConfig = {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: currentTheme === 'light' ? '#0099cc' : '#00d4ff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: currentTheme === 'light' ? 0.4 : 0.6,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: currentTheme === 'light' ? '#0099cc' : '#00d4ff',
          opacity: currentTheme === 'light' ? 0.3 : 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 6,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'repulse'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
    
    // Initialize particles
    particlesJS('particles-js', particleConfig);
  }
  
  // Initialize particles on page load
  initializeParticles();
});

// Contact form functionality
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  // Add event to all form input field
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      
      // Check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
  
  // Form submit event
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Here you can add your form submission logic
    console.log("Form submitted:", formObject);
    
    // Show success message (you can customize this)
    alert("Thank you for your message! I'll get back to you soon.");
    
    // Reset form
    form.reset();
    formBtn.setAttribute("disabled", "");
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const href = this.getAttribute('href');
    if (href && href !== '#') {
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

// Add loading animation to project images
const projectImages = document.querySelectorAll('.project-img img');
projectImages.forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-item, .timeline-item, .project-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Add glow effect on hover for interactive elements
const interactiveElements = document.querySelectorAll('button, .contact-link, .social-link');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', function() {
    this.style.textShadow = '0 0 10px var(--neon-blue)';
  });
  
  el.addEventListener('mouseleave', function() {
    this.style.textShadow = 'none';
  });
});

// Dynamic role text rotation
const roles = [
  'Developer',
  'Video Editor', 
  'Content Creator',
  'Graphic Designer',
  '3D Artist',
  'Electronics Engineer'
];

let currentRoleIndex = 0;
const dynamicRoleElement = document.getElementById('dynamic-role');

function rotateRole() {
  if (dynamicRoleElement) {
    // Fade out
    dynamicRoleElement.style.opacity = '0';
    dynamicRoleElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      // Change text
      currentRoleIndex = (currentRoleIndex + 1) % roles.length;
      dynamicRoleElement.textContent = roles[currentRoleIndex];
      
      // Fade in
      dynamicRoleElement.style.opacity = '1';
      dynamicRoleElement.style.transform = 'translateY(0)';
    }, 300);
  }
}

// Start role rotation after page load
setTimeout(() => {
  rotateRole();
  setInterval(rotateRole, 3000); // Change every 3 seconds
}, 2000);

// Performance-aware glitch effect
const glitchElement = document.querySelector('.glitch');

if (glitchElement) {
  // Deteksi performa device sederhana
  function detectDevicePerformance() {
    const start = performance.now();
    
    // Test sederhana untuk mengukur performa
    for (let i = 0; i < 100000; i++) {
      Math.random();
    }
    
    const end = performance.now();
    const executionTime = end - start;
    
    // Jika device lambat, kurangi kecepatan animasi
    if (executionTime > 10) {
      document.documentElement.style.setProperty('--glitch-speed', '3s');
      document.documentElement.style.setProperty('--glitch-speed-2', '4s');
      console.log('Device performance: LOW - Animasi diperlambat');
    } else if (executionTime > 5) {
      document.documentElement.style.setProperty('--glitch-speed', '2s');
      document.documentElement.style.setProperty('--glitch-speed-2', '2.5s');
      console.log('Device performance: MEDIUM - Animasi standar');
    } else {
      document.documentElement.style.setProperty('--glitch-speed', '1s');
      document.documentElement.style.setProperty('--glitch-speed-2', '1.2s');
      console.log('Device performance: HIGH - Animasi dipercepat');
    }
  }
  
  // Jalankan deteksi performa
  detectDevicePerformance();
  
  // Touch/click trigger untuk glitch
  glitchElement.addEventListener('click', function() {
    this.classList.add('glitch-active');
    setTimeout(() => {
      this.classList.remove('glitch-active');
    }, 1000);
  });
  
  // Optional: Tombol untuk mengatur kecepatan manual
  const controlPanel = document.createElement('div');
  controlPanel.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.8);
    padding: 10px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 12px;
    color: white;
    display: none;
  `;
  
  controlPanel.innerHTML = `
    <div>FPS Control:</div>
    <button onclick="document.documentElement.style.setProperty('--glitch-speed', '0.5s'); document.documentElement.style.setProperty('--glitch-speed-2', '0.7s');">HIGH FPS</button>
    <button onclick="document.documentElement.style.setProperty('--glitch-speed', '1.5s'); document.documentElement.style.setProperty('--glitch-speed-2', '2s');">NORMAL FPS</button>
    <button onclick="document.documentElement.style.setProperty('--glitch-speed', '3s'); document.documentElement.style.setProperty('--glitch-speed-2', '4s');">LOW FPS</button>
  `;
  
  document.body.appendChild(controlPanel);
  
  // Show control panel with Ctrl+G
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'g') {
      controlPanel.style.display = controlPanel.style.display === 'none' ? 'block' : 'none';
    }
  });
}

/*-----------------------------------*\
  #CUSTOM CURSOR FUNCTIONALITY
\*-----------------------------------*/

// Custom cursor implementation
const cursor = document.querySelector('.custom-cursor');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Track mouse movement
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
  const speed = 0.1;
  
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  
  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
  
  requestAnimationFrame(animateCursor);
}

// Start cursor animation
animateCursor();

// Add click effect
document.addEventListener('mousedown', function() {
  if (cursor) cursor.classList.add('clicking');
});

document.addEventListener('mouseup', function() {
  if (cursor) cursor.classList.remove('clicking');
});

// Add hover effects for interactive elements
document.querySelectorAll('a, button, .project-item, .service-item').forEach(el => {
  el.addEventListener('mouseenter', function() {
    if (cursorOuter) {
      cursorOuter.style.transform = 'scale(1.5)';
      cursorOuter.style.borderColor = 'var(--neon-blue)';
    }
    if (cursorInner) {
      cursorInner.style.transform = 'scale(1.5)';
    }
  });
  
  el.addEventListener('mouseleave', function() {
    if (cursorOuter) {
      cursorOuter.style.transform = 'scale(1)';
      cursorOuter.style.borderColor = 'var(--neon-blue)';
    }
    if (cursorInner) {
      cursorInner.style.transform = 'scale(1)';
    }
  });
});

// Typing effect for about text
function typeEffect(element, text, speed = 50) {
  if (!element) return;
  
  element.innerHTML = '';
  let i = 0;
  
  function typeChar() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  }
  
  typeChar();
}

// Initialize typing effect when about section is visible
const aboutText = document.querySelector('.about-text p:first-child');
if (aboutText) {
  const originalText = aboutText.textContent;
  
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeEffect(aboutText, originalText, 30);
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  aboutObserver.observe(aboutText);
}

// Add scroll progress indicator
function createScrollIndicator() {
  const indicator = document.createElement('div');
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-blue), var(--cyan-glow));
    z-index: 9999;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px var(--neon-blue);
  `;
  
  document.body.appendChild(indicator);
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    indicator.style.width = scrollPercent + '%';
  });
}

// Initialize scroll indicator
createScrollIndicator();

// Add floating particles on mouse move
function createFloatingParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 4px;
    height: 4px;
    background: var(--neon-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9997;
    animation: float-away 1s ease-out forwards;
    box-shadow: 0 0 6px var(--neon-blue);
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

// Add CSS animation for floating particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float-away {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) scale(0);
    }
  }
`;
document.head.appendChild(style);

// Create particles on mouse move (throttled)
let lastParticleTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastParticleTime > 100) { // Create particle every 100ms
    if (Math.random() > 0.7) { // 30% chance
      createFloatingParticle(e.clientX, e.clientY);
    }
    lastParticleTime = now;
  }
});
