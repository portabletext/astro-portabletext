---
"@portabletext/astro": minor
---

Allow `PortableText` slots to be scoped to a specific type with `nodeType:type`, e.g. `block:h1`, `mark:link`, `list:bullet`, `listItem:number` and `type:myCustomType`. A scoped slot takes precedence over the node type it belongs to.

Slots now also take precedence over `render` from `usePortableText`. Previously a component reached through the `components` prop could displace a slot by rendering its children with `render`, so a slot for that node type never applied.

`Component` is now resolved lazily, so a slot that renders its own markup no longer reports a missing component. This makes a scoped slot enough on its own to render a custom type, which has no default component.
