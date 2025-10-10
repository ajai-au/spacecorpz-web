// // Main JavaScript for SPACECORPZ Website
// class SPACECORPZ {
//     constructor() {
//         this.isLightMode = localStorage.getItem('lightMode') === 'true';
//         this.init();
//     }

//     init() {
//         this.initTheme();
//         this.initNavigation();
//         this.initScrollAnimations();
//         this.initStats();
//         this.initSmoothScrolling();
//         this.bindEvents();
//     }

//     initTheme() {
//         const body = document.body;
//         const themeToggle = document.getElementById('themeToggle');
//         const themeIcon = themeToggle.querySelector('.theme-icon');

//         if (this.isLightMode) {
//             body.setAttribute('data-theme', 'light');
//             themeIcon.textContent = '🌙';
//         } else {
//             body.setAttribute('data-theme', 'dark');
//             themeIcon.textContent = '☀️';
//         }

//         themeToggle.addEventListener('click', () => {
//             this.toggleTheme();
//         });
//     }

//     toggleTheme() {
//         const body = document.body;
//         const themeToggle = document.getElementById('themeToggle');
//         const themeIcon = themeToggle.querySelector('.theme-icon');

//         this.isLightMode = !this.isLightMode;
        
//         if (this.isLightMode) {
//             body.setAttribute('data-theme', 'light');
//             themeIcon.textContent = '🌙';
//         } else {
//             body.setAttribute('data-theme', 'dark');
//             themeIcon.textContent = '☀️';
//         }

//         localStorage.setItem('lightMode', this.isLightMode.toString());
        
//         // Animate the toggle
//         themeToggle.style.transform = 'rotate(360deg)';
//         setTimeout(() => {
//             themeToggle.style.transform = '';
//         }, 300);
//     }

//     initNavigation() {
//         const navToggle = document.getElementById('navToggle');
//         const navMenu = document.querySelector('.nav-menu');
        
//         if (navToggle && navMenu) {
//             navToggle.addEventListener('click', () => {
//                 navMenu.classList.toggle('active');
//                 navToggle.classList.toggle('active');
//             });
//         }

//         // Highlight active nav link based on current page
//         this.setActiveNavLink();

//         // Navbar scroll effect
//         this.initNavbarScroll();
//     }

//     setActiveNavLink() {
//         const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//         const navLinks = document.querySelectorAll('.nav-link');
        
//         navLinks.forEach(link => {
//             link.classList.remove('active');
//             if (link.getAttribute('href') === currentPage) {
//                 link.classList.add('active');
//             }
//         });
//     }

//     initNavbarScroll() {
//         const navbar = document.querySelector('.navbar');
//         let lastScrollTop = 0;

//         window.addEventListener('scroll', () => {
//             const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
//             if (scrollTop > lastScrollTop && scrollTop > 100) {
//                 // Scrolling down
//                 navbar.style.transform = 'translateY(-100%)';
//             } else {
//                 // Scrolling up
//                 navbar.style.transform = 'translateY(0)';
//             }
            
//             lastScrollTop = scrollTop;
//         });
//     }

//     initScrollAnimations() {
//         // Intersection Observer for scroll animations
//         const observerOptions = {
//             threshold: 0.1,
//             rootMargin: '0px 0px -50px 0px'
//         };

//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('fade-in');
//                 }
//             });
//         }, observerOptions);

//         // Observe elements with animation classes
//         const animatedElements = document.querySelectorAll(
//             '.feature-card, .stat-item, .gallery-item, .news-article, .faq-item'
//         );

//         animatedElements.forEach(el => {
//             observer.observe(el);
//         });
//     }

//     initStats() {
//         const statNumbers = document.querySelectorAll('.stat-number');
        
//         const animateStats = () => {
//             statNumbers.forEach(stat => {
//                 const target = parseInt(stat.getAttribute('data-target'));
//                 const increment = target / 100;
//                 let current = 0;
                
//                 const timer = setInterval(() => {
//                     current += increment;
//                     if (current >= target) {
//                         current = target;
//                         clearInterval(timer);
//                     }
//                     stat.textContent = Math.floor(current);
//                 }, 20);
//             });
//         };

//         // Trigger animation when stats section is visible
//         const statsSection = document.querySelector('.stats');
//         if (statsSection) {
//             const observer = new IntersectionObserver((entries) => {
//                 entries.forEach(entry => {
//                     if (entry.isIntersecting) {
//                         animateStats();
//                         observer.disconnect();
//                     }
//                 });
//             }, { threshold: 0.5 });

