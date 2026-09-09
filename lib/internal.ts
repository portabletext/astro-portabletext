import type {
  Component,
  ComponentOrRecord,
  NodeType,
  SomePortableTextComponents,
  TypedObject,
} from './types'

/**
 * Helper for component to throw an error
 * @param err
 */
export function throwError(err: Error | string): never {
  throw err
}

/**
 * Returns true if `it` is component
 */
export function isComponent(it: unknown): it is Component {
  return typeof it === 'function'
}

/**
 * Merges two {@link SomePortableTextComponents} objects, giving priority to overrides.
 *
 * This function combines two component objects used in Portable Text rendering.
 * If both objects have the same key, the value from `overrides` takes precedence.
 * This is useful for customizing the rendering of specific components while keeping
 * the default behavior for others.
 *
 * @typeParam Components - The type of the base components object.
 * @typeParam Overrides - The type of the overrides components object.
 *
 * @param components - The base components object.
 * @param overrides - The overrides components object.
 *
 * @returns A new object with the merged components.
 */
export function mergeComponents<
  Components extends SomePortableTextComponents,
  Overrides extends SomePortableTextComponents,
>(components: Components, overrides: Overrides) {
  const cmps = {...components} as Record<string, ComponentOrRecord>

  for (const [key, override] of Object.entries(overrides)) {
    const current = components[key as keyof typeof components]

    const value =
      !current || isComponent(override) || isComponent(current)
        ? override
        : {
            ...(current as Record<string, Component>),
            ...(override as Record<string, Component>),
          }

    cmps[key] = value
  }

  return cmps as {
    [Key in keyof (Components & Overrides)]: Key extends keyof (Overrides | Components)
      ? Overrides[Key] extends Component
        ? Overrides[Key]
        : Components[Key] extends Component
          ? Overrides[Key]
          : (Overrides & Components)[Key]
      : (Overrides & Components)[Key]
  }
}

/**
 * =====
 * Slots
 * =====
 */

/**
 * A node type that a `PortableText` slot can target. `text` and `hardBreak` have
 * no types of their own, so they round out the scopeable `NodeType`s.
 * @internal
 */
export type SlotNodeType = NodeType | 'text' | 'hardBreak'

/**
 * Node types that a `PortableText` slot can target, mapped to whether the slot
 * name can be scoped to a specific type, e.g. `block:h1`.
 * @internal
 *
 * @remarks
 * `satisfies` keeps this map exhaustive - adding a `NodeType` will not compile
 * until it is given an entry here.
 */
const slotNodeTypes = {
  type: true,
  block: true,
  list: true,
  listItem: true,
  mark: true,
  text: false,
  hardBreak: false,
} as const satisfies Record<SlotNodeType, boolean>

/**
 * The node types that a `PortableText` slot can target.
 * @internal
 */
export const slotNames: readonly SlotNodeType[] = Object.keys(slotNodeTypes) as SlotNodeType[]

/**
 * Builds the name of the slot that renders the given node type, optionally
 * scoped to a specific `type` such as a block style or a mark type.
 * @internal
 */
export function toSlotName(nodeType: string, type?: string): string {
  return type ? `${nodeType}:${type}` : nodeType
}

/**
 * Returns true if `slotName` targets a node type that is rendered by `PortableText`.
 * @internal
 *
 * @remarks
 * The scope of a scoped slot name, e.g. the `h1` of `block:h1`, cannot be verified
 * upfront as block styles, mark types and custom types are user defined.
 */
export function isSlotName(slotName: string): boolean {
  const separator = slotName.indexOf(':')

  // `Object.hasOwn` rather than `in`, so inherited keys such as `toString` and
  // `constructor` are not mistaken for node types.
  if (separator === -1) {
    return Object.hasOwn(slotNodeTypes, slotName)
  }

  const nodeType = slotName.slice(0, separator)
  const scope = slotName.slice(separator + 1)

  return (
    Object.hasOwn(slotNodeTypes, nodeType) &&
    slotNodeTypes[nodeType as SlotNodeType] &&
    scope.length > 0
  )
}

/**
 * ========================
 * Node Components Registry
 * ========================
 */

type ResolvedComponents = {
  Default: Component
  Unknown: Component
}

const nodeComponentsMap = new WeakMap<TypedObject, ResolvedComponents>()

/**
 * Binds the resolved components to a specific node object.
 * @internal
 *
 * @remarks
 * This uses the node's _object reference_ as the key. This enables the `Context` API via
 * `usePortableText` to look up which components were assigned to this specific node during rendering.
 *
 * @param node - The node object to be used as the key.
 * @param Default - The resolved default component for this node.
 * @param Unknown - The resolved fallback (unknown) component for this node.
 */
export function setNodeComponents(node: TypedObject, Default: Component, Unknown: Component): void {
  nodeComponentsMap.set(node, {Default, Unknown})
}

/**
 * Retrieves the components bound to a specific node object.
 * @internal
 *
 * @param node - The node object to look up (by reference).
 * @returns The component pair, or `undefined` if this exact node object was not registered.
 */
export function getNodeComponents(node: TypedObject): ResolvedComponents | undefined {
  return nodeComponentsMap.get(node)
}
