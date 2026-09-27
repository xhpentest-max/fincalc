export type NavLink = {
  href: string
  label: string
}

/**
 * The single source of truth for calculator routes. The header and footer both
 * render from this, so a new calculator only has to be added here.
 */
export const CALCULATORS: NavLink[] = [
  { href: "/mortgage-repayments-calculator", label: "Mortgage" },
  { href: "/compound-interest-calculator", label: "Compound interest" },
]

/** The `#features` section only exists on the homepage, so link across to it. */
export const FEATURES_LINK: NavLink = { href: "/#features", label: "Features" }
