// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const contactToggle = document.getElementById('contact-toggle');
const contactForm = document.getElementById('contact-form');
const cancelContact = document.getElementById('cancel-contact');
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');

// Enhanced Mobile Navigation Toggle - Fixed version
function initMobileNavigation() {
    if (navToggle && mobileMenu) {
        console.log('Initializing mobile navigation...');
        
        // Remove any existing event listeners to prevent duplicates
        const newNavToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newNavToggle, navToggle);
        
        // Get the new reference
        const updatedNavToggle = document.querySelector('.nav-toggle');
        
        // Function to toggle menu and animate icon
        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const bars = updatedNavToggle.querySelectorAll('.bar');
            if (bars.length === 3) {
                if (mobileMenu.classList.contains('active')) {
                    // Transform to X
                    bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    bars[1].style.opacity = '0';
                    bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    // Reset to hamburger
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        }
        
        // Add click event listener
        updatedNavToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!');
            toggleMenu();
        });
        
        // Add touch event listener for mobile
        updatedNavToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger touched!');
            toggleMenu();
        });
        
        // Add event listeners to individual bars for better touch targets
        const bars = updatedNavToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Bar ${index} clicked!`);
                toggleMenu();
            });
            
            bar.addEventListener('touchstart', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Bar ${index} touched!`);
                toggleMenu();
            });
        });
        
        console.log('Mobile navigation initialized successfully');
        return updatedNavToggle;
    } else {
        console.log('Nav toggle or mobile menu not found');
        return null;
    }
}

// Close mobile menu when clicking on links
function initMobileLinks() {
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                console.log('Mobile link clicked, closing menu...');
                mobileMenu.classList.remove('active');
                // Reset hamburger icon
                const navToggle = document.querySelector('.nav-toggle');
                if (navToggle) {
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
                // Navigate to the link after a short delay
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 150);
            }
        });
        
        // Add touch support for mobile links
        link.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                console.log('Mobile link touched, closing menu...');
                mobileMenu.classList.remove('active');
                // Reset hamburger icon
                const navToggle = document.querySelector('.nav-toggle');
                if (navToggle) {
                    const bars = navToggle.querySelectorAll('.bar');
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
                // Navigate to the link after a short delay
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 150);
            }
        });
    });
}

// Close mobile menu when clicking outside
function initOutsideClick() {
    function closeMenu() {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            console.log('Closing menu from outside click');
            mobileMenu.classList.remove('active');
            // Reset hamburger icon
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle) {
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        }
    }
    
    // Click event
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Touch event for mobile
    document.addEventListener('touchstart', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
                e.preventDefault();
                closeMenu();
            }
        }
    });
    
    // Escape key support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// Initialize all mobile functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile navigation...');
    initMobileNavigation();
    initMobileLinks();
    initOutsideClick();
});

// Also initialize on window load to ensure everything is ready
window.addEventListener('load', function() {
    console.log('Window loaded, re-initializing mobile navigation...');
    initMobileNavigation();
    initMobileLinks();
});

// Contact Form Toggle
if (contactToggle && contactForm) {
    contactToggle.addEventListener('click', () => {
        contactForm.classList.toggle('hidden');
        if (!contactForm.classList.contains('hidden')) {
            contactToggle.style.display = 'none';
        }
    });
}

if (cancelContact) {
    cancelContact.addEventListener('click', () => {
        contactForm.classList.add('hidden');
        contactToggle.style.display = 'inline-block';
    });
}

// Form Submission Handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const formObject = {};
        
        for (let [key, value] of formData.entries()) {
            formObject[key] = value;
        }
        
        // Simple validation
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            
            // Hide contact form if it's the main contact form
            if (form.id === 'main-contact-form') {
                contactForm.classList.add('hidden');
                contactToggle.style.display = 'inline-block';
            }
        }
    });
});

// Cookie Banner
document.addEventListener('DOMContentLoaded', () => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted && cookieBanner) {
        cookieBanner.classList.remove('hidden');
    }
});

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('hidden');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Field Focus Effects
const formFields = document.querySelectorAll('input, textarea');
formFields.forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Subscribe Form Handling
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    const subscribeInput = subscribeForm.querySelector('input[type="email"]');
    const subscribeButton = subscribeForm.querySelector('button');
    
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            const email = subscribeInput.value.trim();
            
            if (email && validateEmail(email)) {
                alert('Thank you for subscribing! You will receive 10% off your first purchase.');
                subscribeInput.value = '';
            } else {
                subscribeInput.style.borderColor = '#e53e3e';
                setTimeout(() => {
                    subscribeInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// File Attachment Handling
const attachButtons = document.querySelectorAll('.attach-btn');
attachButtons.forEach(button => {
    button.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.multiple = true;
        fileInput.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
        
        fileInput.addEventListener('change', function() {
            const fileCount = this.files.length;
            const attachInfo = this.parentElement.querySelector('.attach-info');
            if (attachInfo) {
                attachInfo.textContent = `Attachments (${fileCount})`;
            }
        });
        
        fileInput.click();
    });
});

// Window resize handling
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
        // Reset hamburger icon
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            const bars = navToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// Initialize any animations or effects
document.addEventListener('DOMContentLoaded', () => {
    // Fade in elements when they come into view
    const fadeElements = document.querySelectorAll('.service-card, .section-title, .section-text, .fade-in, .slide-in-left, .slide-in-right');
    
    // Add data-animate attribute to elements that should animate
    fadeElements.forEach(el => {
        if (!el.hasAttribute('data-animate')) {
            el.setAttribute('data-animate', 'true');
        }
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered delay for cards
                if (entry.target.classList.contains('service-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        if (!element.classList.contains('visible')) {
            observer.observe(element);
        }
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
    
    // Add pulse animation to buttons on hover
    const buttons = document.querySelectorAll('.btn-primary, .btn-accent');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.3s ease-in-out';
        });
        
        button.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
});

// Prevent form submission on Enter key in input fields (except textarea)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
        const form = e.target.closest('form');
        if (form) {
            const nextInput = Array.from(form.querySelectorAll('input, textarea, button'))
                .find((el, index, arr) => arr.indexOf(e.target) === index - 1);
            if (nextInput) {
                nextInput.focus();
            }
        }
    }
});

// Enhanced form field interactions
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    if (input) {
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            group.classList.remove('focused');
        });
    }
});

// Add subtle animations to service cards on page load
window.addEventListener('load', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.backgroundPositionY = rate + 'px';
    }
});

console.log('Stonebridge Holdings LLC - Website loaded successfully');