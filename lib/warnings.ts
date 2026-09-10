import {slotNames} from './internal'
import type {NodeType} from './types'

const getTemplate = (prop: string, type: string): string =>
  `PortableText [components.${prop}] is missing "${type}"`

export const unknownTypeWarning = (type: string): string => getTemplate('type', type)

export const unknownMarkWarning = (markType: string): string => getTemplate('mark', markType)

export const unknownBlockWarning = (style: string): string => getTemplate('block', style)

export const unknownListWarning = (listItem: string): string => getTemplate('list', listItem)

export const unknownListItemWarning = (listStyle: string): string =>
  getTemplate('listItem', listStyle)

export const unknownSlotWarning = (slotName: string): string =>
  `PortableText slot "${slotName}" does not target a node type and will be ignored. ` +
  `Expected ${slotNames.map((it) => `"${it}"`).join(', ')}, ` +
  `optionally scoped to a type, e.g. "block:h1"`

export const ignoredChildrenWarning = (): string =>
  'PortableText was given children that are not assigned to a slot, so they will be ignored. ' +
  'Assign them to a node type, e.g. <fragment slot="block">'

export const getWarningMessage = (nodeType: NodeType, type: string) => {
  const fncs = {
    block: unknownBlockWarning,
    list: unknownListWarning,
    listItem: unknownListItemWarning,
    mark: unknownMarkWarning,
    type: unknownTypeWarning,
  }

  return fncs[nodeType](type)
}

export function printWarning(message: string): void {
  // oxlint-disable-next-line no-console
  console.warn(message)
}
