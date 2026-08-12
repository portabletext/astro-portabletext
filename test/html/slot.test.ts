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
})
