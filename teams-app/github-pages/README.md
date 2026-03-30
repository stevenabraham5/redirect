# GitHub Pages for Teams Tab Config

This folder is deployed to GitHub Pages and hosts the tab setup page used by Microsoft Teams.

## What gets published

- index.html

Published URL format after first deployment:

- https://<github-username>.github.io/<repository-name>/

For this repository:

- https://stevenabraham5.github.io/redirect/

If your repo is a user/org pages repo named `<github-username>.github.io`, URL format is:

- https://<github-username>.github.io/

## One-time setup

1. Create a GitHub repository for this project.
2. Push this project to branch `main`.
3. In GitHub repo settings, open Pages and set Source to GitHub Actions.
4. Run or wait for workflow `Deploy Tab Config to GitHub Pages`.
5. Copy the deployed URL.

## Update Teams manifest

In teams-app/manifest.json, set:

- configurableTabs[0].configurationUrl = <deployed-url>/index.html
- validDomains should include:
  - retro-ecosystems.lovable.app
  - <github pages host only, no path>

Examples:

- configurationUrl: https://octocat.github.io/team-retro/index.html
- valid domain: octocat.github.io

For this repository:

- configurationUrl: https://stevenabraham5.github.io/redirect/index.html
- valid domain: stevenabraham5.github.io

Then re-zip manifest.json + color.png + outline.png and upload again.
