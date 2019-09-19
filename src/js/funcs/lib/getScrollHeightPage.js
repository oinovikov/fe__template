function getScrollHeightPage() {
    return Math.max(
        document.scrollingElement.scrollHeight, document.body.scrollHeight, document.documentElement.scrollHeight,
        document.scrollingElement.offsetHeight, document.body.offsetHeight, document.documentElement.offsetHeight,
        document.scrollingElement.clientHeight, document.body.clientHeight, document.documentElement.clientHeight
    );
}
