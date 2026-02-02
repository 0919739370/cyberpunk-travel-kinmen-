// --- 背景音樂控制中心 ---
const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');
const speedCtrl = document.getElementById('speedCtrl');

// 5 首歌的輪播清單 (請確保 music 資料夾內有這 5 個檔案)
const playlist = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3",
    "music/song4.mp3",
    "music/song5.mp3"
];

let currentTrack = 0;

// 初始化載入音樂
function loadTrack(index) {
    music.src = playlist[index];
    trackName.innerText = `TRACK: 0${index + 1}`;
    music.load();
}

// 執行初始化載入
loadTrack(currentTrack);

// 播放 / 暫停切換
function toggleMusic() {
    if (music.paused) {
        music.play();
        if(playBtn) playBtn.innerText = "⏸";
    } else {
        music.pause();
        if(playBtn) playBtn.innerText = "▶";
    }
}

// 下一首
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    music.play();
    if(playBtn) playBtn.innerText = "⏸";
}

// 上一首
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    music.play();
    if(playBtn) playBtn.innerText = "⏸";
}

// 加速功能 (SPD)
function changeSpeed() {
    music.playbackRate = speedCtrl.value;
}

// 進度條同步：音樂播放時更新進度條
music.ontimeupdate = () => {
    if (music.duration) {
        const progress = (music.currentTime / music.duration) * 100;
        progressBar.value = progress;
    }
};

// 進度條手動調整：拖動進度條改變音樂位置
if(progressBar) {
    progressBar.oninput = () => {
        const time = (progressBar.value / 100) * music.duration;
        music.currentTime = time;
    };
}

// 自動輪播：當歌曲播完時自動切換下一首
music.onended = () => {
    nextTrack();
};

// --- 相簿自動產生邏輯 (Day 01~03 使用) ---
function renderGallery(day) {
    const grid = document.getElementById('gallery-grid');
    if(!grid) return;

    // 檔案清單：白鳥你之後新增照片時，直接把檔名補在對應的括號 [] 內即可
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
        
        // 取得純檔名：將檔名依 '.' 切開，移除最後一個部分(副檔名)
        const displayName = fileName.split('.').slice(0, -1).join('.');
        const isVideo = fileName.toLowerCase().endsWith('.mp4');

        // 生成媒體 HTML：影片支援滑鼠移入自動播放
        let mediaHtml = isVideo 
            ? `<video muted loop onmouseover="this.play()" onmouseout="this.pause()"><source src="image/${day}/${fileName}" type="video/mp4"></video>`
            : `<img src="image/${day}/${fileName}">`;

        item.innerHTML = `
            ${mediaHtml}
            <div class="file-name">${displayName}</div>
        `;
        
        grid.appendChild(item);
    });
}