import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('block', () => {
  it('with style `h1`', async () => {
    const $ = await fetchContent('block/h1')
    const $el = $('h1')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L1')
  })

  it('with style `h2`', async () => {
    const $ = await fetchContent('block/h2')
    const $el = $('h2')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L2')
  })

  it('with style `h3`', async () => {
    const $ = await fetchContent('block/h3')
    const $el = $('h3')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L3')
  })

  it('with style `h4`', async () => {
    const $ = await fetchContent('block/h4')
    const $el = $('h4')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L4')
  })

  it('with style `h5`', async () => {
    const $ = await fetchContent('block/h5')
    const $el = $('h5')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L5')
  })

  it('with style `h6`', async () => {
    const $ = await fetchContent('block/h6')
    const $el = $('h6')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('Heading L6')
  })

  it('custom-handler', async () => {
    const $ = await fetchContent('block/custom-handler')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.attr('data-portabletext-unknown')).toBe('block')
  })

  it('default-handler', async () => {
    const $ = await fetchContent('block/default-handler')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.attr('data-portabletext-unknown')).toBe('block')
  })

  it('with style `blockquote`', async () => {
    const $ = await fetchContent('block/blockquote')
    const $el = $('blockquote')
    const $el2 = $el.children('p')

    expect($el.length).toBe(1)
    expect($el.children().length).toBe(1)
    expect($el2.length).toBe(1)
    expect($el2.text()).toBe('Quote')
  })

  it('with style `normal`', async () => {
    const $ = await fetchContent('block/normal')
    const $el = $('p')

    expect($el.length).toBe(1)
    expect($el.text()).toBe("I'm a paragraph")
  })

  it('missing style', async () => {
    const $ = await fetchContent('block/missing-style')
    const $el = $('p')

    expect($el.length).toBe(1)
    expect($el.text()).toBe("I'm a paragraph")
  })

  it('with style', async () => {
    const $ = await fetchContent('block/with-style')
    const el = $('p').get(0)

    expect(el).toBeTruthy()
    expect(el?.attribs.class?.indexOf('astro-')).toBeFalsy()
  })

  it('unknown', async () => {
    const $ = await fetchContent('block/unknown')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.attr('data-portabletext-unknown')).toBe('block')
    expect($el[0]?.name).toBe('p')
  })

  it('override', async () => {
    const $ = await fetchContent('block/override')
    const $el = $('[data-myh1-cmp]')

    expect($el.length).toBe(1)
  })

  it('merge', async () => {
    const $ = await fetchContent('block/merge')
    const $el = $('[data-grid-cmp]')

    expect($el.length).toBe(1)
  })

  it('block index', async () => {
    const $ = await fetchContent('block/block-index')
    const $el = $('[data-block-index]')

    expect($el.length).toBe(3)
    expect($el.eq(0).attr('data-block-index')).toBe('0')
    expect($el.eq(1).attr('data-block-index')).toBe('1')
    expect($el.eq(2).attr('data-block-index')).toBe('2')
  })
})
