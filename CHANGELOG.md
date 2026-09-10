# @portabletext/astro

## 0.2.0

### Minor Changes

- [#4](https://github.com/portabletext/astro-portabletext/pull/4) [`0fd7cd3`](https://github.com/portabletext/astro-portabletext/commit/0fd7cd372df10919c6ff88d7533f4f7a0293a42e) Thanks [@msfragala](https://github.com/msfragala)! - Allow `PortableText` slots to be scoped to a specific type with `nodeType:type`, e.g. `block:h1`, `mark:link`, `list:bullet`, `listItem:number` and `type:myCustomType`. A scoped slot takes precedence over the node type it belongs to.

  Slots now also take precedence over `render` from `usePortableText`. Previously a component reached through the `components` prop could displace a slot by rendering its children with `render`, so a slot for that node type never applied.

  `Component` is now resolved lazily, so a slot that renders its own markup no longer reports a missing component. This makes a scoped slot enough on its own to render a custom type, which has no default component.

## 0.1.0

### Minor Changes

- [#1](https://github.com/portabletext/astro-portabletext/pull/1) [`e3997e2`](https://github.com/portabletext/astro-portabletext/commit/e3997e216c13cd9da693e924c674cfed52a2d002) Thanks [@stipsan](https://github.com/stipsan)! - Initial release of `@portabletext/astro`, forked from [`astro-portabletext`](https://github.com/theisel/astro-portabletext) by Tom Theisel
