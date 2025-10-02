const songs = [
    {
        title: "Lost In The City Light",
        author: 'Cosmo Sheldrake',
        src: "./resources/lost-in-city-lights-145038.mp3",
        img: "./resources/cover-1.jpg",
    },
    {
        title: "Forest Lullaby",
        author: "Lesfm",
        src: "./resources/forest-lullaby-110624.mp3",
        img: "./resources/cover-2.jpg"
    }
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

const title = document.getElementById('title');
const author = document.getElementById('author');
const songCover = document.getElementById('song-cover');

const progressContainer = document.getElementById("progress-bar");
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.progress-container span:first-child');
const durationEl = document.querySelector('.progress-container span:last-child');

document.getElementById('play').addEventListener('click', playPause);
document.getElementById('next').addEventListener('click', nextSong);
document.getElementById('prev').addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

function playPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('play').src = './resources/pause-button-48.png';
    } else {
        audio.pause();
        document.getElementById('play').src = './resources/play-button-48.png';
    } 
}

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) currentSongIndex = 0;
  loadSong(currentSongIndex);
  audio.play();
  document.getElementById('play').src = './resources/pause-button-48.png';
}

function prevSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  loadSong(currentSongIndex);
  audio.play();
  document.getElementById('play').src = './resources/pause-button-48.png';
}

function loadSong(index) {
  title.textContent = songs[index].title;
  author.textContent = songs[index].author;
  songCover.src = songs[index].img;
  audio.src = songs[index].src;
}

function updateProgressBar() {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = progressPercent + '%';
    progress.style.background = '#10b5f7ff';

    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

progressContainer.addEventListener("click", function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Initial load
loadSong(currentSongIndex);
