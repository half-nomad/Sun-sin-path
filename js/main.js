// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Typing Animation
const typingTexts = [
    "충무공 이순신의 발자취를 따라 떠나는 역사 여행",
    "한산도부터 명량까지, 승리의 항로를 탐험하세요",
    "살아있는 역사를 만나는 특별한 여정"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, pauseTime);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    }
}

// Particle Animation
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = Math.random() * 3 + 5 + 's';
        container.appendChild(particle);
    }
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // 특별한 애니메이션 트리거
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
            }
        }
    });
}, observerOptions);

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Create particles
    createParticles();
    
    // Observe elements
    const elements = document.querySelectorAll('.scroll-fade-in, .feature-card');
    elements.forEach(el => observer.observe(el));
});

// Video Modal (placeholder)
function openVideo() {
    alert('비디오 기능은 곧 추가됩니다!');
}