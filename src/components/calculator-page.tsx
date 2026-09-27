import * as React from "react"

import { Cta, type CtaProps } from "@/components/cta"
import { Features, type FeaturesProps } from "@/components/features"
import { Hero, type HeroProps } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export type CalculatorPageProps = {
  hero: HeroProps
  calculator: {
    /** Anchor id so the hero's primary call to action can target it. */
    id: string
    eyebrow: string
    heading: string
    description: string
  }
  /** The `*Calculator` card itself. */
  calculatorSlot: React.ReactNode
  /** Explainers and FAQ, rendered between the calculator and the features. */
  content?: React.ReactNode
  features: FeaturesProps
  cta: CtaProps
}

/**
 * The shared page frame for every dedicated calculator route. Both calculator
 * pages render through here, so their section order, spacing and heading
 * treatment cannot drift apart. Page-level `metadata` is intentionally *not*
 * part of this — it has to stay a `metadata` export in each page module.
 */
export function CalculatorPage({
  hero,
  calculator,
  calculatorSlot,
  content,
  features,
  cta,
}: CalculatorPageProps) {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero {...hero} />

        <section id={calculator.id} className="scroll-mt-20 border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
            <div className="flex max-w-2xl flex-col gap-3">
              <Badge variant="secondary" className="w-fit">
                {calculator.eyebrow}
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                {calculator.heading}
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                {calculator.description}
              </p>
            </div>

            {calculatorSlot}
          </div>
        </section>

        {content}

        <Features {...features} />

        <Cta {...cta} />
      </main>

      <SiteFooter />
    </>
  )
}
