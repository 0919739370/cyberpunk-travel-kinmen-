const music = document.getElementById('bgMusic');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');
const speedCtrl = document.getElementById('speedCtrl');

// 準備 5 首歌的路徑
const playlist = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3",
    "music/song4.mp3",
    "music/song5.mp3"
];

let currentTrack = 0;

// 初始化播放器
function loadTrack(index) {
    music.src = playlist[index];
    trackName.innerText = `TRACK: 0${index + 1}`;
}

loadTrack(currentTrack);

function toggleMusic() {
    music.paused ? music.play() : music.pause();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    music.play();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    music.play();
}

function changeSpeed() {
    music.playbackRate = speedCtrl.value;
}

// 更新進度條
music.ontimeupdate = () => {
    const progress = (music.currentTime / music.duration) * 100;
    progressBar.value = progress || 0;
};

// 拖動進度條
progressBar.oninput = () => {
    const time = (progressBar.value / 100) * music.duration;
    music.currentTime = time;
};

// 播完自動下一首
music.onended = () => { nextTrack(); };