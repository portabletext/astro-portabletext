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

  describe('link with unsafe href', () => {
    const unsafe = [
      'javascript:alert(1)',
      'JAVASCRIPT:alert(1)',
      'JaVaScRiPt:alert(1)',
      '  javascript:alert(1)',
      '\tjavascript:alert(1)\n',
      'java\nscript:alert(1)',
      'java\tscript:alert(1)',
      '%6Aavascript:alert(1)',
      'data:text/html,<script>alert(1)</script>',
      'vbscript:msgbox(1)',
    ]
    const safe = [
      'https://test.com/',
      'HTTPS://test.com/',
      'http://test.com/',
      'mailto:test@test.com',
      'tel:+123456789',
      '/relative/path',
      'relative/path',
      '../relative/path',
      '#fragment',
      '/search?q=javascript:alert(1)',
      'page#javascript:alert(1)',
      '&#106;avascript:alert(1)',
    ]

    it.each(unsafe.map((href, i) => [href, i] as const))(
      'renders %j as plain text',
      async (_href, i) => {
        const $ = await fetchContent('mark/link-unsafe')
        const $block = $('p').eq(i)

        expect($block.find('a').length).toBe(0)
        expect($block.text()).toBe(`link-${i}`)
      },
    )

    it.each(safe.map((href, i) => [href, i + unsafe.length] as const))(
      'keeps %j as a link',
      async (href, i) => {
        const $ = await fetchContent('mark/link-unsafe')
        const $a = $('p').eq(i).find('a')

        expect($a.length).toBe(1)
        expect($a.attr('href')).toBe(href)
        expect($a.text()).toBe(`link-${i}`)
      },
    )

    it('never emits a javascript: href', async () => {
      const $ = await fetchContent('mark/link-unsafe')

      $('a').each((_, el) => {
        expect($(el).attr('href')?.trim().toLowerCase()).not.toMatch(/^javascript:/)
      })
    })
  })

  it('link with a non-string href renders without an href', async () => {
    const $ = await fetchContent('mark/link-non-string-href')

    expect($('p').length).toBe(4)
    expect($('a[href]').length).toBe(0)
    $('p').each((i, el) => {
      expect($(el).text()).toBe(`link-${i}`)
    })
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
