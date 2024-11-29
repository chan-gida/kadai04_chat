// メニュー展開時に背景を固定
const backgroundFix = (bool) => {
    const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ("scrollingElement" in document) return document.scrollingElement;
        return document.documentElement;
    };

    const scrollY = bool
        ? scrollingElement().scrollTop
        : parseInt($('body').css('top') || "0");

    const fixedStyles = {
        height: "100vh",
        position: "fixed",
        top: `${scrollY * -1}px`,
        left: "0",
        width: "100vw"
    };

    if (bool) {
        $('body').css(fixedStyles);
    } else {
        $('body').css({ height: '', position: '', top: '', left: '', width: '' });
        window.scrollTo(0, scrollY * -1);
    }
};

// 変数定義
const CLASS = "-active";
let flg = false;
let accordionFlg = false;

const $hamburger = $("#js-hamburger");
const $focusTrap = $("#js-focus-trap");
const $menu = $(".js-nav-area");
const $accordionTrigger = $(".js-sp-accordion-trigger");

// メニュー開閉制御
$hamburger.on("click", function (e) {
    $(this).toggleClass(CLASS);
    $menu.toggleClass(CLASS);
    if (flg) {
        backgroundFix(false);
        $(this).attr("aria-expanded", "false").focus();
        flg = false;
    } else {
        backgroundFix(true);
        $(this).attr("aria-expanded", "true");
        flg = true;
    }
});

// escキー押下でメニューを閉じる
$(window).on("keydown", function (e) {
    if (e.key === "Escape") {
        $hamburger.removeClass(CLASS);
        $menu.removeClass(CLASS);
        backgroundFix(false);
        $hamburger.attr("aria-expanded", "false").focus();
        flg = false;
    }
});

// メニュー内アコーディオン制御
$accordionTrigger.on("click", function (e) {
    $(this).toggleClass(CLASS);
    $(this).next().toggleClass(CLASS);
    if ($(this).attr("aria-expanded") === "true") {
        $(this).attr("aria-expanded", "false");
        accordionFlg = false;
    } else {
        $(this).attr("aria-expanded", "true");
        accordionFlg = true;
    }
});

// フォーカストラップ制御
$focusTrap.on("focus", function () {
    $hamburger.focus();
});