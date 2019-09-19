function listenWindowEvents() {
    for (var i = 0, c = window.windowEvents.length; i < c; i++) {
        if (window.windowEvents[i]['on' + window.event.type.charAt(0).toUpperCase() + window.event.type.substr(1)]) {
            if (window.passiveSupported && !window.windowEvents[i].scrollTimer) {
                window.windowEvents[i].method.call(window);
            } else {
                if (this.stateScroll) {
                    clearTimeout(this.stateScroll);
                }

                this.stateScroll = setTimeout(function () {
                    for (var i = 0, c = window.windowEvents.length; i < c; i++) {
                        window.windowEvents[i].method.call(window);
                    }
                }, 160);
            }
        }
    }
};
