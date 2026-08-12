import {describe, expect, it} from 'vitest'

import {
  unknownBlockWarning,
  unknownListItemWarning,
  unknownListWarning,
  unknownMarkWarning,
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
})
