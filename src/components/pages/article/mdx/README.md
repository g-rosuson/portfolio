# MDX components

Only tags listed on `mdxComponents` in `components.tsx` are allowed in MDX documents. Unknown JSX is not rendered.

A collection-specific map can spread this object and add widgets.

## Widgets

1. Add a component under `widgets/`.
2. Export it on `mdxComponents` (or a collection map that extends it).
3. Use `<Name />` in the MDX file.

Interactive widgets must be `'use client'`. Do not put arbitrary JavaScript in the document; only mapped components run.

## Images

See [src/content/README.md](../../../content/README.md).