//             observer.observe(statsSection);
//         }
//     }

//     initSmoothScrolling() {
//         // Smooth scroll for internal links
//         document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function (e) {
//                 e.preventDefault();
//                 const target = document.querySelector(this.getAttribute('href'));
//                 if (target) {
//                     target.scrollIntoView({
//                         behavior: 'smooth',
//                         block: 'start'
//                     });
//                 }
//             });
//         });
//     }

//     bindEvents() {
//         // Newsletter form
//         const newsletterForms = document.querySelectorAll('.newsletter-form');
//         newsletterForms.forEach(form => {
//             form.addEventListener('submit', (e) => {
//                 e.preventDefault();
//                 this.handleNewsletterSubmit(form);
//             });
//         });

//         // Add hover effects to buttons
//         this.initButtonEffects();

//         // Add parallax effect to hero section
//         this.initParallax();
//     }

//     handleNewsletterSubmit(form) {
//         const email = form.querySelector('input[type="email"]').value;
//         const button = form.querySelector('button');
//         const originalText = button.textContent;

//         // Simulate API call
//         button.textContent = 'Subscribing...';
//         button.disabled = true;

//         setTimeout(() => {
//             button.textContent = 'Subscribed!';
//             button.style.background = 'var(--success-color)';
            
//             setTimeout(() => {
//                 button.textContent = originalText;
//                 button.disabled = false;
//                 button.style.background = '';
//                 form.reset();
//             }, 2000);
//         }, 1000);

//         // Here you would normally send the email to your backend
//         console.log('Newsletter subscription:', email);
//     }

//     initButtonEffects() {
//         // Add ripple effect to buttons
//         document.querySelectorAll('.cta-button, .filter-btn').forEach(button => {
//             button.addEventListener('click', function(e) {
//                 const ripple = document.createElement('span');
//                 const rect = this.getBoundingClientRect();
//                 const size = Math.max(rect.width, rect.height);
//                 const x = e.clientX - rect.left - size / 2;
//                 const y = e.clientY - rect.top - size / 2;
                
//                 ripple.style.cssText = `
//                     position: absolute;
//                     width: ${size}px;
//                     height: ${size}px;
//                     left: ${x}px;
//                     top: ${y}px;
//                     background: rgba(255, 255, 255, 0.3);
//                     border-radius: 50%;
//                     transform: scale(0);
//                     animation: ripple 0.6s ease-out;
//                     pointer-events: none;
//                 `;
                
//                 if (this.style.position !== 'relative') {
//                     this.style.position = 'relative';
//                 }
//                 this.appendChild(ripple);
                
//                 setTimeout(() => {
//                     ripple.remove();
//                 }, 600);
//             });
//         });

//         // Add CSS animation for ripple effect
//         const style = document.createElement('style');
//         style.textContent = `
//             @keyframes ripple {
//                 to {
//                     transform: scale(4);
//                     opacity: 0;
//                 }
//             }
//         `;
//         document.head.appendChild(style);
//     }

//     initParallax() {
//         const hero = document.querySelector('.hero');
//         const particles = document.querySelector('.particles');
        
//         if (hero && particles) {
//             window.addEventListener('scroll', () => {
//                 const scrolled = window.pageYOffset;
//                 const speed = scrolled * 0.5;
//                 particles.style.transform = `translateY(${speed}px)`;
//             });
//         }
//     }

//     // Utility functions
//     debounce(func, wait) {
//         let timeout;
//         return function executedFunction(...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args);
//             };
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         };
//     }

//     formatDate(date) {
//         return new Date(date).toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric'
//         });
//     }

//     showNotification(message, type = 'info') {
//         const notification = document.createElement('div');
//         notification.className = `notification notification-${type}`;
//         notification.textContent = message;
        
//         notification.style.cssText = `
//             position: fixed;
//             top: 100px;
//             right: 20px;
//             background: var(--primary-color);
//             color: white;
//             padding: 1rem 2rem;
//             border-radius: 8px;
//             box-shadow: var(--shadow-lg);
//             z-index: 10000;
//             animation: slideInRight 0.3s ease-out;
//         `;
        
//         document.body.appendChild(notification);
        
//         setTimeout(() => {
//             notification.style.animation = 'slideOutRight 0.3s ease-out';
//             setTimeout(() => {
//                 notification.remove();
//             }, 300);
//         }, 3000);
//     }
// }

