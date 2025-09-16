document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.custom-audio-player');

    players.forEach(player => {
        initializeAudioPlayer(player);
    });
});

function initializeAudioPlayer(player) {
    const audio = player.querySelector('.episode-audio');
    const playPauseBtn = player.querySelector('.play-pause-btn');
    const playIcon = playPauseBtn.querySelector('.play-icon');
    const pauseIcon = playPauseBtn.querySelector('.pause-icon');
    const progressBar = player.querySelector('.progress-bar');
    const remainingTimeSpan = player.querySelector('.remaining-time');
    const totalTimeSpan = player.querySelector('.total-time');
    const volumeSlider = player.querySelector('.volume-slider');
    const muteBtn = player.querySelector('.mute-btn');
    const volumeHighIcon = muteBtn.querySelector('.volume-high-icon');
    const volumeMuteIcon = muteBtn.querySelector('.volume-mute-icon');

    const audioSrc = player.dataset.src;
    if (audioSrc) {
        audio.src = audioSrc;
    }

    let isDraggingProgress = false;
    let lastVolume = 1;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    audio.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
        remainingTimeSpan.textContent = formatTime(audio.duration);
        volumeSlider.value = audio.volume * 100;
    });

    playPauseBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });

    audio.addEventListener('pause', () => {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
    });

    audio.addEventListener('timeupdate', () => {
        if (!isDraggingProgress) {
            progressBar.value = audio.currentTime;
        }
        const remaining = audio.duration - audio.currentTime;
        remainingTimeSpan.textContent = formatTime(remaining > 0 ? remaining : 0);
    });

    progressBar.addEventListener('mousedown', () => {
        isDraggingProgress = true;
    });

    progressBar.addEventListener('mouseup', () => {
        isDraggingProgress = false;
        audio.currentTime = progressBar.value;
    });

    progressBar.addEventListener('input', () => {
        const remaining = audio.duration - progressBar.value;
        remainingTimeSpan.textContent = formatTime(remaining > 0 ? remaining : 0);
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
        audio.muted = audio.volume === 0;
    });

    audio.addEventListener('volumechange', () => {
        if (audio.muted || audio.volume === 0) {
            volumeHighIcon.style.display = 'none';
            volumeMuteIcon.style.display = 'block';
            volumeSlider.value = 0;
        } else {
            volumeMuteIcon.style.display = 'none';
            volumeHighIcon.style.display = 'block';
            volumeSlider.value = audio.volume * 100;
            lastVolume = audio.volume;
        }
    });

    muteBtn.addEventListener('click', () => {
        if (audio.muted) {
            audio.muted = false;
            audio.volume = lastVolume > 0 ? lastVolume : 0.5;
        } else {
            lastVolume = audio.volume;
            audio.muted = true;
        }
    });

    audio.addEventListener('ended', () => {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        audio.currentTime = 0;
        progressBar.value = 0;
        remainingTimeSpan.textContent = formatTime(audio.duration);
    });

    // Set initial icon states
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    volumeHighIcon.style.display = 'block';
    volumeMuteIcon.style.display = 'none';
}