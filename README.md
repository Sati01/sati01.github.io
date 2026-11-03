# sati01.github.io

Personal portfolio of **Satish Chandra Pamulapati**, ML engineer working on computer vision and LLMs (Lund, Sweden).

It's plain HTML, CSS and JS, with no build step and no dependencies.

## Focus links

| Link | Shows |
|---|---|
| `https://sati01.github.io/` | Everything (general) |
| `https://sati01.github.io/?focus=vision` | Computer vision headline, projects and skills, plus the CV PDF for vision |
| `https://sati01.github.io/?focus=llm` | LLM & data headline, projects and skills, plus the CV PDF for ML/LLM |

Put the matching link in each application.

## Publish on GitHub Pages (about 5 minutes)

1. Sign in to GitHub as **Sati01** and create a new **public** repository named exactly `sati01.github.io`.
2. Upload the *contents* of this folder to the root of the repo. You can drag them in on the "Add file → Upload files" page, or run:
   ```bash
   git init && git add . && git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/Sati01/sati01.github.io.git
   git push -u origin main
   ```
3. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
4. After a minute or two the site is live at **https://sati01.github.io**.

Optional: to use a custom domain (e.g. `satishchandra.dev`), add it under Settings → Pages and follow GitHub's DNS steps. Then update the `canonical`, `og:url` and `og:image` URLs in `index.html`, plus `sitemap.xml` and `robots.txt`.

## Common edits

| What | Where |
|---|---|
| **Add a headshot** | Save a square photo as `assets/img/headshot.jpg` (600×600 px or larger). It replaces the "SC" initials automatically. |
| **Update a CV** | Replace the PDF in `assets/cv/` and keep the same filename. |
| Add or edit a project | `index.html`, `<!-- WORK -->` section. Each `<article class="project">` has `data-only` (which lenses show it) and `data-order` (its position in each lens). |
| Change lens-specific text | Any element with `data-only="all"`, `"vision"`, `"llm"` or a combination (e.g. `"all vision"`). |
| Colours and fonts | Tokens at the top of `assets/css/styles.css` |

## Structure

```
index.html
assets/
  css/styles.css
  js/main.js        focus switch, project ordering, "show more", copy email
  fonts/            Inter and JetBrains Mono (self-hosted, SIL Open Font License)
  img/              rig photo, favicon, social preview (og.png)
  cv/               the two CV PDFs served by the download buttons
.nojekyll           tells GitHub Pages to serve the files as-is
robots.txt, sitemap.xml
```

Icons: [Lucide](https://lucide.dev) (ISC) and [Tabler](https://tabler.io/icons) brand icons (MIT).
