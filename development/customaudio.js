const audio = document.getElementById('episodeAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = playPauseBtn.querySelector('.play-icon');
const pauseIcon = playPauseBtn.querySelector('.pause-icon');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const durationSpan = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
const volumeHighIcon = muteBtn.querySelector('.volume-high-icon');
const volumeMuteIcon = muteBtn.querySelector('.volume-mute-icon');

let isDraggingProgress = false;
let lastVolume = 1; // Store last volume for mute/unmute

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Initialize player when audio metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
    volumeSlider.value = audio.volume * 100; // Set initial volume slider position
});

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove('active');
        pauseIcon.classList.add('active');
    } else {
        audio.pause();
        pauseIcon.classList.remove('active');
        playIcon.classList.add('active');
    }
});

// Update progress bar and current time
audio.addEventListener('timeupdate', () => {
    if (!isDraggingProgress) {
        progressBar.value = audio.currentTime;
    }
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// Handle manual seeking on progress bar
progressBar.addEventListener('mousedown', () => {
    isDraggingProgress = true;
});
progressBar.addEventListener('mouseup', () => {
    isDraggingProgress = false;
    audio.currentTime = progressBar.value;
});
// For direct input (e.g., keyboard or rapid click)
progressBar.addEventListener('input', () => {
     currentTimeSpan.textContent = formatTime(progressBar.value); // Update time while dragging
});


// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    if (audio.volume === 0) {
        audio.muted = true;
        volumeHighIcon.classList.remove('active');
        volumeMuteIcon.classList.add('active');
    } else {
        audio.muted = false;
        volumeMuteIcon.classList.remove('active');
        volumeHighIcon.classList.add('active');
        lastVolume = audio.volume; // Update last volume if not muted
    }
});

// Mute/Unmute functionality
muteBtn.addEventListener('click', () => {
    if (audio.muted) {
        audio.muted = false;
        audio.volume = lastVolume > 0 ? lastVolume : 0.5; // Restore previous or default
        volumeSlider.value = audio.volume * 100;
        volumeMuteIcon.classList.remove('active');
        volumeHighIcon.classList.add('active');
    } else {
        audio.muted = true;
        lastVolume = audio.volume; // Save current volume before muting
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeHighIcon.classList.remove('active');
        volumeMuteIcon.classList.add('active');
    }
});

// Update UI if audio ends
audio.addEventListener('ended', () => {
    pauseIcon.classList.remove('active');
    playIcon.classList.add('active');
    audio.currentTime = 0; // Reset to start
    progressBar.value = 0;
    currentTimeSpan.textContent = formatTime(0);
});

// Handle initial load state: if no duration, means audio not loaded yet.
// Also ensure default volume slider matches audio's default (which is usually 1)
audio.addEventListener('canplaythrough', () => {
    if (isNaN(audio.duration)) {
        // Not ready yet, wait for loadedmetadata
    } else {
        durationSpan.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
        volumeSlider.value = audio.volume * 100;
    }
});