var lockPageScreen = (function (win) {
    var isEnabled  = false;
    var scrollTop  = null;
    var lastBodyHeight  = null;
    var scrollTouch  = 0;
    // var className = 'page_state_unscrolled';

    function listenResize() {
        lastBodyHeight = win.document.body.clientHeight;
        win.document.body.style.height = win.innerHeight + 'px';

        if (scrollTouch > 0) {
            scrollTop += lastBodyHeight - win.innerHeight;
            win.document.body.scrollTop = scrollTop;
            // win.dispatchEvent(new Event('scroll'));
        }
    };

    function listenScroll(event) {
        event.stopImmediatePropagation();
        if (scrollTouch == 0) {
            scrollTouch = getScrollingElement().scrollTop;
        }
    };

    var _ = {
        isEnabled: {
            configurable: false,
            enumerable: false,
            get: function () { return isEnabled },
            set: undefined,
        },

        scrollTop: {
            configurable: false,
            enumerable: false,
            get: function () { return scrollTop },
            set: undefined,
        },

        on: {
            value: function () {
                if (!isEnabled) {
                    scrollTop = win.pageYOffset;
                    scrollTouch = 0;

                    win.document.body.style.overflow = 'hidden';
                    win.document.body.style.height = win.innerHeight + 'px';
                    win.document.body.scrollTop = scrollTop;

                    win.addEventListener('resize', listenResize, false);
                    win.addEventListener('scroll', listenScroll, false);
                }
                isEnabled = true;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },

        off: {
            value: function () {
                if (isEnabled) {
                    win.document.body.style.height = 'auto';
                    win.document.body.style.overflow = 'visible';
                    getScrollingElement().scrollTop = scrollTop;

                    win.removeEventListener('resize', listenResize);
                    win.removeEventListener('scroll', listenScroll);

                    scrollTop = null;
                    scrollTouch = 0;
                }
                isEnabled = false;
            },
            configurable: false,
            enumerable: false,
            writable: false,
        },
    };

    return Object.defineProperties({}, _);
})(window);
