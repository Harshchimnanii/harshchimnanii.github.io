// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initCustomCursor();
    initScrollAnimations();
    initProjectFilter();
    initSkillBars();
    initNavbarScroll();
    initFormValidation();
    initPhotoUpload();
    initTypingEffect();
});

// Custom Cursor Animation
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Track mouse movement with smooth following
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .photo-upload-area, .project-card, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, #ff00ff 0%, #8000ff 50%, transparent 70%)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #00ffff 0%, #0080ff 50%, transparent 70%)';
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                
                // Animate skill bars when about section comes into view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content, .skills');
    animatedElements.forEach(element => {
        element.classList.add('loading');
        observer.observe(element);
    });
}

// Project Filter
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'projectSlideIn 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        bar.setAttribute('data-target-width', width);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.getAttribute('data-target-width');
            bar.style.width = targetWidth;
        }, index * 200);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const projectType = this.querySelector('select').value;
            const budget = this.querySelectorAll('select')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Validation
            if (!name || !email || !projectType || !budget || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you within 2 hours.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #00ff00, #00cc00)' : 'linear-gradient(45deg, #ff0000, #cc0000)'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Typing Effect
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.6s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200 + 500);
        });
    }
}

// Photo Upload Functionality
function initPhotoUpload() {
    const photoInput = document.getElementById('photoInput');
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    const previewImage = document.getElementById('previewImage');
    
    if (!photoUpload || !photoInput) return;
    
    // Click to upload
    photoUpload.addEventListener('click', function() {
        photoInput.click();
    });
    
    // Drag and drop functionality
    photoUpload.addEventListener('dragover', function(e) {
        e.preventDefault();
        photoUpload.style.borderColor = '#0080ff';
        photoUpload.style.background = 'rgba(0, 255, 255, 0.2)';
        photoUpload.style.transform = 'scale(1.05)';
    });
    
    photoUpload.addEventListener('dragleave', function(e) {
        e.preventDefault();
        photoUpload.style.borderColor = '#00ffff';
        photoUpload.style.background = 'rgba(0, 255, 255, 0.05)';
        photoUpload.style.transform = 'scale(1)';
    });
    
    photoUpload.addEventListener('drop', function(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
        photoUpload.style.borderColor = '#00ffff';
        photoUpload.style.background = 'rgba(0, 255, 255, 0.05)';
        photoUpload.style.transform = 'scale(1)';
    });
    
    // File input change
    photoInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
    
    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('File size too large. Please select an image under 5MB.', 'error');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                photoUpload.style.display = 'none';
                photoPreview.style.display = 'block';
                
                // Add animation to photo preview
                photoPreview.style.opacity = '0';
                photoPreview.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    photoPreview.style.transition = 'all 0.5s ease';
                    photoPreview.style.opacity = '1';
                    photoPreview.style.transform = 'scale(1)';
                }, 100);
                
                showNotification('Photo uploaded successfully!', 'success');
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Please select a valid image file (JPG, PNG, GIF).', 'error');
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax scrolling effect for background
function initParallax() {
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for different layers
        const twinkling = document.querySelector('.twinkling');
        const clouds = document.querySelector('.clouds');
        
        if (twinkling) {
            twinkling.style.transform = `translateY(${rate * 0.5}px)`;
        }
        
        if (clouds) {
            clouds.style.transform = `translateY(${rate * 0.3}px)`;
        }
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Add floating particles effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ffff;
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add CSS animations
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Reset photo upload if escape is pressed
            const photoUpload = document.getElementById('photoUpload');
            const photoPreview = document.getElementById('photoPreview');
            
            if (photoPreview && photoPreview.style.display !== 'none') {
                photoPreview.style.display = 'none';
                photoUpload.style.display = 'flex';
            }
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initParallax();
    createParticles();
    addAnimationStyles();
    initKeyboardNavigation();
});
// script.js — add at the bottom
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // stop page reload
  const payload = {
    name: form.querySelector('input[placeholder="Your Name"]')?.value || '',
    email: form.querySelector('input[placeholder="Your Email"]')?.value || '',
    projectType: form.querySelector('select')?.value || '',
    budget: form.querySelectorAll('select')?.[1]?.value || '',
    message: form.querySelector('textarea')?.value || ''
  };

  // Choose ONE:
  // await sendWithEmailJS(form);     // Option A (no backend)
  // await sendWithBackend(payload);  // Option B (backend)
});

async function sendWithEmailJS(form) {
  try {
    const result = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}