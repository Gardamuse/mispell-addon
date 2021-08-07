document.getElementById('myHeading').style.color = 'blue'
function saveOptions(e) {
    console.log("Saving options")
    browser.storage.local.set({
        colour: document.querySelector("#colour").value
    });
    e.preventDefault();
    restoreOptions()
}

function restoreOptions() {
    console.log("Restoring options")
    var storageItem = browser.storage.local.get('colour');
    storageItem.then((res) => {
        document.querySelector("#managed-colour").innerText = res.colour;
    });

    var gettingItem = browser.storage.local.get('colour');
    gettingItem.then((res) => {
        document.querySelector("#colour").value = res.colour || 'Firefox red';
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);