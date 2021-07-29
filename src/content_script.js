import mispell from "mispell/dist/mispell.node";

console.log("Content...4")
//console.log("Print", mispell.bimbofy("Hello there my friends", 1.0))

let elements = document.getElementsByTagName('*')

for (let element of elements) {
    for (let node of element.childNodes) {
        if (node.nodeType === 3) {
            let text = node.nodeValue
            //if (text.length < 10) continue

            let replacedText = mispell.bimbofy(text, 0.7)
            console.log(`Text: "${text}"\n\n Replaced with: "${replacedText}"`)
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node)
            }
        }
    }
}
