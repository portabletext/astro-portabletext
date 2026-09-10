import {describe, expect, it} from 'vitest'

import {isSlotName, slotNames, throwError, toSlotName} from '../../lib/internal'

describe('throwError', () => {
  it('throws the given error', () => {
    expect(() => throwError('test')).toThrow('test')
  })
})

describe('slotNames', () => {
  it('lists every node type that can be targeted by a slot', () => {
    expect(slotNames).toEqual(['type', 'block', 'list', 'listItem', 'mark', 'text', 'hardBreak'])
  })
})

describe('toSlotName', () => {
  it('returns the node type when no scope is given', () => {
    expect(toSlotName('block')).toBe('block')
  })

  it('scopes the node type to a type', () => {
    expect(toSlotName('block', 'h1')).toBe('block:h1')
    expect(toSlotName('mark', 'strike-through')).toBe('mark:strike-through')
  })
})

describe('isSlotName', () => {
  it.each(slotNames)('accepts the "%s" node type', (slotName) => {
    expect(isSlotName(slotName)).toBe(true)
  })

  it.each(['type:custom', 'block:h1', 'list:bullet', 'listItem:number', 'mark:strike-through'])(
    'accepts "%s"',
    (slotName) => {
      expect(isSlotName(slotName)).toBe(true)
    },
  )

  it.each(['default', '', 'blocks', 'listitem', 'Block', 'unknownBlock'])(
    'rejects "%s"',
    (slotName) => {
      expect(isSlotName(slotName)).toBe(false)
    },
  )

  it('rejects a scope on a node type that has no types of its own', () => {
    expect(isSlotName('text:foo')).toBe(false)
    expect(isSlotName('hardBreak:foo')).toBe(false)
  })

  it('rejects an empty scope', () => {
    expect(isSlotName('block:')).toBe(false)
  })

  it.each(['toString', 'constructor', 'valueOf', 'hasOwnProperty', '__proto__'])(
    'rejects the inherited "%s" key',
    (slotName) => {
      expect(isSlotName(slotName)).toBe(false)
    },
  )

  it.each(['constructor:foo', 'toString:foo', '__proto__:foo'])(
    'rejects "%s", scoped off an inherited key',
    (slotName) => {
      expect(isSlotName(slotName)).toBe(false)
    },
  )

  it('accepts a scope containing a colon', () => {
    expect(isSlotName('type:foo:bar')).toBe(true)
    expect(toSlotName('type', 'foo:bar')).toBe('type:foo:bar')
  })
})
