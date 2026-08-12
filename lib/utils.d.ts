declare module "@portabletext/astro/utils" {
  /**
   * @deprecated Use `toPlainText` from `@portabletext/astro` instead
   */
  export function toPlainText(
    ...args: Parameters<typeof import("@portabletext/toolkit").toPlainText>
  ): ReturnType<typeof import("@portabletext/toolkit").toPlainText>;
  /**
   * @deprecated Use `spanToPlainText` from `@portabletext/astro` instead
   */
  export function spanToPlainText(
    ...args: Parameters<typeof import("@portabletext/toolkit").spanToPlainText>
  ): ReturnType<typeof import("@portabletext/toolkit").spanToPlainText>;
  /**
   * @deprecated Use `mergeComponents` from `@portabletext/astro` instead
   */
  export function mergeComponents(
    ...args: Parameters<typeof import("./utils").mergeComponents>
  ): ReturnType<typeof import("./utils").mergeComponents>;
  /**
   * @deprecated Use `usePortableText` from `@portabletext/astro` instead
   */
  export function usePortableText(
    ...args: Parameters<typeof import("./utils").usePortableText>
  ): ReturnType<typeof import("./utils").usePortableText>;
}
