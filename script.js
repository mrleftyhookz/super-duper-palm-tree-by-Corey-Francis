// Enhanced Portfolio Script - Corey Francis
// Interactive features for trading-style portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initParticles();
    initScrollEffects();
    initDashboard();
    initMobileMenu();
    initContactForm();
    initAnimations();
});

// Particle Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
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
                    value: '#06d6a0'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.1,
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
                    color: '#06d6a0',
                    opacity: 0.05,
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
                            opacity: 0.2
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Dashboard Live Updates
function initDashboard() {
    const metrics = {
        accuracy: { element: document.getElementById('accuracy'), base: 73.2, variance: 2 },
        sharpe: { element: document.getElementById('sharpe'), base: 1.84, variance: 0.1 },
        drawdown: { element: document.getElementById('drawdown'), base: -12.3, variance: 1.5 },
        winrate: { element: document.getElementById('winrate'), base: 68.7, variance: 3 },
        gpu: { element: document.getElementById('gpu'), base: 84, variance: 5 },
        retrain: { element: document.getElementById('retrain'), base: 0, variance: 0 }
    };

    function updateMetrics() {
        Object.keys(metrics).forEach(key => {
            const metric = metrics[key];
            if (!metric.element) return;

            if (key === 'retrain') {
                // Update retrain timer
                const seconds = Math.floor(Math.random() * 15) + 1;
                metric.element.textContent = `${seconds}s ago`;
            } else {
                // Update numeric metrics with realistic variance
                const variance = (Math.random() - 0.5) * metric.variance;
                const newValue = metric.base + variance;
                
                if (key === 'accuracy' || key === 'winrate') {
                    metric.element.textContent = `${newValue.toFixed(1)}%`;
                } else if (key === 'sharpe') {
                    metric.element.textContent = newValue.toFixed(2);
                } else if (key === 'drawdown') {
                    metric.element.textContent = `${newValue.toFixed(1)}%`;
                } else if (key === 'gpu') {
                    metric.element.textContent = `${Math.round(newValue)}%`;
                }
            }
        });

        // Update signals occasionally
        if (Math.random() < 0.3) {
            updateSignals();
        }
    }

    function updateSignals() {
        const signalsContainer = document.querySelector('.signals-list');
        if (!signalsContainer) return;

        const stocks = ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN'];
        const actions = ['BUY', 'SELL'];
        
        const now = new Date();
        const timeString = now.toTimeString().substr(0, 8);
        
        const stock = stocks[Math.floor(Math.random() * stocks.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const confidence = (Math.random() * 20 + 80).toFixed(1); // 80-100%
        
        const newSignal = document.createElement('div');
        newSignal.className = 'signal-item';
        newSignal.innerHTML = `
            <span class="signal-time">${timeString}</span>
            <span class="signal-pair">${stock}</span>
            <span class="signal-action ${action.toLowerCase()}">${action}</span>
            <span class="signal-confidence">${confidence}%</span>
        `;
        
        // Add new signal to top and remove oldest if more than 3
        signalsContainer.insertBefore(newSignal, signalsContainer.firstChild);
        if (signalsContainer.children.length > 3) {
            signalsContainer.removeChild(signalsContainer.lastChild);
        }
    }

    // Update every 3-8 seconds
    setInterval(updateMetrics, Math.random() * 5000 + 3000);
    
    // Initial update
    updateMetrics();
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Simulate form submission
            const submitBtn = form.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#22c55e';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards and sections
    const animateElements = document.querySelectorAll('.card, .stat-card, .project-card, .insight-card, .timeline-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Terminal Animation
function animateTerminal() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 0.5}s`;
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        if (numericTarget) {
            let current = 0;
            const increment = numericTarget / 50;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericTarget) {
                    current = numericTarget;
                    clearInterval(timer);
                }
                
                // Format the number based on original format
                if (target.includes('$') && target.includes('B')) {
                    counter.textContent = `$${current.toFixed(1)}B+`;
                } else if (target.includes('$') && target.includes('K')) {
                    counter.textContent = `$${Math.round(current)}K+`;
                } else if (target.includes('+')) {
                    counter.textContent = `${Math.round(current)}+`;
                } else if (target.includes('s')) {
                    counter.textContent = `${Math.round(current)}s`;
                } else {
                    counter.textContent = Math.round(current);
                }
            }, 50);
        }
    });
}

// Performance monitoring
function monitorPerformance() {
    // Basic performance monitoring
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
            }
        });
    });
    
    observer.observe({entryTypes: ['navigation']});
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href').substr(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Initialize performance monitoring
monitorPerformance();

// Add some easter eggs for developers who inspect the code
console.log(`
🚀 Corey Francis Portfolio - Enhanced Version
🔥 Built with: HTML5, CSS3, Vanilla JS
⚡ Features: Live dashboard, particle effects, responsive design
💼 Finance + AI: Systems that reconcile, predict, and profit
📧 Contact: coreyfrancis1981@outlook.com
`);

// Add some market-style logging
setInterval(() => {
    const messages = [
        '📊 Model retraining completed',
        '⚡ GPU utilization optimized', 
        '🎯 New trading signal generated',
        '🔒 Security scan completed',
        '📈 Performance metrics updated'
    ];
    
    if (Math.random() < 0.1) { // 10% chance every interval
        console.log(`[${new Date().toTimeString().substr(0, 8)}] ${messages[Math.floor(Math.random() * messages.length)]}`);
    }
}, 5000);