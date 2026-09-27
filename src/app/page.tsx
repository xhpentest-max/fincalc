import { CompoundCalculator } from "@/components/finance/compound-calculator"
import { MortgageCalculator } from "@/components/finance/mortgage-calculator"
import { Cta } from "@/components/cta"
import { Features } from "@/components/features"
import { Hero } from "@/components/hero"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Features />

        <section id="mortgage" className="scroll-mt-20 border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
            <div className="flex max-w-2xl flex-col gap-3">
              <Badge variant="secondary" className="w-fit">
                Mortgage calculator
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                What a mortgage really costs you
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Set the amount, rate, and term to see the level payment, the
                total interest, and how much overpayments save you — with the
                full year-by-year schedule underneath.
              </p>
            </div>

            <MortgageCalculator />
          </div>
        </section>

        <section id="compound-interest" className="scroll-mt-20 border-t">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
            <div className="flex max-w-2xl flex-col gap-3">
              <Badge variant="secondary" className="w-fit">
                Compound interest calculator
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight text-balance">
                What your money could grow into
              </h2>
              <p className="text-lg text-muted-foreground text-balance">
                Combine a starting balance with regular contributions, choose a
                compounding frequency, and see exactly how much of the final
                balance is growth rather than your own money.
              </p>
            </div>

            <CompoundCalculator />
          </div>
        </section>

        <Cta />
      </main>

      <SiteFooter />
    </>
  )
}
