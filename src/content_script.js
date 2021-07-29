import mispell from "mispell/dist/mispell.node";

function replaceText(text) {
    // TODO Get replacement function and amount from extension settings
    return mispell.bimbofy(text, 0.8)
}

// Replace static content
function getElements(tagNames) {
    let elements = []
    for (let tag of tagNames) {
        elements.push(...document.getElementsByTagName(tag))
    }
    return elements
}

let elements = getElements(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"])
for (let element of elements) {
    for (let node of element.childNodes) {
        if (node.nodeType === 3) {
            let element = node.parentElement
            let text = node.textContent
            let replacedText = replaceText(text)
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