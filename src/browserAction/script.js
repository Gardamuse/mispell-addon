import {AddonSettings} from "../addon_settings";

async function saveOptions(e) {
    let settingState = await browser.storage.local.get('settings');
    let settings = new AddonSettings(settingState.settings)
    settings.iq = document.querySelector("#iq-slider").value
    settings.mode = document.querySelector("#modes").value
    browser.storage.local.set({
        settings: settings
    });
    e.preventDefault();
    restoreOptions()
}

async function restoreOptions() {
    let settingState = await browser.storage.local.get('settings');
    let settings = new AddonSettings(settingState.settings)
    document.querySelector("#iq-indicator").innerText = settings.iq.toString().padStart(3, "0");
    document.querySelector("#iq-slider").value = settings.iq;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#iq-slider").addEventListener("input", saveOptions);
document.querySelector("#iq-slider").addEventListener("change", () => {browser.tabs.reload()});
document.querySelector("#modes").addEventListener("change", (e) => {saveOptions(e); browser.tabs.reload()});