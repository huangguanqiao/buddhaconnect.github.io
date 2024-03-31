//Pray Widget
function openPopup(title, content) {
    document.getElementById(
        "popupContent"
    ).innerHTML = `<strong>${title}</strong><br><br>${content}`;
    document.getElementById("overlay").style.display = "flex";
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
}

function redirectToLink(link) {
    window.location.href = link;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // 使用平滑滚动效果
    });
}

//Reading Widget
function increaseFontSize() {
    var content = document.querySelector('[id^="post-body-"]');
    if (content) {
        var currentSize = parseInt(window.getComputedStyle(content, null).getPropertyValue('font-size'));
        content.style.fontSize = (currentSize + 2) + 'px';
    }
}

function decreaseFontSize() {
    var content = document.querySelector('[id^="post-body-"]');
    if (content) {
        var currentSize = parseInt(window.getComputedStyle(content, null).getPropertyValue('font-size'));
        content.style.fontSize = (currentSize - 2) + 'px';
    }
}

function resetFontSize() {
    var content = document.querySelector('[id^="post-body-"]');
    if (content) {
        content.style.fontSize = ''; // Reset to the default size
    }
}

function printContent() {
    var content = document.querySelector('[id^="post-body-"]');
    if (content) {
        var printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(content.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}

function showBookmarkInstructions() {
    alert('请使用浏览器的添加书签功能（通常是Ctrl+D或Cmd+D）来手动添加页面到书签。');
}

function addToFavorites() {
    var pageTitle = document.title;
    var pageURL = window.location.href;

    if (window.chrome && window.chrome.bookmarks) { // Chrome
        window.chrome.bookmarks.create({ 'title': pageTitle, 'url': pageURL });
    } else if (window.sidebar && window.sidebar.addPanel) { // Firefox
        window.sidebar.addPanel(pageTitle, pageURL, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE
        window.external.AddFavorite(pageURL, pageTitle);
    } else if (window.opera && window.print) { // Opera
        var bookmarkLink = document.createElement('a');
        bookmarkLink.href = pageURL;
        bookmarkLink.rel = 'sidebar';
        bookmarkLink.title = pageTitle;
        bookmarkLink.appendChild(document.createTextNode(pageTitle + ' (Ctrl+T to add)'));
        document.body.appendChild(bookmarkLink);
    } else if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) { // Mobile devices
        alert('请手动添加到浏览器书签或主屏幕。');
    } else { // Other browsers - provide instructions
        alert('请手动添加到浏览器书签或收藏夹。');
    }
}

function readContent() {
    var content = document.querySelector('[id^="post-body-"]');

    if ('speechSynthesis' in window) {
        var synthesis = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(content.innerText);

        // 设置语言为中文
        utterance.lang = 'zh-CN';

        synthesis.speak(utterance);
    } else {
        alert('抱歉，您的浏览器不支持语音合成。');
    }
}

function readContent2() {
    var content = document.querySelector('[id^="post-body-"]').innerText;

    if ('speechSynthesis' in window) {
        var synthesis = window.speechSynthesis;
        var voices = synthesis.getVoices();
        var utterance = new SpeechSynthesisUtterance(content);

        // 尝试根据浏览器和操作系统选择默认语音
        if (navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Android")) {
            // 使用 Chrome 在 Android 上的默认语音引擎
            utterance.voice = voices.find(voice => voice.name === 'Google 中文（中国）');
        } else if (navigator.userAgent.includes("Safari") && navigator.userAgent.includes("Mac")) {
            // 使用 Safari 在 Mac 上的默认语音引擎
            utterance.voice = voices.find(voice => voice.name === 'com.apple.speech.synthesis.voice.ting-ting');
        }

        synthesis.speak(utterance);
    } else {
        alert('抱歉，您的浏览器不支持语音合成。');
    }
}

function downloadPdf() {
    // 创建PDF实例
    var pdf = new jsPDF();

    // 获取要打印的内容
    var content = document.querySelector('[id^="post-body-"]');

    // 设置大图
    var imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/...'; // 替换为您的大图Base64数据
    pdf.addImage(imgData, 'JPEG', 10, 10, 180, 120); // 调整位置和大小

    // 添加页面内容
    pdf.fromHTML(content.innerHTML, 15, 130);

    // 添加页脚和页码
    var totalPagesExp = '{total_pages_count_string}';
    pdf.setFontSize(10);
    pdf.text('页脚内容', 10, pdf.internal.pageSize.height - 10);
    pdf.text('页码 ' + pdf.internal.getCurrentPageInfo().pageNumber + ' / ' + totalPagesExp, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);

    // 保存PDF文件
    var fileName = document.title + ".pdf";
    pdf.save(fileName);
}

//Count Widget
let counter = 0;

function updateCounterDisplay() {
    document.getElementById('counter').innerText = '计数器: ' + counter;
}

function incrementCounter() {
    counter++;
    updateCounterDisplay();
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
}

//navigator
function navigation() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
