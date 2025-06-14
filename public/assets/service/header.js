document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("mobile-menu-btn");
    const overlay = document.getElementById("mobile-overlay");
    const closeBtn = document.getElementById("close-mobile-menu");

    const openMenu = () => overlay.classList.remove("hidden");
    const closeMenu = () => overlay.classList.add("hidden");

    if (menuBtn && overlay && closeBtn) {
        menuBtn.addEventListener("click", openMenu);
        closeBtn.addEventListener("click", closeMenu);

        // 背景クリックで閉じる
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                closeMenu();
            }
        });

        // メニューリンククリックで閉じる
        overlay.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => closeMenu());
        });
    }
});