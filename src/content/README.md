# Article content

Markdown/MDX articles live in `src/content/articles/`. One file per article; the filename is the slug (`why-local-mdx.mdx` → `/articles/why-local-mdx`).

## Images

### Where files live

Put article images in git under:

```
public/images/articles/<slug>/
```

`<slug>` must match the MDX filename (without `.mdx`). Same pattern as `public/images/portraits` and `public/videos`. There is no image bucket or extra CDN in this version.

All images for one article go in that folder (`hero.jpg`, `diagram.png`, …). `ogImage` still names a single file for social previews.

### How to reference them in MDX

Use a site-absolute public URL only. One markdown image per file:

```md
![Home after the rewrite](/images/articles/<slug>/hero.jpg)
![Request flow](/images/articles/<slug>/diagram.png)
```

Always write a real `alt` description. That string is what the page uses for accessibility.

### How they render

MDX `img` elements are mapped to `next/image` with `width={800}` and `height={450}`. CSS sets `width: 100%`, `height: auto`, and `border-radius: var(--border-radius)`.

### Open Graph

Every article must set frontmatter `ogImage` and `draft`. `ogImage` is a **filename only** (for example `hero.jpg`) in that article’s folder. The article page resolves it to:

`https://www.rosuson.com/images/articles/<slug>/<ogImage>`

### Caching

`next.config.mjs` sets `Cache-Control: public, max-age=7776000, immutable` on `/images/:path*` (three months). Treat that as the CDN. If you replace an image, **rename the file** so caches do not keep the old bytes.
