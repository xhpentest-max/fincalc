import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

import { CALCULATORS } from "@/lib/site-nav"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export type HeroAction = {
  href: string
  label: string
}

export type HeroProps = {
  eyebrow?: string
  title?: string
  description?: string
  primary?: HeroAction
  secondary?: HeroAction
  highlights?: string[]
}

const DEFAULTS = {
  eyebrow: "Free · No sign-up required",
  title: "Know what you'll repay, and what your money can grow into.",
  description:
    "Two calculators that show the real numbers — a mortgage repayment schedule down to the last dollar, and a compound interest projection that accounts for contributions and inflation.",
  primary: { href: CALCULATORS[0].href, label: "Calculate repayments" },
  secondary: {
    href: CALCULATORS[1].href,
    label: "Project compound growth",
  },
  highlights: [
    "Level payments and overpayments",
    "Year-by-year amortisation",
    "Inflation-adjusted returns",
  ],
} satisfies Required<HeroProps>

export function Hero({
  eyebrow = DEFAULTS.eyebrow,
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  primary = DEFAULTS.primary,
  secondary = DEFAULTS.secondary,
  highlights = DEFAULTS.highlights,
}: HeroProps) {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
      <Badge variant="secondary">
        <Sparkles data-icon="inline-start" />
        {eyebrow}
      </Badge>

      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        {title}
      </h1>

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

      <ul className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {highlights.map((item) => (
          <li key={item}>
            <Badge variant="outline">
              <Zap data-icon="inline-start" />
              {item}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}
