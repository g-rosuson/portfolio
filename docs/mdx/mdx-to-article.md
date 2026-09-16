# MDX to article

The article page loads an article with `getBySlug`, then compiles `article.source` into React. Heading `id`s from that compile are what the UI jumps to.

## Compile — `next-mdx-remote-client`

[`MDXRemote`](../../src/app/(root)/articles/[slug]/page.tsx) from `next-mdx-remote-client/rsc` compiles `article.source` on the server.

Two plugins run, in this order.

### `remark-gfm`

Runs first, while the body is still markdown. It is GitHub Flavored Markdown: tables, strikethrough, autolinked URLs, task lists, and footnotes.

### `rehype-slug`

Runs after headings exist as HTML. It takes each heading’s visible text, runs it through `github-slugger`, and writes an `id`. Duplicate titles get the same suffixes, in the same order, as `article.sections`.

## Using the ids

[`mdxComponents`](../../src/components/shared/mdx/components.tsx) maps `h2` and `h3` to [`Heading`](../../src/components/ui/heading/Heading.tsx) and forwards the `id` from `rehype-slug`. A heading with an `id` gets `scroll-margin-top` so in-page jumps sit clear of the top bar.

[`SectionNav`](../../src/components/pages/article/sectionNav/SectionNav.tsx) turns `article.sections` into `#id` links. A link to `#writing-in-the-repository` lands on the heading `rehype-slug` stamped.
