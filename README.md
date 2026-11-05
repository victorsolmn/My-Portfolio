# victorsalomon.in

Portfolio of Victor Salomon — Chief of Staff & Product Leader. Plain HTML, CSS and vanilla JS; no build step. Deployed on Netlify from `main`.

## Structure

```
index.html              Homepage
pages/*.html            Case studies (koinbx, assetworks, peersclub, mfine-lifecell, meesho) + contact
404.html                Served by Netlify for unknown URLs
css/main.css            Design tokens (light/dark), components, all page styles
js/main.js              Theme toggle, nav, scroll reveal, count-up, "Where I work" visual, GA4 + events
_partials/              Shared header and footer (source of truth)
scripts/sync-partials.py  Copies _partials into every page
scripts/serve.py        Local preview server (Netlify-style pretty URLs + 404)
assets/                 Resume PDF, share image, images (opt/ = optimised WebP/JPEG)
```

## Working on the site

```bash
python3 scripts/serve.py              # http://localhost:8765
```

**Changing the nav or footer:** edit `_partials/header.html` or `_partials/footer.html`, then run

```bash
python3 scripts/sync-partials.py      # rewrite pages
python3 scripts/sync-partials.py --check
```

**Updating the resume:** replace `assets/Victor_Salomon_Resume.pdf` (phone-free version). Every "Download resume" button points there.

**Analytics:** set `GA_ID` in `js/main.js` to the GA4 measurement ID. It only loads on victorsalomon.in. Click events come from `data-track` attributes (`resume_download`, `email_click`, `linkedin_click`, `case_study_open`, `project_demo_click`, `coaching_click`).

**Colours and fonts:** tokens at the top of `css/main.css` (accent `#2F5BFF`; Instrument Serif + Inter).

## Content rules

- Every number and claim must match the current resume.
- Keep the hero, page titles, meta tags, results strip and bios industry-agnostic; company-specific detail belongs in the timeline and case-study pages.
- No phone number and no "open to work" signals on the public site.
