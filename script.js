// --- 相簿自動產生邏輯 ---
function renderGallery(day) {
    const grid = document.getElementById('gallery-grid');
    if(!grid) return;

    // 因為 GitHub Pages 無法自動讀取資料夾，白鳥你需要把檔名清單填在這裡
    // 檔名範例：直接從你的檔案總管複製過來即可
    const data = {
        "28": ["IMG_20260128_084422948_HDR.jpg", "VID_20260128_141227005.mp4"],
        "29": ["IMG_20260129_092933938_HDR.jpg", "VID_20260129_090657319.mp4"],
        "30": ["IMG_20260130_134712637_HDR.jpg", "VID_20260130_140049688.mp4"]
    };

    const files = data[day];

    files.forEach(fileName => {
        const item = document.createElement('div');
        item.className = 'glass-card media-item';
        
        // 去除副檔名 (顯示副檔名前面的文字)
        const displayName = fileName.split('.').slice(0, -1).join('.');
        const isVideo = fileName.toLowerCase().endsWith('.mp4');

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