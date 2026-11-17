# JARVIS AI — installable web app

A standalone, mobile-friendly JARVIS-style web interface. It includes a chat console, speech output, optional browser speech recognition, a few safe browser commands, and install/offline support.

## Install on your phone

The app is configured as a Progressive Web App (PWA). It must be served over HTTPS; GitHub Pages provides HTTPS.

### Publish with GitHub Pages

1. Open this repository's **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then Save.
3. Wait for GitHub Pages to publish. The site URL is `https://choudharydibu506-ctrl.github.io/Jarvis-ai/`.
4. Open that URL on your phone.

### iPhone / iPad (Safari)

1. Open the published site in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen**, then tap **Add**.

iOS does not provide the same automatic install prompt as many desktop/Android browsers, so use the Share menu. The added icon opens the site in a standalone app-like window.

### Android (Chrome)

Open the published site in Chrome. When the browser offers installation, tap **Install app** or **Add to Home screen**. On supported browsers, the page also shows an **INSTALL APP** button.

## Current commands

- `What time is it?`
- `What is today's date?`
- `Show my battery level` (only if the browser exposes Battery Status API)
- `Open YouTube`
- `Open Google`

## Important limits

A website cannot take complete control of an iPhone. iOS does not let an ordinary webpage freely change system settings, control Wi-Fi/Bluetooth, access other apps, or run unrestricted background tasks. Browser speech recognition support also varies. Use iPhone keyboard Dictation if the microphone feature is unavailable.

This starter does **not** connect to a real AI model yet. The chat UI and local commands work without an API key. To add real AI, connect a server-side backend. Never put a private API key in `app.js`, HTML, or any public GitHub repository.

## Offline support

After the first successful load, the service worker caches the app's static files so the interface can reopen offline. External links and any future AI backend require an internet connection.

## Privacy

Voice input is processed by the browser's speech-recognition implementation and may rely on a browser/vendor service. The site does not intentionally save conversations to a server. Avoid entering passwords, OTPs, or sensitive personal information.
