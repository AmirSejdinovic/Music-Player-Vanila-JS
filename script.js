//Geting the DOM elements
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const cover = document.getElementById("cover");

//Song titles
const songs = ["hey", "summer", "ukulele"];

//Keep track of song
let songIndex = 2;

//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update song deals
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa").classList.remove("fa-play");
  playBtn.querySelector("i.fa").classList.add("fa-pause");

  audio.play();
}

//Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa").classList.add("fa-play");
  playBtn.querySelector("i.fa").classList.remove("fa-pause");

  audio.pause();
}

//Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
//Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

//Update progeres bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPrecent = (currentTime / duration) * 100;

  progress.style.width = `${progressPrecent}%`;
}
//Set progress bar
function setProgres(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

//Change song
prevBtn.addEventListener("click", prevSong);

nextBtn.addEventListener("click", nextSong);

//Time/song update
audio.addEventListener("timeupdate", updateProgress);

//Click on progeres bar
progressContainer.addEventListener("click", setProgres);

//Song ends
audio.addEventListener("ended", nextSong);
