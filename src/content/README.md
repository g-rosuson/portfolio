# Article content

Markdown/MDX articles live in `src/content/articles/`. One file per article; the filename is the slug (`why-local-mdx.mdx` → `/articles/why-local-mdx`). Add that filename to `articleSlugSchema` in `src/api/content/queries/articles/schemas/index.ts`. An article whose name is not in that list fails validation.

## Images

### Where files live

Put article images in git under:

```
public/images/articles/<slug>/
```

`<slug>` must match the MDX filename (without `.mdx`). Same pattern as `public/images/portraits` and `public/videos`. There is no image bucket or extra CDN in this version.

All images for one article go in that folder (`hero.jpg`, `diagram.png`, …). `ogImage` still names a single file for social previews.

### How to reference them in MDX

Embed an image with one markdown image per line. Text in the square brackets is the alt. The path in parentheses is a site-absolute URL under `public/`:

```md
![Host, client, and server](/images/articles/<slug>/<image-name>.png)
```

### How they render

MDX `img` elements are mapped to `next/image` with `width={800}` and `height={450}`. CSS sets `width: 100%`, `height: auto`, and `border-radius: var(--border-radius-md)`.

### Open Graph

Every article must set frontmatter `ogImage` and `draft`. `ogImage` is a **filename only** (for example `hero.jpg`) in that article’s folder. The article page resolves it to:

`https://www.rosuson.com/images/articles/<slug>/<ogImage>`

### Caching

`next.config.mjs` sets `Cache-Control: public, max-age=7776000, immutable` on `/images/:path*` (three months). Treat that as the CDN. If you replace an image, **rename the file** so caches do not keep the old bytes.

## MDX components

Article files are read as strings and compiled by `MDXRemote`. They cannot `import` a local file. A tag in the MDX only renders if that name is passed on the `components` prop in `src/app/(root)/articles/[slug]/page.tsx`.

### Shared elements

`src/components/shared/mdx/components.tsx` maps the elements every article uses: headings, links, images, code blocks, quotes, and lists. Raster images stay on the `img` map described above.

### Article-specific components

Use a React component when the graphic needs theme colors, or when markdown is the wrong shape. Put the component under `src/components/pages/article/diagrams/`, then register it in `src/components/pages/article/diagrams/index.ts`. The object key is the article slug. Those keys are `Article['slug']`, inferred from `articleSlugSchema`, so a key has to be one of the listed filenames. The page spreads `articleDiagrams[article.slug]` into `MDXRemote`, so the tag is available only on that article.

In the MDX, use the component name on its own line. Do not import it:

```mdx
<HostClientServerDiagram />
```

```ts
const articleDiagrams: Partial<Record<Article['slug'], MDXComponents>> = {
    'what-is-mpc': {
        HostClientServerDiagram
    }
};
```

For an SVG diagram, set ink to `currentColor` and box fills to `var(--color-bg)` on the elements themselves. Put `Diagram.module.scss` on the root element. That shared class is the frame for every diagram: full width, muted surface, padding, and `color: var(--color-text)`, so strokes and labels follow the theme. Do not remap exported fill names such as `white` or `black` from shared MDX CSS.
