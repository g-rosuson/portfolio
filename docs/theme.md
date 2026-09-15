# Theme

The site theme is `light` or `dark`. It is stored in a `theme` cookie and applied as `data-theme` on `<html>`. CSS tokens in `src/stylesheets/global.scss` follow that attribute.

## Normal pages

1. [`src/app/(root)/layout.tsx`](../src/app/(root)/layout.tsx) reads the cookie and sets `data-theme` on `<html>` before paint. An invalid or missing value leaves the attribute off.
2. [`ThemeProvider`](../src/components/shared/theme/ThemeProvider.tsx) receives that value as `initialTheme` and exposes `{ theme, toggleTheme }` via `useTheme()`.
3. A toggle writes `data-theme`, `localStorage`, and the cookie (`path=/`, one year, `samesite=lax`) so the next request SSR matches.

First visit has no cookie. Until the client persists one, `html:not([data-theme])` under `prefers-color-scheme: dark` loads the dark tokens. `readClientTheme` then resolves from the document, `localStorage`, or the OS and persists if needed.

## 404

`notFound()` is served as `<html id="__next_error__">`. That document is not the app layout, so the cookie is never applied as `data-theme`.

Next also injects `body { color; background }` from `prefers-color-scheme`. Those rules override the app’s `body` styles.

`html body` sets `background-color` and `color` from `--color-bg` / `--color-text` (higher specificity than Next’s `body`). With `data-theme` missing, the `html:not([data-theme])` rule above still follows the OS. The 404 matches the OS, not necessarily the last toggle.