// // Initialize the application when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new SPACECORPZ();
// });

// // Handle page transitions
// window.addEventListener('beforeunload', () => {
//     document.body.style.opacity = '0';
// });

// // Add loading animation
// window.addEventListener('load', () => {
//     document.body.style.opacity = '1';
// });

// // Add custom cursor for interactive elements (optional enhancement)
// const addCustomCursor = () => {
//     const cursor = document.createElement('div');
//     cursor.classList.add('custom-cursor');
//     cursor.style.cssText = `
//         position: fixed;
//         width: 20px;
//         height: 20px;
//         background: var(--primary-color);
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9999;
//         transition: transform 0.1s ease;
//         opacity: 0;
//     `;
//     document.body.appendChild(cursor);

//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX - 10 + 'px';
//         cursor.style.top = e.clientY - 10 + 'px';
//         cursor.style.opacity = '1';
//     });

//     document.addEventListener('mouseenter', () => {
//         cursor.style.opacity = '1';
//     });

//     document.addEventListener('mouseleave', () => {
//         cursor.style.opacity = '0';
//     });

//     // Scale cursor on hover over interactive elements
//     document.querySelectorAll('a, button, .cta-button').forEach(el => {
//         el.addEventListener('mouseenter', () => {
//             cursor.style.transform = 'scale(1.5)';
//         });
//         el.addEventListener('mouseleave', () => {
//             cursor.style.transform = 'scale(1)';
//         });
//     });
// };

// // Uncomment to enable custom cursor
// // addCustomCursor();

// // Export for use in other modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = SPACECORPZ;
// }


// Main JavaScript for AeroDyne Website
class SPACECORPZ {
    constructor() {
        this.isLightMode = localStorage.getItem('lightMode') === 'true';
        this.init();
    }

    init() {
        this.initTheme();
        this.initNavigation();
        this.initScrollAnimations();
        this.initStats();
        this.initSmoothScrolling();
        this.bindEvents();
    }
    

    initTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');

        if (this.isLightMode) {
            body.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        }

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        const body = document.body;
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');

        this.isLightMode = !this.isLightMode;
        
        if (this.isLightMode) {
            body.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        }

        localStorage.setItem('lightMode', this.isLightMode.toString());
        
        // Animate the toggle
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }

    initNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            // Show the toggle button on mobile
            navToggle.style.display = 'flex';
            
            navToggle.addEventListener('click', () => {
                // console.log('Menu toggle clicked'); // Debug log
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Prevent body scroll when menu is open
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    // console.log('Menu opened'); // Debug log
                } else {
                    document.body.style.overflow = '';
                    // console.log('Menu closed'); // Debug log
                }
            });
            
            // Close menu when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        // Highlight active nav link based on current page
        this.setActiveNavLink();

        // Navbar scroll effect
        this.initNavbarScroll();
    }

    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(
            '.feature-card, .stat-item, .gallery-item, .news-article, .faq-item'
        );

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    initStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateStats = () => {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 20);
            });
        };

        // Trigger animation when stats section is visible
        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        observer.disconnect();
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }
    }

    initSmoothScrolling() {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    bindEvents() {
        // Newsletter form
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmit(form);
            });
        });

        // Add hover effects to buttons
        this.initButtonEffects();

        // Add parallax effect to hero section
        this.initParallax();
    }

    handleNewsletterSubmit(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;

        // Simulate API call
        button.textContent = 'Subscribing...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                form.reset();
            }, 2000);
        }, 1000);

        // Here you would normally send the email to your backend
        console.log('Newsletter subscription:', email);
    }

    initButtonEffects() {
        // Add ripple effect to buttons
        document.querySelectorAll('.cta-button, .filter-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                if (this.style.position !== 'relative') {
                    this.style.position = 'relative';
                }
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS animation for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    initParallax() {
        const hero = document.querySelector('.hero');
        const particles = document.querySelector('.particles');
        
        if (hero && particles) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const speed = scrolled * 0.5;
                particles.style.transform = `translateY(${speed}px)`;
            });
        }
    }

    // Utility functions
    debounce(func, wait) {
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

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SPACECORPZ();
});

// Handle page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add custom cursor for interactive elements (optional enhancement)
const addCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Scale cursor on hover over interactive elements
    document.querySelectorAll('a, button, .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
};

// Uncomment to enable custom cursor
// addCustomCursor();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SPACECORPZ;
}