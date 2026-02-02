const music = document.getElementById('bgMusic');
const statusText = document.getElementById('status');

function toggleMusic() {
    if (music.paused) {
        music.play();
        statusText.innerText = "MUSIC: ON";
        statusText.style.color = "#ff00ff"; // 變色提示
    } else {
        music.pause();
        statusText.innerText = "MUSIC: OFF";
        statusText.style.color = "#00f3ff";
    }
}