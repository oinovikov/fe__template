function scrollWindowTo(top) {
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    } else if ('scrollTo' in window) {
        window.scrollTo(top);
    } else {
        getScrollingElement().scrollTop = top;
    }
};
