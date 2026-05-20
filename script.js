document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const photoGallery = document.getElementById('photoGallery');
    const photoCards = document.querySelectorAll('.photo-card');
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const particles = document.getElementById('particles');

    createFlowers();

    introScreen.addEventListener('click', function() {
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            initGallery();
            playMusic();
        }, 1000);
    });

    function createFlowers() {
        const flowerEmojis = ['🌸', '✨', '💫', '🌷', '🪻', '🌺'];
        
        for (let i = 0; i < 15; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            flower.style.left = Math.random() * 100 + '%';
            flower.style.top = Math.random() * 100 + '%';
            flower.style.animationDelay = Math.random() * 4 + 's';
            flower.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            particles.appendChild(flower);
        }
    }

    let isPlaying = false;

    function playMusic() {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
        }).catch(err => {
            console.log('Music autoplay requires user interaction');
        });
    }

    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            isPlaying = true;
        }
    });

    function initGallery() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        const timelineSections = document.querySelectorAll('.timeline-section');
        timelineSections.forEach(section => {
            observer.observe(section);
        });

        photoCards.forEach(card => {
            observer.observe(card);
        });
    }

    photoCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = card.querySelector('.photo');
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            photoModal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', function() {
        photoModal.classList.remove('active');
    });

    photoModal.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            photoModal.classList.remove('active');
        }
    });

    const finalMessage = document.getElementById('finalMessage');
    const confettiContainer = document.getElementById('confetti');
    
    const finalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createConfetti();
            }
        });
    }, {
        threshold: 0.3
    });

    finalObserver.observe(finalMessage);

    function createConfetti() {
        const colors = ['#e8d4cc', '#d4c4b5', '#c9a89a', '#f0ebe8', '#f5ebe6'];
        const shapes = ['circle', 'square'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 6 + 4) + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                }
                
                confettiContainer.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }, i * 100);
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && photoModal.classList.contains('active')) {
            photoModal.classList.remove('active');
        }
    });

    const navHint = document.querySelector('.nav-hint');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            if (navHint) {
                navHint.style.opacity = '0';
                navHint.style.visibility = 'hidden';
            }
        } else {
            if (navHint) {
                navHint.style.opacity = '0.6';
                navHint.style.visibility = 'visible';
            }
        }
    });

    photoCards.forEach((card, index) => {
        card.style.transitionDelay = (index % 5) * 0.1 + 's';
    });

    function addTouchFeedback() {
        photoCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    addTouchFeedback();
});

window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, window.scrollY);
    }, 100);
});