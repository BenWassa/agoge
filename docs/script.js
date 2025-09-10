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
    debugLog('🎯 startFaceRotation() called');
    
    // Add stack trace to see what's calling this function
    console.trace('🔍 Stack trace for startFaceRotation call');
    
    startFaceRotationWithTimer();
}

function pauseFaceRotation() {
    debugLog('🛑 Stopping face rotation system');
    
    // Add stack trace to see what's calling this function
    console.trace('🔍 Stack trace for pauseFaceRotation call');
    
    clearInterval(faceRotationInterval);
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    systemRunning = false;
}

// Handle page visibility changes to maintain rotation when switching tabs
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is now hidden (user switched tabs or minimized)
        debugLog('👁️ Page hidden - pausing rotation');
        if (systemRunning) {
            pauseFaceRotation();
        }
    } else {
        // Page is now visible again
        debugLog('👁️ Page visible - resuming rotation');
        if (timerStarted && !systemRunning) {
            // Only restart if the system was previously started
            setTimeout(() => {
                startFaceRotation();
            }, 500); // Small delay to ensure page is fully active
        }
    }
});

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

// Mouse hover behavior disabled to prevent interruptions during scrolling
// The face rotation will continue uninterrupted for a better user experience
/*
// Pause rotation when user hovers over hero section (only after system has started)
// Add debouncing to prevent rapid start/stop cycles
let hoverTimeout;
const HOVER_DELAY = 1000; // 1 second delay before pausing/resuming

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        debugLog('🖱️ Mouse entered hero section', { systemRunning });
        
        // Clear any pending resume timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        // Only pause if system is running and after a delay
        if (systemRunning) {
            hoverTimeout = setTimeout(() => {
                if (systemRunning) {
                    debugLog('🖱️ Pausing rotation after hover delay');
                    pauseFaceRotation();
                }
            }, HOVER_DELAY);
        }
    });
    
    heroSection.addEventListener('mouseleave', () => {
        debugLog('🖱️ Mouse left hero section', { systemRunning, timerStarted });
        
        // Clear any pending pause timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        // Only restart if system was initialized and is not currently running
        if (!systemRunning && timerStarted) {
            hoverTimeout = setTimeout(() => {
                if (!systemRunning && timerStarted) {
                    debugLog('🖱️ Resuming rotation after leave delay');
                    startFaceRotation();
                }
            }, 500); // Shorter delay for resuming
        }
    });
}
*/

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
let systemRunning = false; // Prevent multiple instances
let timerStarted = false; // Track if timer has been started
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
    // Prevent multiple instances
    if (systemRunning) {
        debugLog('🚫 Timer system already running - ignoring duplicate start request');
        return;
    }
    
    debugLog('🎬 Starting face rotation system and timer immediately');
    systemRunning = true;
    
    // Clear any existing interval to prevent duplicates
    clearInterval(faceRotationInterval);
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Start timer immediately when rotation system begins
    startPerpetualTimer();
    timerStarted = true;
    
    // Start rotation synced with timer every 12 seconds
    faceRotationInterval = setInterval(rotateFacesWithTimer, FACE_DURATION);
    
    debugLog('🎬 Face rotation system started', {
        intervalDuration: `${FACE_DURATION / 1000}s`,
        nextRotationAt: new Date(Date.now() + FACE_DURATION).toISOString().slice(11, 23),
        note: 'Timer started immediately with system'
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

// Episode accordion functionality
document.querySelectorAll('.episode-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.parentElement;
        const content = card.querySelector('.episode-content');
        const expanded = header.getAttribute('aria-expanded') === 'true';

        // Close other open episodes for accordion behavior
        document.querySelectorAll('.episode-card').forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
                const otherHeader = otherCard.querySelector('.episode-header');
                const otherContent = otherCard.querySelector('.episode-content');
                if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                if (otherContent) otherContent.style.maxHeight = null;
            }
        });

        if (expanded) {
            header.setAttribute('aria-expanded', 'false');
            card.classList.remove('active');
            content.style.maxHeight = null;
        } else {
            header.setAttribute('aria-expanded', 'true');
            card.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});
