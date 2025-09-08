// Enhanced face rotation functionality with randomization
let currentFaceIndex = 0;
let faceOrder = []; // Will hold randomized order of faces
const faces = document.querySelectorAll('.face');
const totalFaces = faces.length;
let faceRotationInterval;

// Debug configuration
const DEBUG_ENABLED = true; // Set to false to disable all debug logging

// Debug function to log with timestamps
function debugLog(message, data = null) {
    if (!DEBUG_ENABLED) return;
    
    const timestamp = new Date().toISOString().slice(11, 23); // HH:MM:SS.mmm format
    if (data) {
        console.log(`[${timestamp}] ${message}`, data);
    } else {
        console.log(`[${timestamp}] ${message}`);
    }
}

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
    debugLog('🎭 Initializing face system...');
    
    // Create array of face indices [0, 1, 2, 3, 4]
    const faceIndices = Array.from({length: totalFaces}, (_, i) => i);
    
    // Shuffle the order
    faceOrder = shuffleArray(faceIndices);
    
    // Start with a random position in the shuffled array
    currentFaceIndex = Math.floor(Math.random() * totalFaces);
    
    // Set the initial active face
    faces.forEach(face => face.classList.remove('active'));
    
    faces[faceOrder[currentFaceIndex]].classList.add('active');
    
    debugLog('🎭 Face system initialized', {
        totalFaces,
        faceOrder,
        currentFaceIndex,
        activeFaceIndex: faceOrder[currentFaceIndex],
        activeFaceClass: faces[faceOrder[currentFaceIndex]].className
    });
}

function rotateFaces() {
    if (totalFaces === 0 || faceOrder.length === 0) return;
    
    const previousFaceIndex = faceOrder[currentFaceIndex];
    
    // Remove active class from current face
    faces[faceOrder[currentFaceIndex]].classList.remove('active');
    
    // Move to the next face in the randomized order
    currentFaceIndex = (currentFaceIndex + 1) % totalFaces;
    
    // Add active class to the new current face
    faces[faceOrder[currentFaceIndex]].classList.add('active');
    
    debugLog('🔄 Face rotated (basic function - no timer sync)', {
        from: previousFaceIndex,
        to: faceOrder[currentFaceIndex],
        currentFaceIndex,
        fromClass: faces[previousFaceIndex].className,
        toClass: faces[faceOrder[currentFaceIndex]].className
    });
}

function startFaceRotation() {
    // Redirect to timer version
    startFaceRotationWithTimer();
}

function pauseFaceRotation() {
    clearInterval(faceRotationInterval);
}

// Initialize face rotation when page loads
document.addEventListener('DOMContentLoaded', function() {
    debugLog('🚀 Page loaded - DOMContentLoaded fired');
    debugLog('🚀 Page initialization starting...');
    
    // Initialize random face order first
    initializeRandomFaceOrder();
    
    // Debug timer element availability
    const timerElement = document.querySelector('.timer-progress');
    debugLog('🚀 Timer element check', {
        timerElementFound: !!timerElement,
        timerElementClass: timerElement?.className || 'not found'
    });
    
    // Preload images for smooth transitions
    // Paths are relative to the docs/index.html file (images organized in subfolders)
    const imageUrls = [
        'faces/Maasai_man.png',
        'faces/Spartan_man.png',
        'faces/Japan_man.png',
        'faces/Yanomami_man.png',
        'faces/Persian_man.png'
    ];

    debugLog('🚀 Preloading images...', { imageCount: imageUrls.length });
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    
    debugLog('🚀 Starting rotation system in 6 seconds...');
    
    // Start rotation after a longer delay to allow initial rendering and show first face
    setTimeout(() => {
        debugLog('🚀 6-second delay complete - starting face rotation system');
        startFaceRotation();
    }, 6000);
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

// Face timer functionality
const timerProgress = document.querySelector('.timer-progress');
let timerInterval;
let timerStartTime;
const FACE_DURATION = 12000; // 12 seconds

function updateTimer() {
    if (!timerProgress) return;
    
    const now = Date.now();
    const elapsed = now - timerStartTime;
    const progress = (elapsed % FACE_DURATION) / FACE_DURATION;
    const degrees = progress * 360;
    
    // Log every 2 seconds for debugging
    if (Math.floor(elapsed / 2000) !== Math.floor((elapsed - 50) / 2000)) {
        debugLog('⏱️ Timer update', {
            elapsed: `${(elapsed / 1000).toFixed(1)}s`,
            progress: `${(progress * 100).toFixed(1)}%`,
            degrees: `${degrees.toFixed(1)}°`,
            nextRotationIn: `${((FACE_DURATION - (elapsed % FACE_DURATION)) / 1000).toFixed(1)}s`
        });
    }
    
    // Update the conic gradient to show progress
    timerProgress.style.background = `conic-gradient(
        var(--gold) 0deg,
        var(--gold) ${degrees}deg,
        transparent ${degrees}deg
    )`;
}

function startPerpetualTimer() {
    timerStartTime = Date.now();
    debugLog('⏱️ Starting perpetual timer', {
        startTime: new Date(timerStartTime).toISOString().slice(11, 23),
        duration: `${FACE_DURATION / 1000}s`
    });
    
    // Clear any existing timer
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update timer every 50ms for smooth animation
    timerInterval = setInterval(updateTimer, 50);
}

function resetTimer() {
    debugLog('⏱️ Resetting timer');
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    if (timerProgress) {
        timerProgress.style.background = `conic-gradient(
            var(--gold) 0deg,
            var(--gold) 0deg,
            transparent 0deg
        )`;
    }
}

// Sync timer with face rotation by resetting timer start time on each rotation
function rotateFacesWithTimer() {
    const rotationTime = Date.now();
    debugLog('🔄⏱️ Face rotation with timer sync', {
        rotationTime: new Date(rotationTime).toISOString().slice(11, 23),
        timeSinceLastReset: `${(rotationTime - timerStartTime) / 1000}s`
    });
    
    rotateFaces(); // Call existing rotation function
    timerStartTime = rotationTime; // Reset timer sync point to current time
    
    debugLog('🔄⏱️ Timer resynced', {
        newStartTime: new Date(timerStartTime).toISOString().slice(11, 23)
    });
}

function startFaceRotationWithTimer() {
    debugLog('🎬 Starting face rotation system with timer');
    
    // Clear any existing interval to prevent duplicates
    clearInterval(faceRotationInterval);
    
    // Start the perpetual timer
    startPerpetualTimer();
    
    // Start rotation synced with timer every 12 seconds
    faceRotationInterval = setInterval(rotateFacesWithTimer, FACE_DURATION);
    
    debugLog('🎬 Face rotation system started', {
        intervalDuration: `${FACE_DURATION / 1000}s`,
        nextRotationAt: new Date(Date.now() + FACE_DURATION).toISOString().slice(11, 23)
    });
}

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