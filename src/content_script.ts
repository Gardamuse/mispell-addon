import {AddonSettings} from "./addon_settings";
let browser = require("webextension-polyfill")

function replaceText(text: string, settings: AddonSettings) {
    return settings.transform(text)
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
let recentReplaced: string[] = []
let recentReplacedVip: string[] = []

function shouldModifyText(text: string): boolean {
    let shouldModify = true

    if (text == null || text.length < 4) {
        shouldModify = false
    } else {
        for (let s of recentReplaced.concat(recentReplacedVip)) {
            // If the text is of almost equal length AND begins or starts with the same 2 letters
            // then it is probably a text field that is being edited by the user, so it should not be modified
            if (Math.abs(s.length - text.length) <= 2 &&
                (s.substr(0, 2) == text.substr(0, 2) ||
                s.substr(s.length-2, 2) == text.substr(text.length-2, 2))) {

                recentReplacedVip.push(text)
                if (recentReplacedVip.length > 10) recentReplacedVip.shift()

                shouldModify = false
                break
            }

        }
    }

    recentReplaced.push(text)
    if (recentReplaced.length > 10) recentReplaced.shift()
    return shouldModify
}

function onPageLoad(settings: AddonSettings) {
    // Iterating over all elements take time. Just skip it if bimbofactor is very low.
    if (settings.bimbofactor < 0.01) return

    //console.log("OnPageLoad options", settings, Math.random())
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
                        if (!shouldModifyText(textNode.textContent)) {
                            continue
                        }
                        
                        let text = textNode.nodeValue
                        textNode.nodeValue = replaceText(text, settings)
                    }
                });
            }
        })
    }).observe(document, {childList: true, subtree: true})
}

async function startAddon() {
    let settingState: any = await browser.storage.local.get('settings')
    let settings = new AddonSettings(settingState.settings)
    onPageLoad(settings)
}

startAddon()
