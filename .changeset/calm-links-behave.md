---
"@portabletext/astro": patch
---

Harden the default `link` mark to match `@portabletext/to-html`: when the `href` isn't relative, a fragment, or one of `http`, `https`, `mailto` and `tel`, the children render as plain text without the anchor. The check is `uriLooksSafe` from `@portabletext/toolkit`, and a non-string `href` renders without an `href` instead of throwing.
