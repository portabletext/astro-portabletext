import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('render', () => {
  it('block', async () => {
    const $ = await fetchContent('render/block')
    const $block = $("div[data-custom='block']")
    const $span = $block.find("span[data-custom='text']")

    expect($block.length).toBe(1)
    expect($span.length).toBe(1)
    expect($span.text()).toBe('Rocket launch 🚀')
  })

  it('list', async () => {
    const $ = await fetchContent('render/list')
    const $list = $("ul[data-custom='list']")
    const $span = $list.find("span[data-custom='text']")

    expect($list.length).toBe(1)
    expect($span.length).toBe(1)
  })

  it('mark', async () => {
    const $ = await fetchContent('render/mark')
    const $em = $('em')
    const $span = $em.find("span[data-custom='text']")

    expect($em.length).toBe(1)
    expect($span.length).toBe(1)
  })
})
