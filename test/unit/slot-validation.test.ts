import {experimental_AstroContainer as AstroContainer} from 'astro/container'
import {afterEach, describe, expect, it, vi} from 'vitest'

import PortableText from '../../components/PortableText.astro'

const value = [
  {
    _type: 'block',
    style: 'normal',
    children: [{_type: 'span', text: "I'm a paragraph"}],
  },
]

/**
 * Renders `PortableText` with the given slots and returns everything written to
 * `console.warn`. The slot content is irrelevant - validation only reads the names.
 */
async function warningsFor(slots: Record<string, string>): Promise<string[]> {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const container = await AstroContainer.create()

  await container.renderToString(PortableText, {props: {value}, slots})

  return warn.mock.calls.map(([message]) => String(message))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('slot name validation', () => {
  // Inherited keys such as `toString` and `constructor` are guarded by
  // `isSlotName` (see internal.test.ts) but cannot be reached from a template -
  // Astro rejects them itself with a `ReservedSlotName` error.

  it('warns about a slot that does not target a node type', async () => {
    const warnings = await warningsFor({blocks: 'ignored'})

    expect(warnings).toContain(
      'PortableText slot "blocks" does not target a node type and will be ignored. ' +
        'Expected "type", "block", "list", "listItem", "mark", "text", "hardBreak", ' +
        'optionally scoped to a type, e.g. "block:h1"',
    )
  })

  it('warns that unslotted children are ignored', async () => {
    const warnings = await warningsFor({default: 'stray children'})

    expect(warnings).toContain(
      'PortableText was given children that are not assigned to a slot, so they will be ignored. ' +
        'Assign them to a node type, e.g. <fragment slot="block">',
    )
  })

  it.each(['block', 'block:h1', 'mark:strike-through', 'type:myCustomType', 'text'])(
    'stays quiet for "%s"',
    async (slotName) => {
      const warnings = await warningsFor({[slotName]: 'ignored'})

      expect(warnings.filter((message) => message.includes('PortableText slot'))).toEqual([])
    },
  )
})
