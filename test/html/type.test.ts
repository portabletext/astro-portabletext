import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('type', () => {
  it('block', async () => {
    const $ = await fetchContent('type/block')
    const $el = $('p')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Hello World')
  })

  it('inline', async () => {
    const $ = await fetchContent('type/inline')
    const $el = $('span')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Hello World')
  })

  it('unknown.block', async () => {
    const $ = await fetchContent('type/unknown-block')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.get(0)?.name).toBe('div')
    expect($el.attr('style')).toBe('display:none')
    expect($el.attr('data-portabletext-unknown')).toBe('type')
  })

  it('unknown.inline', async () => {
    const $ = await fetchContent('type/unknown-inline')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.get(0)?.name).toBe('span')
    expect($el.attr('style')).toBe('display:none')
    expect($el.attr('data-portabletext-unknown')).toBe('type')
  })
})
