function getScrollingElement() {
    if ('scrollingElement' in document) {
        return document.scrollingElement;
    } else if (document.body.scrollHeight != document.body.clientHeight && window.getComputedStyle(document.body, null).getPropertyValue('overflow') != 'visible') {
        return document.body;
    } else {
        return document.documentElement;
    }
}
