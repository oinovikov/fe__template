(function (win) {
    win.root = win.document.querySelector('.' + win.$pageRootClassName);
    var statesClassNames = {
        loading: win.$pageRootClassName + '_state_loading',
        ready: win.$pageRootClassName + '_state_ready',
        loaded: win.$pageRootClassName + '_state_loaded',
        unloading: win.$pageRootClassName + '_state_unloading',
    };

    win.root.classList.add(statesClassNames.loading);

    win.document.addEventListener('DOMContentLoaded', function () {
        win.root.classList.remove(statesClassNames.loading);
        win.root.classList.add(statesClassNames.ready);
    }, false);

    win.addEventListener('load', function () {
        win.root.classList.remove(statesClassNames.ready);
        win.root.classList.add(statesClassNames.loaded);
    }, false);

    win.addEventListener('beforeunload', function () {
        win.root.classList.remove(statesClassNames.loaded);
        win.root.classList.add(statesClassNames.unloading);
    }, false);
})(window);
