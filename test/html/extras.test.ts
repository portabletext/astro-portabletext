import {describe, expect, it} from 'vitest'

import {fetchContent} from '../fetch-content'

describe('extras', () => {
  it('hardbreak', async () => {
    const $ = await fetchContent('hardbreak')
    const $el = $('br')

    expect($el.length).toBe(1)
  })
})
