# Mispell Browser Addon
This addon changes all the text on websites you visit to make it seem like it was written by a "bimbo" or to make it more difficult to understand. How much the text is changed is adjusted by a slider and there are different modes that determine in what way the text is changed. This addon and its effects are just for entertainment.

Drawbacks: While the addon is active, websites will take longer to load, some websites may not behave correctly, and the addon may accidentally interfere when you type on certain websites. This is because the addon can sometimes have difficult discerning what text it should and should not edit.

The addon can be turned off by setting the "IQ" slider to its maximum value. This makes it is easy to turn it on again later by just lowering the slider. Otherwise, when you're tired of the addon, or if you experience problems, simply uninstall or disable it, and refresh the page.

All settings for the addon can be adjusted in the addon pop-out menu in the top right corner of your browser. When first installed, the addon won't do anything until you have adjusted the "IQ" slider to a lower value.

## Permission justifications
The addon needs to save user settings like to what degree text should be changed, and which mode should be used. These settings are configured by the user through the browser action popup.

The addon needs to run its content script on all websites on which it is to function, since it needs access to all text on those websites in order to edit it.

## Building
To build the addon, run the following (after setting the environment variables that appear below):

```
npm run build
cd dist
web-ext sign --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

A ctx file is now created in `dist/web-ext-artifacts/`. This is the Firefox version of the addon and can be self-hosted.

To submit to the Chrome web store, after running the steps above, in the `dist` folder, edit `manifest.json` by removing the `update-url` key (this key is only to allow self-update for Firefox self-publishing). Then zip everything in the `dist` folder except the `web-ext-artifacts` folder. Now submit the zip file.

## Development
Run `npm run serve` to start live reload session of the extension.