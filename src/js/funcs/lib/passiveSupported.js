(function (win) {
    win.passiveSupported = false;

    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                win.passiveSupported = true;
            }
        });

        win.addEventListener('test', null, options);
    } catch (err) {}
})(window);
