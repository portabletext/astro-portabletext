# @portabletext/astro

[![npm version](https://img.shields.io/npm/v/@portabletext/astro.svg?style=flat-square)](https://www.npmjs.com/package/@portabletext/astro)
[![npm downloads](https://img.shields.io/npm/dm/@portabletext/astro.svg?style=flat-square)](https://www.npmjs.com/package/@portabletext/astro)
![license](https://img.shields.io/npm/l/@portabletext/astro?style=flat-square)

Render [Portable Text](https://portabletext.org) with [Astro](https://astro.build).

> [!NOTE]
> This package is a fork of [`astro-portabletext`](https://github.com/theisel/astro-portabletext)
> by [Tom Theisel](https://github.com/theisel), maintained under the
> [`@portabletext`](https://github.com/portabletext) organization. All credit for the original
> design and implementation goes to Tom. It remains distributed under the original
> [ISC License](./LICENSE). See [Migrating from `astro-portabletext`](#migrating-from-astro-portabletext).

## Table of contents

- [Installation](#installation)
- [Basic usage](#basic-usage)
- [Sanity integration](#sanity-integration)
- [Customizing components](#customizing-components)
  - [Default components](#default-components)
  - [Custom components](#custom-components)
  - [Slots](#slots)
- [`PortableText` component properties](#portabletext-component-properties)
- [Utility functions](#utility-functions)
  - [`usePortableText`](#useportabletext)
  - [`mergeComponents`](#mergecomponents)
  - [`toPlainText`](#toplaintext)
- [Migrating from `astro-portabletext`](#migrating-from-astro-portabletext)
- [License](#license)

## Installation

```bash
npm install @portabletext/astro
```

> **Prerequisites:** Astro v4.6 or newer.

## Basic usage

Import the `PortableText` component and pass it a Portable Text value. The library provides sensible
defaults for rendering all standard Portable Text elements, which you can override.

```astro
---
import {PortableText} from '@portabletext/astro'

const portableText = [
  {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {_type: 'span', marks: [], text: 'This is a '},
      {_type: 'span', marks: ['strong'], text: 'bold'},
      {_type: 'span', marks: [], text: ' text example!'},
    ],
  },
]
---

<PortableText value={portableText} />
```

## Sanity integration

This library's predecessor is
[officially recommended](https://www.sanity.io/plugins/sanity-astro#rendering-rich-text-and-block-content-with-portable-text)
by [Sanity](https://sanity.io) for rendering Portable Text in Astro projects. Helpful resources:

- [Sanity integration for Astro](https://www.sanity.io/plugins/sanity-astro)
- [Guide: building a blog with Sanity and Astro](https://www.sanity.io/guides/sanity-astro-blog)

## Customizing components

### Default components

Default components are provided for all standard features of the Portable Text spec, with logical
HTML defaults. Provided components are merged with the defaults, so you only need to provide the
things you want to override.

<details>
  <summary>View the default structure and output</summary>

```js
{
  type: {
    /* Custom types go here */
  },
  block: {
    h1: /* <h1 {...attrs}><slot /></h1> */,
    h2: /* <h2 {...attrs}><slot /></h2> */,
    h3: /* <h3 {...attrs}><slot /></h3> */,
    h4: /* <h4 {...attrs}><slot /></h4> */,
    h5: /* <h5 {...attrs}><slot /></h5> */,
    h6: /* <h6 {...attrs}><slot /></h6> */,
    blockquote: /* <blockquote {...attrs}><slot /></blockquote> */,
    normal: /* <p {...attrs}><slot /></p> */
  },
  list: {
    bullet: /* <ul {...attrs}><slot /></ul> */,
    number: /* <ol {...attrs}><slot /></ol> */,
    menu: /* <menu {...attrs}><slot /></menu> */,
  },
  listItem: {
    bullet: /* <li {...attrs}><slot /></li> */,
    number: /* <li {...attrs}><slot /></li> */,
    menu: /* <li {...attrs}><slot /></li> */,
  },
  mark: {
    code: /* <code {...attrs}><slot /></code> */,
    em: /* <em {...attrs}><slot /></em> */,
    link: /* <a {...attrs} href="..."><slot /></a> */,
    'strike-through': /* <del {...attrs}><slot /></del> */,
    strong: /* <strong {...attrs}><slot /></strong> */,
    underline: /* <span {...attrs} style="text-decoration: underline;"><slot /></span> */
  },
  text: /* Renders plain text */,
  hardBreak: /* <br /> */,
}
```

</details>

### Custom components

Custom components give you control over how each node is rendered. Map a component to a whole node
type, or to a specific property (style, mark type, list item type, etc.) of that node type.

```astro
---
import {PortableText} from '@portabletext/astro'
import Code from '../components/Code.astro'
import Link from '../components/Link.astro'

const portableText = [
  // ... your Portable Text content
]

const components = {
  // Custom object types, keyed by `_type` (or a single component for all types)
  type: {code: Code},
  // Block styles, keyed by `style`
  block: {/* h1, h2, normal, ... */},
  // Lists, keyed by `listItem`
  list: {/* bullet, number, ... */},
  // List items, keyed by `listItem`
  listItem: {/* bullet, number, ... */},
  // Marks (decorators and annotations), keyed by mark type
  mark: {link: Link},
  // Fallbacks for unknown nodes
  unknownType: undefined,
  unknownBlock: undefined,
  unknownList: undefined,
  unknownListItem: undefined,
  unknownMark: undefined,
  // Plain text spans and hard breaks
  text: undefined,
  hardBreak: undefined,
}
---

<PortableText value={portableText} components={components} />
```

Each custom component receives `node`, `index` and `isInline` props, and renders any children
through a `<slot />`. For example, a custom `link` mark:

```astro
---
import type {MarkProps} from '@portabletext/astro/types'

export type Props = MarkProps<{href?: string}>

const {node} = Astro.props
const href = node.markDef?.href
---

<a href={href}><slot /></a>
```

### Slots

Slots provide a flexible way to enhance rendering by passing additional props to the resolved
component - for example applying custom classes or wrapping elements - without replacing the default
component entirely.

```astro
---
import {PortableText} from '@portabletext/astro'

const portableText = [
  // ... your Portable Text content
]
---

<PortableText value={portableText}>
  <fragment slot="mark">
    {({Component, props, children}) => (
      <Component {...props} class="mark">{children}</Component>
    )}
  </fragment>
</PortableText>

<style>
  .mark:where(strong) {
    /* some styles */
  }
</style>
```

## `PortableText` component properties

| Property                        | Type                    | Description                                                                                                                                 |
| ------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                         | `array` or `object`     | Portable Text payload                                                                                                                       |
| `components` (optional)         | `object`                | Mapping of components to node types or their properties.                                                                                    |
| `onMissingComponent` (optional) | `function` or `boolean` | Disable warning messages or handle unknown types. **Default** prints to console.                                                            |
| `listNestingMode` (optional)    | `"html"` or `"direct"`  | List nesting mode. **Default** is `html`. See [ToolkitListNestMode](https://portabletext.github.io/toolkit/types/ToolkitListNestMode.html). |

## Utility functions

```js
import {usePortableText, mergeComponents, toPlainText, spanToPlainText} from '@portabletext/astro'
```

### `usePortableText`

Within a component passed into the `components` prop, `usePortableText(node)` returns rendering
utilities scoped to that node: `getDefaultComponent()`, `getUnknownComponent()` and `render()`.

```astro
---
import type {BlockProps} from '@portabletext/astro/types'
import {usePortableText} from '@portabletext/astro'

export type Props = BlockProps

const {node} = Astro.props
const {getDefaultComponent} = usePortableText(node)
const Default = getDefaultComponent()
---

<Default {...Astro.props}><slot /></Default>
```

### `mergeComponents`

Merges two component maps, giving priority to the overrides. Useful for extending a shared base set
of components.

```js
import {mergeComponents} from '@portabletext/astro'

const components = mergeComponents(baseComponents, {
  block: {h1: MyHeading},
})
```

### `toPlainText`

Renders one or more Portable Text blocks as a plain string - handy for meta descriptions or
generating slugs. `spanToPlainText` does the same for a single span's children.

```astro
---
import {toPlainText} from '@portabletext/astro'

const {node} = Astro.props
const text = toPlainText(node)
---
```

## Migrating from `astro-portabletext`

`@portabletext/astro` is a drop-in fork of [`astro-portabletext`](https://github.com/theisel/astro-portabletext).
To migrate, swap the dependency and update your imports:

```diff
- import {PortableText} from 'astro-portabletext'
+ import {PortableText} from '@portabletext/astro'

- import type {BlockProps} from 'astro-portabletext/types'
+ import type {BlockProps} from '@portabletext/astro/types'
```

The component API, props and utility functions are unchanged.

## License

[ISC](./LICENSE) © [Tom Theisel](https://github.com/theisel) (original author) and the Portable Text authors.
