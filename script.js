const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');
const timeDisplay = document.getElementById('timeDisplay'); // 時間顯示元件
const speedCtrl = document.getElementById('speedCtrl');

const playlist = ["music/song1.mp3", "music/song2.mp3", "music/song3.mp3", "music/song4.mp3", "music/song5.mp3"];
let currentTrack = 0;

function loadTrack(index) {
    music.src = playlist[index];
    trackName.innerText = `NOW PLAYING: TRACK_0${index + 1}`;
    music.load();
}
loadTrack(currentTrack);

// 格式化時間 (秒 -> 00:00)
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// 倒退或快進功能
function skip(seconds) {
    music.currentTime += seconds;
}

function toggleMusic() {
    if (music.paused) { music.play(); playBtn.innerText = "⏸"; } 
    else { music.pause(); playBtn.innerText = "▶"; }
}

function nextTrack() { currentTrack = (currentTrack + 1) % playlist.length; loadTrack(currentTrack); music.play(); playBtn.innerText = "⏸"; }
function prevTrack() { currentTrack = (currentTrack - 1 + playlist.length) % playlist.length; loadTrack(currentTrack); music.play(); playBtn.innerText = "⏸"; }
function changeSpeed() { music.playbackRate = speedCtrl.value; }

// 更新進度條與時間碼
music.ontimeupdate = () => {
    if (music.duration) {
        const progress = (music.currentTime / music.duration) * 100;
        progressBar.value = progress;
        // 更新 00:00 / 00:00 顯示
        timeDisplay.innerText = `${formatTime(music.currentTime)} / ${formatTime(music.duration)}`;
    }
};

progressBar.oninput = () => {
    music.currentTime = (progressBar.value / 100) * music.duration;
};

music.onended = () => { nextTrack(); };

// --- 相簿自動產生邏輯 (維持不變) ---
function renderGallery(day) {
    const grid = document.getElementById('gallery-grid');
    if(!grid) return;
    const data = {
        "28": ["IMG_20260128_084422948_HDR.jpg", "VID_20260128_141227005.mp4"],
        "29": ["IMG_20260129_092933938_HDR.jpg", "VID_20260129_090657319.mp4"],
        "30": ["IMG_20260130_134712637_HDR.jpg", "VID_20260130_140049688.mp4"]
    };
    const files = data[day];
    if(!files) return;
    files.forEach(fileName => {
        const item = document.createElement('div');
        item.className = 'glass-card media-item';
        const displayName = fileName.split('.').slice(0, -1).join('.');
        const isVideo = fileName.toLowerCase().endsWith('.mp4');
        let mediaHtml = isVideo 
            ? `<video muted loop onmouseover="this.play()" onmouseout="this.pause()"><source src="image/${day}/${fileName}" type="video/mp4"></video>`
            : `<img src="image/${day}/${fileName}">`;
        item.innerHTML = `${mediaHtml}<div class="file-name">${displayName}</div>`;
        grid.appendChild(item);
    });
}