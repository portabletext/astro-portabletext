// `.astro` modules are typed by the Astro language server, not by `tsc`, so give
// the type-aware lint enough to resolve components imported into tests.
declare module '*.astro' {
  const component: import('astro/runtime/server/index.js').AstroComponentFactory
  export default component
}
