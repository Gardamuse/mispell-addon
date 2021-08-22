import {AddonSettings} from "../addon_settings";

async function saveOptions(e) {
    let settingState = await browser.storage.local.get('settings');
    let settings = new AddonSettings(settingState.settings)
    settings.iq = document.querySelector("#iq-slider").value
    browser.storage.local.set({
        settings: settings
    });
    e.preventDefault();
    restoreOptions()
}

async function restoreOptions() {
    let settingState = await browser.storage.local.get('settings');
    let settings = new AddonSettings(settingState.settings)
    document.querySelector("#iq-indicator").innerText = settings.iq;
    document.querySelector("#iq-slider").value = settings.iq;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#iq-slider").addEventListener("input", saveOptions);