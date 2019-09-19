document.addEventListener('DOMContentLoaded', function () {
    document.documentElement.insertBefore(document.querySelector('.' + $pageRootClassName + '__shadows'), document.body.nextSibling);
}, window.passiveSupported ? { passive: true } : false);
