import {describe, expect, it} from 'vitest'

import {
  ignoredChildrenWarning,
  unknownBlockWarning,
  unknownListItemWarning,
  unknownListWarning,
  unknownMarkWarning,
  unknownSlotWarning,
  unknownTypeWarning,
} from '../../lib/warnings'

describe('warnings', () => {
  it('unknownTypeWarning', () => {
    expect(unknownTypeWarning('custom')).toBe('PortableText [components.type] is missing "custom"')
  })

  it('unknownMarkWarning', () => {
    expect(unknownMarkWarning('em')).toBe('PortableText [components.mark] is missing "em"')
  })

  it('unknownListWarning', () => {
    expect(unknownListWarning('bullet')).toBe('PortableText [components.list] is missing "bullet"')
  })

  it('unknownListItemWarning', () => {
    expect(unknownListItemWarning('bullet')).toBe(
      'PortableText [components.listItem] is missing "bullet"',
    )
  })

  it('unknownBlockWarning', () => {
    expect(unknownBlockWarning('normal')).toBe(
      'PortableText [components.block] is missing "normal"',
    )
  })

  it('unknownSlotWarning', () => {
    expect(unknownSlotWarning('blocks')).toBe(
      'PortableText slot "blocks" does not target a node type and will be ignored. ' +
        'Expected "type", "block", "list", "listItem", "mark", "text", "hardBreak", ' +
        'optionally scoped to a type, e.g. "block:h1"',
    )
  })

  it('ignoredChildrenWarning', () => {
    expect(ignoredChildrenWarning()).toBe(
      'PortableText was given children that are not assigned to a slot, so they will be ignored. ' +
        'Assign them to a node type, e.g. <fragment slot="block">',
    )
  })
})
