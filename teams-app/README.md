# Teams Manifest Package

This folder contains a Microsoft Teams tab package for the retrospective board.

## Included files

- manifest.json
- color.png (192x192)
- outline.png (32x32)

## Package versions

- Current manifest version: 1.0.1
- Teams package with external config host: retrospective-teams-app-v1.0.1-external-config.zip

## External config host option

If your main app host forces auth or blocks iframe setup screens, use `manifest.external-config.json`.

1. Host `tab-config.html` on a public static domain that can load inside Teams.
2. Replace `REPLACE_WITH_PUBLIC_CONFIG_HOST` in `manifest.external-config.json`.
3. Zip that manifest (renamed to `manifest.json`) with `color.png` and `outline.png`.

## App routes used by Teams

- / -> main retrospective tab content
- /tab-config -> Teams tab configuration page

## Configure for your environment

1. Deploy this app to an HTTPS host.
2. In manifest.json, replace every occurrence of YOUR_APP_DOMAIN with your host domain.
3. Keep validDomains aligned with your deployment domain.

## Sideload in Teams

1. Zip manifest.json, color.png, and outline.png at the root of the zip file.
2. Open Teams Developer Portal and choose Apps -> Import app package.
3. Upload the zip package.
4. Add the app to a chat or meeting and complete the tab setup flow.

## Notes

- The app supports chat and meeting tab contexts through configurableTabs.
- For local debugging, localhost:5173 is included in validDomains.
