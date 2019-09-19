(function (win) {
    var options = win.passiveSupported ? { passive: true } : false;
    win.addEventListener('load', listenWindowEvents, options);
    win.addEventListener('scroll', listenWindowEvents, options);
    win.addEventListener('resize', listenWindowEvents, options);
})(window);
