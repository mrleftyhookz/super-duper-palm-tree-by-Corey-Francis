// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .timeline-item, .cert-card').forEach(el => {
    observer.observe(el);
});

// Animate skill bars when they come into view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width;
                }, index * 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    
    // In a real implementation, this would send to a backend
    console.log('Form submitted:', { name, email, company, message });
    
    // Show success message
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = 'Message Sent!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        this.reset();
    }, 3000);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Floating elements animation
const floatingElements = document.querySelectorAll('.float-item');
floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('$')) {
            element.textContent = `$${current.toLocaleString()}${current >= 1000000000 ? 'B+' : 'M+'}`;
        } else if (element.textContent.includes('%')) {
            element.textContent = `${current}%`;
        } else {
            element.textContent = `${current}+`;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target = 0;
                
                if (text.includes('$5.1B+')) {
                    animateCounter(stat, 0, 5.1, 2000);
                } else if (text.includes('30%')) {
                    animateCounter(stat, 0, 30, 1500);
                } else if (text.includes('15+')) {
                    animateCounter(stat, 0, 15, 1000);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Dynamic background color based on time
function setThemeBasedOnTime() {
    const hour = new Date().getHours();
    const body = document.body;
    
    if (hour >= 18 || hour < 6) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

// Add dark mode styles
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        --bg-primary: #111827;
        --bg-secondary: #1f2937;
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --border-color: #374151;
    }
    
    .dark-mode .navbar {
        background: rgba(17, 24, 39, 0.95);
        border-color: #374151;
    }
    
    .dark-mode .skill-category,
    .dark-mode .timeline-content,
    .dark-mode .cert-card,
    .dark-mode .contact-form {
        background: #1f2937;
        border-color: #374151;
    }
`;
document.head.appendChild(style);

// Initialize theme
setThemeBasedOnTime();

// Update theme every hour
setInterval(setThemeBasedOnTime, 3600000);

// Performance optimization - lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="email"]'
        );
        
        if (document.activeElement === focusableElements[focusableElements.length - 1]) {
            e.preventDefault();
            focusableElements[0].focus();
        }
    }
});

// Console Easter egg
console.log(`
%c👋 Hey there, fellow developer!

%cCorey Francis - Finance Leader | Cybersecurity Expert | Systems Innovator

%c💡 Fun fact: I've optimized over $5.1B in payments and reduced costs by 30%+
🔒 Security+ certified and ready to secure your financial future

Let's connect: coreyfrancis1981@outlook.com
`, 
'color: #2563eb; font-size: 16px; font-weight: bold;',
'color: #1f2937; font-size: 14px;',
'color: #6b7280; font-size: 12px;'
);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyle);