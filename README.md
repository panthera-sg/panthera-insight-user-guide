# Panthera Insight — public site

Public MkDocs Material site for the Panthera Insight mobile app. Hosts the **user guide** for end clients and the **legal documents** (Privacy Notice, Terms of Service, Delete-account landing page).

These URLs are linked from the in-app Settings → Legal section and from the Apple App Store / Google Play store listings.

## This folder is ready to be a standalone repository

Everything in this folder is self-contained — no references outside it. To turn it into its own GitHub repo:

```bash
cd panthera-insight-site
git init
git add .
git commit -m "Initial: panthera-insight public site"
git branch -M main
git remote add origin git@github.com:<org>/<repo>.git
git push -u origin main
```

Then in the new repo on GitHub: **Settings → Pages → Source: GitHub Actions**. The included `.github/workflows/deploy.yml` workflow builds and deploys on every push to `main`.

After the first successful deploy, update `AppConstants.legalSiteBase` in the Flutter app so the in-app Settings tiles point to the new host (`https://<org>.github.io/<repo>/` or your custom domain).

## Local development

Requires Python 3.10+.

```bash
pip install -r requirements.txt
mkdocs serve
```

Served at <http://127.0.0.1:8000>. Edits to files under `docs/` reload live.

## Build

```bash
mkdocs build --strict
```

Output goes to `site/` (gitignored). `--strict` fails the build on broken links — keep it that way.

## Structure

```
panthera-insight-site/
├── mkdocs.yml              # Site config (theme, nav, plugins)
├── requirements.txt        # Pinned mkdocs-material version
├── docs/
│   ├── index.md            # Landing page
│   ├── user-guide/         # End-client documentation
│   ├── stylesheets/
│   │   └── extra.css       # Panthera palette + light/dark schemes
│   └── assets/
│       ├── panthera-wordmark-gold.png
│       └── user-guide/     # Screenshots / gifs for the user guide
└── .github/workflows/deploy.yml   # GitHub Pages deploy
```

## Theme

MkDocs Material with two custom palettes:

- **panthera-light** — warm off-white surface (`#F5F5F3`), near-black text, deep-purple primary, gold accents on hover.
- **panthera-dark** — charcoal surface (`#2F3339`), light text, gold accent.

The toggle is in the top-right and respects `prefers-color-scheme` on first load.

The palette mirrors `lib/core/theme/app_theme.dart` in the main app repo. Keep `docs/stylesheets/extra.css` in sync if the in-app palette changes.

## Inserting images / gifs for the user guide

Several user-guide pages contain placeholder admonitions of the form:

```markdown
!!! example "placeholder"
    📷 Replace with a screenshot of the home screen with the most
    recent report visible.
    Suggested file: `assets/user-guide/home-screen.png`
```

To add the real image:

1. Drop the file into `docs/assets/user-guide/`.
2. Replace the placeholder admonition with a normal image reference:

   ```markdown
   ![Home screen showing the latest report](../assets/user-guide/home-screen.png){ width=320 }
   ```

Find every outstanding placeholder with:

```bash
grep -rn "placeholder" docs/user-guide/
```

## Notes

- Operating entity: **Panthera International Asia Capital Pte. Ltd.**, regulated under a Singapore MAS licence.
- DPO mailbox: `pantherainsight@gmail.com`.
- Sub-processors disclosed in the Privacy Notice: Supabase and Sentry.
- The legal content is currently engineering-drafted. Have counsel review before the app goes live in any App Store / Play Store.
