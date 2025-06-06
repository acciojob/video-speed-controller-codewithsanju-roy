const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('.skip');
const sliders = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// Toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play/pause button
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle range updates (volume/speed)
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub video by clicking on progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
sliders.forEach(slider => slider.addEventListener('input', handleRangeUpdate));
progress.addEventListener('click', scrub);
