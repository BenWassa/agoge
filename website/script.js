// Enhanced face rotation functionality
let currentFace = 0;
const faces = document.querySelectorAll('.face');
const totalFaces = faces.length;
let faceRotationInterval;

function rotateFaces() {
    if (totalFaces === 0) return;
    
    // Remove active class from current face
    faces[currentFace].classList.remove('active');
    
    // Move to the next face, loop back if at the end
    currentFace = (currentFace + 1) % totalFaces;
    
    // Add active class to the new current face
    faces[currentFace].classList.add('active');
}

function startFaceRotation() {
    // Clear any existing interval to prevent duplicates
    clearInterval(faceRotationInterval);
    // Start rotation after page load (or resume)
    faceRotationInterval = setInterval(rotateFaces, 5000); // Rotate every 5 seconds
}

function pauseFaceRotation() {
    clearInterval(faceRotationInterval);
}

// Initialize face rotation when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Preload images for smooth transitions
    // Paths are relative to the index.html file
    const imageUrls = [
        'assets/faces/Maasai_man.png',
        'assets/faces/Spartan_man.png', 
        'assets/faces/Norse_man.png',    // For Viking
        'assets/faces/Japan_man.png',    // For Samurai
        'assets/faces/Yanomami_man.png',
        'assets/faces/Persian_man.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    // Start rotation after a brief delay to allow initial rendering
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
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset the bottom to trigger slightly earlier
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once visible to prevent re-triggering and improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with the 'fade-in' class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});