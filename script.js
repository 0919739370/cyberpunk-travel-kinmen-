// 這裡定義每天的檔案清單 (因為 GitHub 沒後端，需要手動列出)
const filesData = {
    "28": ["IMG_20260128_01.jpg", "VID_20260128_02.mp4", "IMG_20260128_03.jpg"],
    "29": ["IMG_20260129_01.jpg"],
    "30": ["IMG_20260130_01.jpg"]
};

function renderGallery(day) {
    const grid = document.getElementById('gallery-grid');
    const files = filesData[day];

    files.forEach(fileName => {
        const item = document.createElement('div');
        item.className = 'glass-card media-item';
        
        // 取得不含副檔名的純檔名
        const displayName = fileName.split('.').shift();
        const isVideo = fileName.endsWith('.mp4');

        let mediaHtml = isVideo 
            ? `<video muted><source src="image/${day}/${fileName}" type="video/mp4"></video>`
            : `<img src="image/${day}/${fileName}">`;

        item.innerHTML = `
            ${mediaHtml}
            <div class="file-name">${displayName}</div>
        `;
        
        grid.appendChild(item);
    });
}