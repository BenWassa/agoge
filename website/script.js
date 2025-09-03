// Enhanced face rotation functionality
let currentFace = 0;
const faces = document.querySelectorAll('.face');
const totalFaces = faces.length;
let faceRotationInterval;

function rotateFaces() {
    if (totalFaces === 0) return;
    
    faces[currentFace].classList.remove('active');
    currentFace = (currentFace + 1) % totalFaces;
    faces[currentFace].classList.add('active');
}

function startFaceRotation() {
    // Start rotation after page load
    faceRotationInterval = setInterval(rotateFaces, 5000);
}

function pauseFaceRotation() {
    clearInterval(faceRotationInterval);
}

// Initialize face rotation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Preload images for smooth transitions
    const imageUrls = [
        '../assets/faces/Maasai_man.png',
        '../assets/faces/Spartan_man.png', 
        '../assets/faces/Japan_man.png',
        '../assets/faces/Yanomami_man.png',
        '../assets/faces/Persian_man.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    // Start rotation after a brief delay
    setTimeout(startFaceRotation, 2000);
});

// Pause rotation when user hovers over hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mouseenter', pauseFaceRotation);
    heroSection.addEventListener('mouseleave', startFaceRotation);
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to prevent re-triggering
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Highlight navigation link based on scroll position
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});
