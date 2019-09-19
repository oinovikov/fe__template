function debounce(func, time) {
    return function (args) {
        var previousCall = this.lastCall;
        this.lastCall = Date.now();

        if (previousCall && ((this.lastCall - previousCall) <= time)) {
            clearTimeout(this.lastCallTimer);
        }

        this.lastCallTimer = setTimeout(function () { func(args) }, time);
    }
}
