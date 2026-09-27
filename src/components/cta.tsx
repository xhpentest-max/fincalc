import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { CALCULATORS } from "@/lib/site-nav"
import type { HeroAction } from "@/components/hero"

import { Button } from "@/components/ui/button"

export type CtaProps = {
  heading?: string
  description?: string
  primary?: HeroAction
  secondary?: HeroAction
}

const DEFAULTS = {
  heading: "Run the numbers before you commit",
  description:
    "Both calculators are free to use, update as you type, and show the full schedule behind the headline number.",
  primary: { href: CALCULATORS[0].href, label: "Start with your mortgage" },
  secondary: { href: CALCULATORS[1].href, label: "Start with your savings" },
} satisfies Required<CtaProps>

export function Cta({
  heading = DEFAULTS.heading,
  description = DEFAULTS.description,
  primary = DEFAULTS.primary,
  secondary = DEFAULTS.secondary,
}: CtaProps) {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          {heading}
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">
          {description}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
