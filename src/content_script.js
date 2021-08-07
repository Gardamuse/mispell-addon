import mispell from "mispell/dist/mispell.node";

function replaceText(text, options) {
    return mispell.bimbofy(text, options.bimbofactor || 0)
}

// Replace static content
function getElements(tagNames) {
    let elements = []
    for (let tag of tagNames) {
        elements.push(...document.getElementsByTagName(tag))
    }
    return elements
}

function onPageLoad(options) {
    console.log("OnPageLoad options", options, Math.random())
    let elements = getElements(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"])
    for (let element of elements) {
        for (let node of element.childNodes) {
            if (node.nodeType === 3) {
                let element = node.parentElement
                let text = node.textContent
                let replacedText = replaceText(text, options)
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
                        textNode.nodeValue = replaceText(text)
                    }
                });
            }
        })
    }).observe(document, {childList: true, subtree: true})
}

var optionsItem = browser.storage.local.get('options');
optionsItem.then((options) => {
    console.log("Options result:", options)
    if (options == {}) {
        console.log("There were no options")
        options = {
            bimbofactor: 0.5
        }
        //browser.storage.local.set(options);
    } else {
    }
    onPageLoad(options)
});