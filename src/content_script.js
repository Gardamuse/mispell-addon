import mispell from "mispell/dist/mispell.node";

console.log("Content...4")
//console.log("Print", mispell.bimbofy("Hello there my friends", 1.0))

function getElements(tagNames) {
    let elements = []
    for (let tag of tagNames) {
        elements.push(...document.getElementsByTagName(tag))
    }
    return elements
}

let elements = getElements(["p", "h1", "h2", "h3", "h4", "h5", "h6", "span"])

for (let element of elements) {
    for (let node of element.childNodes) {
        if (node.nodeType === 3) {
            let text = node.textContent

            //console.log(`Text: "${text}"`)
            let replacedText = mispell.bimbofy(text, 0.8)
            //let replacedText = text
            console.log(`Text: "${text}"\n\n Replaced with: "${replacedText}"`)
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node)
                //node.innerText = replacedText
            }
        }
    }
}
