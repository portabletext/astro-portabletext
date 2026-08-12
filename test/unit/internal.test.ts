import {describe, expect, it} from 'vitest'

import {throwError} from '../../lib/internal'

describe('throwError', () => {
  it('throws the given error', () => {
    expect(() => throwError('test')).toThrow('test')
  })
})
