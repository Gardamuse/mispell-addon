// Put all the javascript code here, that you want to execute in background.
console.log("Background script enabled")

function handleClick() {
    browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);