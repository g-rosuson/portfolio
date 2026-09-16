# Articles query

[`api.content.queries.articles`](../../../src/api/content/queries/articles) prepares each content file as an [`Article`](../../../src/shared/types/articles/index.ts): validated fields, a body ready to compile, reading time, and section ids.

## Mapping

[`mapToArticle`](../../../src/api/content/queries/articles/mappers/index.ts) spreads frontmatter, adds `slug`, and sets `source` to the stripped body. It derives `readingTimeMinutes` and `sections`, then [`articleSchema`](../../../src/api/content/queries/articles/schemas/index.ts) validates the result.

`date` is rewritten from `DD-MM-YYYY` to ISO `YYYY-MM-DD` so the calendar date is unambiguous and valid for `<time datetime>`.

## Reading time

Counted on the stripped body. Fences, inline code, images, and common markdown markers are removed, then words are counted at 200 per minute, with a floor of one minute.

## Sections — `github-slugger`

[`extractSections`](../../../src/api/content/queries/articles/helpers/index.ts) walks the markdown with a `GithubSlugger` instance and builds `{ id, title }` for each `##` heading. Those ids are reused when the MDX pipeline compiles the body.

Fenced code is stripped first. Each `##`–`######` line is reduced to visible text (bold, links, inline code, HTML tags removed) so `## Hello **world**` becomes `"Hello world"`, then id `hello-world`.

The slugger remembers what it has seen. Two identical titles become `intro` then `intro-1`. Every heading depth is slugged, in document order. Only `##` headings are returned as `sections`.
