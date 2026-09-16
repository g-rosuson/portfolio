# Content API

[`api.content`](../../../src/api/content) reads Markdown/MDX files from disk.

## Collections

Files live under `src/content/<collection>/*.mdx`. The slug is the filename without `.mdx`.

## Client

[`src/api/content/client`](../../../src/api/content/client) reads those files.

`getDocuments(collection)` reads every `.mdx` file in that folder.

`getDocument(slug, collection)` reads one file. It resolves the slug to a path inside the collection folder. A missing file returns `null`.

## Splitting YAML from the body

[`toDocumentFile`](../../../src/api/content/client/mappers/index.ts) calls `getFrontmatter` from `next-mdx-remote-client/utils`. That helper peels the YAML block off the file.

The result is a `DocumentFile`: `slug`, the whole file as `source`, the body as `strippedSource`, and `frontmatter` from the YAML.
