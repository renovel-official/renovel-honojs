const sidebar = document.querySelector('#sidebar');


/**
 * @returns { 'pc' | 'phone' | 'tablet' } 
 */
function getDeviceTypeByScreen() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // iPad（iPadOS 13以降ではMacintoshと判定される場合もある）
    const isiPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isiPad) {
        return "tablet";
    }

    if (width <= 767) {
        return "phone";
    } else if (width <= 1024 && aspectRatio < 1.6) {
        return "tablet";
    } else {
        return "pc";
    }
}


addEventListener('DOMContentLoaded', () => {
    const type = getDeviceTypeByScreen();

    switch (type) {
        case 'pc':
            sidebar.classList.add('w-1/5');
            break;
        case 'phone':
            sidebar.classList.add('hidden');
            break;
        case 'tablet':
            sidebar.classList.add('w-1/4');
            break;
    }
});