import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('slot', () => {
  it('block', async () => {
    const $ = await fetchContent('slot/block')
    const $el = $("p[data-slot='block']")

    expect($el.length).toBe(1)
  })

  it('custom block', async () => {
    const $ = await fetchContent('slot/block-custom')
    const $el = $("p[data-slot='custom-block']")

    expect($el.length).toBe(1)
  })

  it('list', async () => {
    const $ = await fetchContent('slot/list')
    const $el = $("ul[data-slot='list']")

    expect($el.length).toBe(1)
  })

  it('custom list', async () => {
    const $ = await fetchContent('slot/list-custom')
    const $el = $("ul[data-slot='custom-list']")

    expect($el.length).toBe(1)
  })

  it('listitem', async () => {
    const $ = await fetchContent('slot/listitem')
    const $el = $("li[data-slot='listitem']")

    expect($el.length).toBe(1)
  })

  it('custom listitem', async () => {
    const $ = await fetchContent('slot/listitem-custom')
    const $el = $("li[data-slot='custom-listitem']")

    expect($el.length).toBe(1)
    expect($el.text()).toBe('List Item 1')
  })

  it('mark', async () => {
    const $ = await fetchContent('slot/mark')
    const $el = $("strong[data-slot='mark']")

    expect($el.length).toBe(1)
  })

  it('custom mark', async () => {
    const $ = await fetchContent('slot/mark-custom')
    const $el = $("strong[data-slot='custom-mark']")

    expect($el.length).toBe(1)
    expect($el.text()).toBe('bold')
  })

  it('type', async () => {
    const $ = await fetchContent('slot/type')
    const $el = $("[data-slot='type']")

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Hello World')
  })

  it('text and hardBreak', async () => {
    const $ = await fetchContent('slot/text-and-hardbreak')

    // The span is split on "\n" into text, hardBreak, text
    expect(
      $("span[data-slot='text']")
        .map((_, el) => $(el).text())
        .get(),
    ).toEqual(['line one', 'line two'])
    expect($("hr[data-slot='hardbreak']").length).toBe(1)
    expect($('br').length).toBe(0)
  })

  describe('scoped to a type', () => {
    it('block style', async () => {
      const $ = await fetchContent('slot/block-scoped')

      expect($("h1[data-slot='block-h1']").length).toBe(1)
      // The `normal` block has no slot of its own, and `block` was not given
      expect($('p[data-slot]').length).toBe(0)
    })

    it('mark type', async () => {
      const $ = await fetchContent('slot/mark-scoped')

      expect($("a[data-slot='mark-link']").text()).toBe('link')
      // Hyphenated mark types can be scoped too
      expect($("del[data-slot='mark-strike-through']").text()).toBe('struck')
      expect($('strong[data-slot]').length).toBe(0)
    })

    it('list item type', async () => {
      const $ = await fetchContent('slot/list-scoped')

      expect($("ul[data-slot='list-bullet']").length).toBe(1)
      expect($('ol[data-slot]').length).toBe(0)

      expect($("ol > li[data-slot='listitem-number']").text()).toBe('Number Item')
      expect($('ul > li[data-slot]').length).toBe(0)
    })

    it('custom type', async () => {
      const $ = await fetchContent('slot/type-scoped')

      expect($("[data-slot='type-helloworld']").length).toBe(1)
      expect($('p').length).toBe(2)
    })

    it('renders a custom type that has no component of its own', async () => {
      const $ = await fetchContent('slot/type-scoped-no-component')

      expect($('aside.callout').text()).toBe('Heads up')
      // The slot never asks for `Component`, so the unknown type is not reported
      expect($('[data-portabletext-unknown]').length).toBe(0)
    })

    it('takes precedence over the node type slot', async () => {
      const $ = await fetchContent('slot/scoped-precedence')

      expect($("h1[data-slot='block-h1']").length).toBe(1)
      expect($("blockquote[data-slot='block-any']").length).toBe(1)
    })

    it('receives the component resolved from the `components` prop', async () => {
      // The page asserts on the `Component` it is handed, so reaching the
      // expected markup at all means every scoped slot got the right one.
      const $ = await fetchContent('slot/scoped-custom')

      expect($("h1[data-slot='block-h1']").length).toBe(1)
      expect($("h1 > strong[data-slot='mark-strong']").text()).toBe('bold')
      expect($("p[data-slot='type-helloworld']").text()).toBe('Hello World')
    })
  })

  describe('overrides the `components` prop', () => {
    it('wins over `render` from a component', async () => {
      const $ = await fetchContent('slot/override-render')
      const $block = $("div[data-custom='block']")

      // `BlockWithRender` renders its children with `render({ text })`
      expect($block.length).toBe(1)
      expect($block.find("span[data-custom='text']").length).toBe(0)

      const $text = $block.find("span[data-slot='text']")

      expect($text.length).toBe(1)
      expect($text.text()).toBe('Rocket launch')
    })

    it('wins over `render` from a component when scoped', async () => {
      const $ = await fetchContent('slot/override-render-scoped')
      const $block = $("div[data-custom='block']")

      // `BlockWithMarkRender` renders every mark with `render({ mark })`
      const $em = $block.find('em')

      expect($em.attr('data-slot')).toBe('mark-em')
      expect($em.attr('data-custom')).toBeUndefined()
      expect($em.text()).toBe('emphasis')

      // `strong` has no slot, so the component's own renderer still applies
      const $strong = $block.find('strong')

      expect($strong.attr('data-custom')).toBe('mark')
      expect($strong.attr('data-slot')).toBeUndefined()
      expect($strong.text()).toBe('bold')
    })
  })
})
