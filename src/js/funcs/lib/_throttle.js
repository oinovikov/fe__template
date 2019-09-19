function throttle(func, time) {
    return function (args) {
        var previousCall = this.lastCall;
        this.lastCall = Date.now();

        if (previousCall === undefined // function is being called for the first time
            || (this.lastCall - previousCall) > time) { // throttle time has elapsed
            func(args);
        }
    }
}
