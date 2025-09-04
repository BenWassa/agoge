// Enhanced face rotation functionality with randomization
let currentFaceIndex = 0;
let faceOrder = []; // Will hold randomized order of faces
const faces = document.querySelectorAll('.face');
const totalFaces = faces.length;
let faceRotationInterval;

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize random face order
function initializeRandomFaceOrder() {
    // Create array of face indices [0, 1, 2, 3, 4, 5]
    const faceIndices = Array.from({length: totalFaces}, (_, i) => i);
    
    // Shuffle the order
    faceOrder = shuffleArray(faceIndices);
    
    // Start with a random position in the shuffled array
    currentFaceIndex = Math.floor(Math.random() * totalFaces);
    
    // Set the initial active face
    faces.forEach(face => face.classList.remove('active'));
    faces[faceOrder[currentFaceIndex]].classList.add('active');
}

function rotateFaces() {
    if (totalFaces === 0 || faceOrder.length === 0) return;
    
    // Remove active class from current face
    faces[faceOrder[currentFaceIndex]].classList.remove('active');
    
    // Move to the next face in the randomized order
    currentFaceIndex = (currentFaceIndex + 1) % totalFaces;
    
    // Add active class to the new current face
    faces[faceOrder[currentFaceIndex]].classList.add('active');
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
    // Initialize random face order first
    initializeRandomFaceOrder();
    
    // Preload images for smooth transitions
    // Paths are relative to the index.html file
    const imageUrls = [
        'assets/faces/Maasai_man.png',
        'assets/faces/Spartan_man.png', 
        'assets/faces/Japan_man.png',
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