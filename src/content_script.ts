// @ts-ignore
import mispell from "mispell/dist/mispell.node";
import {AddonSettings} from "./addon_settings";

function replaceText(text: string, settings: AddonSettings) {
    return mispell.bimbofy(text, settings.bimbofactor || 0)
}

// Replace static content
function getElements(tagNames: string[]) {
    let elements = []
    for (let tag of tagNames) {
        // @ts-ignore
        elements.push(...document.getElementsByTagName(tag))
    }
    return elements
}

function onPageLoad(settings: AddonSettings) {
    console.log("OnPageLoad options", settings, Math.random())
    let elements = getElements(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"])
    for (let element of elements) {
        for (let node of element.childNodes) {
            if (node.nodeType === 3) {
                let element = node.parentElement
                let text = node.textContent
                let replacedText = replaceText(text, settings)
                if (replacedText !== text) {
                    element.replaceChild(document.createTextNode(replacedText), node)
                }
            }
        }
    }

// Listen for and replace dynamically loaded content
    new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            if(mutation.type === 'childList'){
                mutation.addedNodes.forEach(addedNode => {
                    let treeWalker = document.createTreeWalker(addedNode, NodeFilter.SHOW_TEXT)
                    let textNode
                    while (textNode = treeWalker.nextNode()) {
                        let text = textNode.nodeValue
                        textNode.nodeValue = replaceText(text, settings)
                    }
                });
            }
        })
    }).observe(document, {childList: true, subtree: true})
}

// @ts-ignore
browser.storage.local.get('settings', (settingState: any) => {
    let settings = new AddonSettings(settingState.settings)
    onPageLoad(settings)
});