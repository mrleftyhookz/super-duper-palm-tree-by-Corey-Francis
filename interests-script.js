// Interests Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Sports Cards Animation
    const sportsCards = document.querySelectorAll('.sports-card');
    sportsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.sports-card-inner').style.transform = 'rotateY(180deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.querySelector('.sports-card-inner').style.transform = 'rotateY(0deg)';
        });
    });

    // Music Player Functionality
    const playButton = document.querySelector('.play-button');
    const playerPlayButton = document.querySelector('.controls .play');
    const albumCover = document.querySelector('.album-cover');
    let isPlaying = false;

    function togglePlay() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    function playMusic() {
        isPlaying = true;
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        playerPlayButton.innerHTML = '<i class="fas fa-pause"></i>';
        animateProgress();
        createWaveformAnimation();
    }

    function pauseMusic() {
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        playerPlayButton.innerHTML = '<i class="fas fa-play"></i>';
        stopProgressAnimation();
        stopWaveformAnimation();
    }

    if (playButton) {
        playButton.addEventListener('click', togglePlay);
    }
    
    if (playerPlayButton) {
        playerPlayButton.addEventListener('click', togglePlay);
    }

    // Progress Bar Animation
    let progressInterval;
    const progressBar = document.querySelector('.progress');
    
    function animateProgress() {
        let width = 0;
        progressInterval = setInterval(() => {
            if (width >= 100) {
                clearInterval(progressInterval);
                pauseMusic();
                width = 0;
                progressBar.style.width = '0%';
            } else {
                width++;
                progressBar.style.width = width + '%';
                updateTrackTime(width);
            }
        }, 1500 / 100); // 1.5 seconds for demo
    }

    function stopProgressAnimation() {
        clearInterval(progressInterval);
    }

    function updateTrackTime(percentage) {
        const trackTime = document.querySelector('.track-time');
        const totalSeconds = 150; // 2:30 in seconds
        const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        trackTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds} / 2:30`;
    }

    // Create Waveform Animation
    function createWaveformAnimation() {
        const waveform = document.querySelector('.waveform');
        if (!waveform) return;
        
        // Clear existing bars
        while (waveform.firstChild) {
            waveform.removeChild(waveform.firstChild);
        }
        
        // Create new bars
        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.classList.add('waveform-bar');
            bar.style.left = `${i * 2}%`;
            bar.style.height = `${Math.random() * 70 + 10}%`;
            bar.style.animationDelay = `${Math.random() * 2}s`;
            waveform.appendChild(bar);
        }
    }

    function stopWaveformAnimation() {
        const waveform = document.querySelector('.waveform');
        if (!waveform) return;
        
        const bars = waveform.querySelectorAll('.waveform-bar');
        bars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }

    // Audio Player Functionality
    const audioPlayButton = document.getElementById('playButton');
    if (audioPlayButton) {
        let audioPlaying = false;
        
        audioPlayButton.addEventListener('click', () => {
            if (audioPlaying) {
                audioPlayButton.innerHTML = '<i class="fas fa-play"></i>';
                audioPlaying = false;
            } else {
                audioPlayButton.innerHTML = '<i class="fas fa-pause"></i>';
                audioPlaying = true;
                
                // Create waveform effect
                createAudioWaveform();
            }
        });
    }

    function createAudioWaveform() {
        const waveform = document.getElementById('waveform');
        if (!waveform) return;
        
        // Clear existing content
        waveform.innerHTML = '';
        
        // Create bars
        for (let i = 0; i < 100; i++) {
            const bar = document.createElement('div');
            bar.classList.add('waveform-bar');
            bar.style.left = `${i}%`;
            bar.style.height = `${Math.random() * 70 + 10}%`;
            bar.style.animation = `waveform ${Math.random() * 0.5 + 0.5}s infinite`;
            bar.style.animationDelay = `${Math.random() * 0.5}s`;
            waveform.appendChild(bar);
        }
    }

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
    document.querySelectorAll('.tech-item, .sports-card, .company-logo').forEach(el => {
        observer.observe(el);
    });

    // Tech Stack Hover Effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
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

    // Parallax Effect for Hero Section
    const interestsHero = document.querySelector('.interests-hero');
    if (interestsHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            interestsHero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        });
    }

    // Create dynamic audio waveform on page load
    createAudioWaveform();
});

// Console Easter Egg
console.log(`
%c🎵 Wu-Tang Clan Ain't Nuthing ta F' Wit! 🎵

%cCorey Francis - Where Finance Meets Hip-Hop and Sports

%c💰 Financial Security Expert by day, beat maker by night
🏈 Proud supporter of Pittsburgh's finest: Steelers, Penguins, Pirates
🎤 Wu-Tang and Eminem provide the soundtrack to innovation
`, 
'color: #f59e0b; font-size: 16px; font-weight: bold;',
'color: #1f2937; font-size: 14px;',
'color: #6b7280; font-size: 12px;'
);