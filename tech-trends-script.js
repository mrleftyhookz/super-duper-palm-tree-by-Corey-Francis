// Tech Trends Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js for hero section
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Demo Tabs Functionality
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoPanels = document.querySelectorAll('.demo-panel');

    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            demoTabs.forEach(t => t.classList.remove('active'));
            demoPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding panel
            const panelId = `${tab.dataset.tab}-panel`;
            document.getElementById(panelId).classList.add('active');
            
            // Initialize the appropriate visualization
            if (tab.dataset.tab === 'quantum') {
                initQuantumSimulation();
            } else if (tab.dataset.tab === 'ai') {
                initAISimulation();
            } else if (tab.dataset.tab === 'blockchain') {
                initBlockchainSimulation();
            }
        });
    });

    // Quantum Computing Simulation
    function initQuantumSimulation() {
        const container = document.getElementById('quantum-simulation');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create qubits
        const qubitCount = 10;
        for (let i = 0; i < qubitCount; i++) {
            const qubit = document.createElement('div');
            qubit.classList.add('qubit');
            
            // Position randomly within container
            const x = Math.random() * (container.offsetWidth - 40) + 20;
            const y = Math.random() * (container.offsetHeight - 40) + 20;
            
            qubit.style.left = `${x}px`;
            qubit.style.top = `${y}px`;
            
            container.appendChild(qubit);
            
            // Add animation
            animateQubit(qubit);
        }
    }

    function animateQubit(qubit) {
        // Random orbit animation
        const orbitRadius = Math.random() * 30 + 20;
        const orbitSpeed = Math.random() * 5 + 2;
        const startAngle = Math.random() * Math.PI * 2;
        
        const centerX = parseFloat(qubit.style.left) + 10;
        const centerY = parseFloat(qubit.style.top) + 10;
        
        let angle = startAngle;
        
        function orbit() {
            angle += 0.02 * orbitSpeed;
            
            const x = centerX + Math.cos(angle) * orbitRadius - 10;
            const y = centerY + Math.sin(angle) * orbitRadius - 10;
            
            qubit.style.left = `${x}px`;
            qubit.style.top = `${y}px`;
            
            // Pulse effect
            const scale = 1 + Math.sin(angle * 2) * 0.2;
            qubit.style.transform = `scale(${scale})`;
            
            requestAnimationFrame(orbit);
        }
        
        orbit();
    }

    // AI Pattern Recognition Simulation
    function initAISimulation() {
        const container = document.getElementById('ai-simulation');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create data points
        const dataPointCount = 100;
        const dataPoints = [];
        
        for (let i = 0; i < dataPointCount; i++) {
            const dataPoint = document.createElement('div');
            dataPoint.classList.add('data-point');
            
            // Position randomly within container
            const x = Math.random() * (container.offsetWidth - 10);
            const y = Math.random() * (container.offsetHeight - 10);
            
            dataPoint.style.left = `${x}px`;
            dataPoint.style.top = `${y}px`;
            
            container.appendChild(dataPoint);
            dataPoints.push(dataPoint);
        }
        
        // Create detection area
        const detectionArea = document.createElement('div');
        detectionArea.classList.add('detection-area');
        container.appendChild(detectionArea);
        
        // Animate AI detection
        animateAIDetection(container, dataPoints, detectionArea);
    }

    function animateAIDetection(container, dataPoints, detectionArea) {
        // Reset all data points
        dataPoints.forEach(point => {
            point.classList.remove('anomaly', 'normal');
        });
        
        // Create a cluster of anomalies
        const anomalyCount = Math.floor(Math.random() * 5) + 3;
        const anomalyCenterX = Math.random() * (container.offsetWidth - 100) + 50;
        const anomalyCenterY = Math.random() * (container.offsetHeight - 100) + 50;
        
        // Mark anomalies
        for (let i = 0; i < anomalyCount; i++) {
            const randomIndex = Math.floor(Math.random() * dataPoints.length);
            const point = dataPoints[randomIndex];
            
            // Position near the anomaly center
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            
            point.style.left = `${anomalyCenterX + offsetX}px`;
            point.style.top = `${anomalyCenterY + offsetY}px`;
            
            point.classList.add('anomaly');
        }
        
        // Animate detection area
        setTimeout(() => {
            detectionArea.style.width = '30px';
            detectionArea.style.height = '30px';
            detectionArea.style.left = `${anomalyCenterX - 15}px`;
            detectionArea.style.top = `${anomalyCenterY - 15}px`;
            
            setTimeout(() => {
                detectionArea.style.width = '120px';
                detectionArea.style.height = '120px';
                detectionArea.style.left = `${anomalyCenterX - 60}px`;
                detectionArea.style.top = `${anomalyCenterY - 60}px`;
                
                // Mark normal points
                dataPoints.forEach(point => {
                    if (!point.classList.contains('anomaly')) {
                        point.classList.add('normal');
                    }
                });
                
                // Repeat the animation after delay
                setTimeout(() => {
                    animateAIDetection(container, dataPoints, detectionArea);
                }, 3000);
            }, 1000);
        }, 1000);
    }

    // Blockchain Simulation
    function initBlockchainSimulation() {
        const container = document.getElementById('blockchain-simulation');
        if (!container) return;
        
        // Clear existing content
        container.innerHTML = '';
        
        // Create blocks
        const blockCount = 5;
        const blocks = [];
        
        for (let i = 0; i < blockCount; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            
            // Position blocks in a chain
            const x = 50 + i * 100;
            const y = container.offsetHeight / 2 - 40;
            
            block.style.left = `${x}px`;
            block.style.top = `${y}px`;
            
            // Block content
            block.innerHTML = `
                <div>Block ${i}</div>
                <div class="block-hash">${generateHash()}</div>
            `;
            
            container.appendChild(block);
            blocks.push(block);
            
            // Create connection between blocks
            if (i > 0) {
                createBlockConnection(container, blocks[i-1], block);
            }
        }
        
        // Animate blockchain
        animateBlockchain(container, blocks);
    }

    function createBlockConnection(container, fromBlock, toBlock) {
        const connection = document.createElement('div');
        connection.classList.add('block-connection');
        
        const fromX = parseFloat(fromBlock.style.left) + 60;
        const fromY = parseFloat(fromBlock.style.top) + 40;
        const toX = parseFloat(toBlock.style.left);
        const toY = parseFloat(toBlock.style.top) + 40;
        
        const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        connection.style.width = `${length}px`;
        connection.style.left = `${fromX}px`;
        connection.style.top = `${fromY}px`;
        connection.style.transform = `rotate(${angle}rad)`;
        
        container.appendChild(connection);
    }

    function animateBlockchain(container, blocks) {
        // Simulate adding a new block
        setTimeout(() => {
            const lastBlock = blocks[blocks.length - 1];
            const newBlock = document.createElement('div');
            newBlock.classList.add('block');
            
            const x = parseFloat(lastBlock.style.left) + 100;
            const y = parseFloat(lastBlock.style.top);
            
            newBlock.style.left = `${x}px`;
            newBlock.style.top = `${y}px`;
            newBlock.style.opacity = '0';
            newBlock.style.transform = 'scale(0.5)';
            
            newBlock.innerHTML = `
                <div>Block ${blocks.length}</div>
                <div class="block-hash">${generateHash()}</div>
            `;
            
            container.appendChild(newBlock);
            blocks.push(newBlock);
            
            // Animate new block appearance
            setTimeout(() => {
                newBlock.style.opacity = '1';
                newBlock.style.transform = 'scale(1)';
                
                // Create connection
                createBlockConnection(container, lastBlock, newBlock);
                
                // If too many blocks, remove the first one
                if (blocks.length > 6) {
                    const firstBlock = blocks.shift();
                    firstBlock.style.opacity = '0';
                    firstBlock.style.transform = 'scale(0.5)';
                    
                    setTimeout(() => {
                        container.removeChild(firstBlock);
                        
                        // Shift all blocks to the left
                        blocks.forEach((block, index) => {
                            const newX = 50 + index * 100;
                            block.style.left = `${newX}px`;
                        });
                        
                        // Update connections
                        const connections = container.querySelectorAll('.block-connection');
                        connections.forEach(conn => container.removeChild(conn));
                        
                        for (let i = 1; i < blocks.length; i++) {
                            createBlockConnection(container, blocks[i-1], blocks[i]);
                        }
                    }, 500);
                }
                
                // Continue animation
                setTimeout(() => {
                    animateBlockchain(container, blocks);
                }, 3000);
            }, 500);
        }, 3000);
    }

    function generateHash() {
        const chars = '0123456789abcdef';
        let hash = '0x';
        for (let i = 0; i < 8; i++) {
            hash += chars[Math.floor(Math.random() * chars.length)];
        }
        return hash;
    }

    // Initialize the default visualization
    initQuantumSimulation();

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.trend-card, .stat-card, .step').forEach(el => {
        observer.observe(el);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Console Easter Egg
    console.log(`
%c🔮 Welcome to the Future of Finance & Technology! 🔮

%cCorey Francis - Where Finance Meets Cybersecurity & Innovation

%c💡 Quantum Computing will revolutionize financial security by 2030
🔒 Zero Trust Architecture is the new standard for financial systems
⚡ Edge Computing enables real-time financial fraud detection
`, 
'color: #3b82f6; font-size: 16px; font-weight: bold;',
'color: #1f2937; font-size: 14px;',
'color: #6b7280; font-size: 12px;'
);
});