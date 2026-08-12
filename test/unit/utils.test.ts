import {describe, expect, it} from 'vitest'

import {mergeComponents} from '../../lib/internal'

describe('mergeComponents', () => {
  it('should merge components', () => {
    const a = {
      block: {
        h1: () => null,
        h2: () => null,
      },
    }

    const b = {
      block: {
        h2: () => null,
      },
    }

    const c = mergeComponents(a, b)

    expect(c).toEqual({block: {h1: a.block.h1, h2: b.block.h2}})
  })

  it('`block` should be a function', () => {
    const a = {
      block: {
        h1: () => null,
        h2: () => null,
      },
    }

    const b = {
      block: () => null,
    }

    const c = mergeComponents(a, b)

    expect(c).toEqual({block: b.block})
  })

  it('`block` should be a plain object', () => {
    const a = {
      block: () => null,
    }

    const b = {
      block: {
        h1: () => null,
        h2: () => null,
      },
    }

    const c = mergeComponents(a, b)

    expect(c).toEqual({block: {h1: b.block.h1, h2: b.block.h2}})
  })

  it('should extend components', () => {
    const a = {
      block: () => null,
      mark: () => null,
    }

    const b = {
      type: () => null,
    }

    const c = mergeComponents(a, b)

    expect(c).toEqual({block: a.block, mark: a.mark, type: b.type})
  })
})
