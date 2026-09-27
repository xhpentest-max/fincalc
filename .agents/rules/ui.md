# UI Rules

## Core Rule

All UI in this app is built from **shadcn/ui components**. Do not create custom
components or hand-rolled markup for anything the registry provides.

- Never hand-write a styled `div`/`span` when a shadcn component exists
  (use `Alert`, `Empty`, `Badge`, `Separator`, `Skeleton`, `Card`, …).
- Styling is done with the component's own variants (`variant`, `size`) and
  `className` for **layout only** — never to override component colors or
  typography.
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`), never raw
  values like `bg-blue-500`.
- Layout uses `flex`/`grid` with `gap-*` (no `space-x-*`/`space-y-*`), and
  `size-*` when width and height match.

## When a Component Is Missing

1. Check what is already installed: `npx shadcn@latest info` (or list the
   `ui` directory from `resolvedPaths.ui` in that output).
2. If nothing fits, **search the shadcn registry** — do not build it yourself:
   ```bash
   npx shadcn@latest search @shadcn -q "<component>"
   npx shadcn@latest docs <component>     # docs + example URLs, read these
   npx shadcn@latest add <component>
   ```
3. Read the added files and verify imports, sub-components, and composition.
   Replace icon imports with the project's `iconLibrary`.
4. If shadcn is not yet configured in this repo (no `components.json`), run
   `npx shadcn@latest init` first.

Only write a custom component after confirming the registry has no
suitable item, and say so explicitly.

## Composing

- Compose primitives into a page; do not fork them. Settings page =
  `Tabs` + `Card` + form controls. Dashboard = `Sidebar` + `Card` + `Chart` + `Table`.
- Forms use `FieldGroup` + `Field` (validation via `data-invalid` on `Field`
  and `aria-invalid` on the control). Option sets of 2–7 use `ToggleGroup`.
- Items always sit inside their Group (`SelectItem` → `SelectGroup`,
  `DropdownMenuItem` → `DropdownMenuGroup`).
- `Dialog`, `Sheet`, and `Drawer` always need a `Title` (use `sr-only` if it
  must be hidden).
- Use `asChild` (radix) or `render` (base) for custom triggers — check the
  `base` field from `npx shadcn@latest info`.
- Icons in `Button` use `data-icon="inline-start|inline-end"`, with no sizing
  classes.

## Reference

Load the `shadcn` skill (`.agents/skills/shadcn`) for the full critical
rules — styling, forms, composition, icons — before writing UI code.
