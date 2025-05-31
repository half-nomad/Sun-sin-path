// Navigation & 카드 클릭
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 카드 클릭 기능
function makeCardsClickable() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const link = card.querySelector('.feature-link');
        if (link) {
            const href = link.getAttribute('href');
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                if (e.target.closest('.feature-link')) return;
                window.location.href = href;
            });
        }
    });
    console.log('✅ 카드 클릭 기능 활성화');
}

// Scroll & Animation
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

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

// Typing Text
const typingTexts = [
    "충무공 이순신의 발자취를 따라 떠나는 역사 여행",
    "한산도부터 명량까지, 승리의 항로를 탐험하세요",
    "살아있는 역사를 만나는 특별한 여정"
];
let textIndex = 0, charIndex = 0, isDeleting = false;
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
        setTimeout(typeText, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        setTimeout(typeText, 500);
    } else {
        setTimeout(typeText, isDeleting ? 50 : 100);
    }
}

// Particles
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
    createParticles();
    makeCardsClickable();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-fade-in, .feature-card').forEach(el => 
        observer.observe(el)
    );
});

function openVideo() { alert('비디오 기능은 곧 추가됩니다!'); }