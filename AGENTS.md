# AGENTS.md

## Next App Router typing rule

- In `src/app/**/layout.tsx` and `src/app/**/page.tsx`, default exports must use the generated Next.js route prop types: `LayoutProps<'/route'>` for layouts and `PageProps<'/route'>` for pages, with the literal route path (including dynamic segments like `'/[locale]'`) as the generic argument. Prefer these over handwritten `Props` interfaces, and keep the route prop type on the signature even when `params` is unused.
- Do NOT destructure in the parameter list. Keep `function Foo(props: LayoutProps<'/route'>)` and destructure on the first line of the function body, e.g. `const { children, params } = props`. This also applies to `generateMetadata`, `generateViewport`, and any other Next.js route helper that receives route props.
- When the function body does not use props, name the parameter `_props` (e.g. `function Foo(_props: PageProps<'/route'>)`) so the unused-vars lint rule stays quiet without dropping the route prop type.
