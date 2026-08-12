import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('mark', () => {
  it('code', async () => {
    const $ = await fetchContent('mark/code')
    const $el = $('code')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('function test() {}')
  })

  it('em', async () => {
    const $ = await fetchContent('mark/em')
    const $el = $('em')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('emphasize')
  })

  it('link', async () => {
    const $ = await fetchContent('mark/link')
    const $el = $('a')

    expect($el.length).toBe(1)
    expect($el.attr('href')).toBe('https://test.com/')
    expect($el.text()).toBe('test.com')
  })

  it('link_missing_href', async () => {
    const $ = await fetchContent('mark/link-missing-href')
    const $el = $('a')

    expect($el.length).toBe(1)
    expect($el.attr('href')).toBe(undefined)
    expect($el.text()).toBe('test.com')
  })

  it('strike-through', async () => {
    const $ = await fetchContent('mark/strike-through')
    const $el = $('del')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('deleted')
  })

  it('strong', async () => {
    const $ = await fetchContent('mark/strong')
    const $el = $('strong')

    expect($el.length).toBe(1)
    expect($el.text()).toBe('bold')
  })

  it('underline', async () => {
    const $ = await fetchContent('mark/underline')
    const $el = $('span')

    expect($el.length).toBe(1)
    expect($el.attr('style')).toBe('text-decoration: underline;')
  })

  it('unknown', async () => {
    const $ = await fetchContent('mark/unknown')
    const $el = $('[data-portabletext-unknown]')

    expect($el.length).toBe(1)
    expect($el.attr('data-portabletext-unknown')).toBe('mark')
    expect($el.text()).toBe('highlighted')
    expect($el[0]?.name).toBe('span')
  })
})
