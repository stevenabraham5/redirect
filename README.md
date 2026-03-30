# Retrospective App

Anonymous sticky-note board for team retrospectives.

## What it does

- Lets participants post stickies without entering a name.
- Organizes notes into four lanes:
  - Strengths
  - Successes
  - Goals / Vision
  - Obstacles
- Supports removing notes and clearing the board.
- Persists notes in browser local storage.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- This version is anonymous on the client and does not collect identity.
- Data is stored locally in each browser session, not shared across multiple users yet.

## Teams tab manifest

- Teams package files are in `teams-app/`.
- Upload package: `teams-app/retrospective-teams-app.zip`.
- Before production sideloading, replace `YOUR_APP_DOMAIN` in `teams-app/manifest.json` with your deployed HTTPS domain.
- The app includes a Teams tab config route at `/tab-config` for chat and meeting tab setup.
