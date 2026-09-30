# Salwa Mustafa — finished portfolio

Complete, editable static website exported from the published revision on 30 September 2026, including the latest ORG Verlag moodboard and adjusted logo letter spacing.

## Deploy through GitHub and Vercel

1. Unzip this download.
2. Create a GitHub repository and add **the contents of this folder** to its root. You should see `vercel.json`, `README.md`, and `dist/` together at the repository root. Upload the extracted files, not the ZIP itself. GitHub Desktop can add the complete folder and publish the repository.
3. In Vercel, add a new project, connect GitHub and import that repository.
4. Use these settings (the included `vercel.json` supplies them):

| Setting | Value |
| --- | --- |
| Framework Preset | Other |
| Root Directory | Repository root (`.`) |
| Build Command | Empty — no build needed |
| Install Command | Empty — no dependencies |
| Output Directory | `dist` |
| Environment variables | None |

5. Deploy. Vercel will provide your new website address. Later commits to the connected production branch can update the site.

Keep the folder names, file names and their capitalization unchanged. Do not add a framework, run a build conversion, enable clean URLs, or add a catch-all rewrite: the existing HTML files and hash-based overlay navigation already work together.

Vercel's own deployment access settings apply; the previous host's private access wrapper is not part of this static website.

## What is included

- `dist/index.html`: complete homepage and six embedded case-study templates.
- `dist/style.css`, `home.css`, `handic-case.css`, `case-studies.css`: existing styling.
- `dist/handic-case.js`: shared project overlay, navigation and image viewer.
- `dist/*-case.html`: editable case-study fragments. The active website reads the copies embedded in `index.html`, so future content edits should keep both copies aligned.
- Existing project routes and supporting pages, retained exactly as published.
- `dist/assets/`: every deployed image and PDF, including the CV and presentations.
- `dist/favicon.svg`: existing favicon.
- `vercel.json`: static hosting configuration.
- `ASSETS-AND-FONTS.md`: asset and typography reference.
- `EXPORT-MANIFEST.json`: file sizes and SHA-256 checksums for the entire website.

This is the actual HTML/CSS/JavaScript source, not screenshots of the website. No package installation, API key, database or server is needed. The complete published static directory is preserved, including supporting assets that are not currently linked from the homepage.

## Preview locally

You can open `dist/index.html` directly in a browser. For a local web server, if Python 3 is installed, run this from the project folder:

```sh
python3 -m http.server 8000 --directory dist
```

Then open http://localhost:8000. Stop the server with Ctrl+C.

## Reference documentation

- [Vercel static-site build settings](https://vercel.com/docs/builds/configure-a-build)
- [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json)

The original live site has not been changed by this export. Git history, hosting credentials and the previous host's project registration are not required to deploy this independent copy.
