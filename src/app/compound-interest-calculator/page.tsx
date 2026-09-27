import { ChartLine, PiggyBank, Table, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

import { CalculatorPage } from "@/components/calculator-page"
import { CalculatorExplainer } from "@/components/finance/calculator-explainer"
import { CalculatorFaq } from "@/components/finance/calculator-faq"
import { CompoundCalculator } from "@/components/finance/compound-calculator"
import { CALCULATORS } from "@/lib/site-nav"
import { compoundExplainer, compoundFaq } from "@/lib/finance/compound-content"

export const metadata: Metadata = {
  title: "Compound Interest Calculator",
  description:
    "Project how a lump sum plus regular contributions grows over time. Pick your compounding frequency, adjust for inflation, and see the year-by-year split between what you paid in and what growth earned.",
  alternates: { canonical: CALCULATORS[1].href },
}

export default function CompoundInterestCalculatorPage() {
  return (
    <CalculatorPage
      hero={{
        eyebrow: "Free · No sign-up required",
        title: "Compound interest calculator",
        description:
          "Combine a starting balance with regular contributions, choose a compounding frequency, and see exactly how much of the final balance is growth rather than your own money.",
        primary: { href: "#calculator", label: "Project compound growth" },
        secondary: {
          href: CALCULATORS[0].href,
          label: "Calculate repayments",
        },
        highlights: [
          "Lump sum plus contributions",
          "Five compounding frequencies",
          "Inflation-adjusted returns",
        ],
      }}
      calculator={{
        id: "calculator",
        eyebrow: "Compound interest calculator",
        heading: "What your money could grow into",
        description:
          "Interest earns interest. This shows how much of the final balance is growth rather than the money you put in.",
      }}
      calculatorSlot={<CompoundCalculator />}
      content={
        <>
          <CalculatorExplainer {...compoundExplainer} />
          <CalculatorFaq {...compoundFaq} />
        </>
      }
      features={{
        heading: "Everything the growth projection shows you",
        description:
          "No spreadsheets to build, no sign-up wall. Adjust a number and every figure on this page updates as you type.",
        items: [
          {
            icon: TrendingUp,
            title: "Projected value and growth multiple",
            description:
              "See the final balance, the total interest earned, and the final value per dollar you contributed.",
            href: "#calculator",
            action: "Run the numbers",
          },
          {
            icon: PiggyBank,
            title: "Lump sum plus contributions",
            description:
              "Start with a deposit and add a monthly contribution. See how much earlier money does more work than money added late.",
            href: "#calculator",
            action: "Try a contribution",
          },
          {
            icon: ChartLine,
            title: "Today's money, not just headline",
            description:
              "Restate the projection in today's purchasing power using an inflation assumption, and see whether the growth was real.",
            href: "#calculator",
            action: "Adjust for inflation",
          },
          {
            icon: Table,
            title: "Year-by-year schedule",
            description:
              "Contributed, interest, and balance for every year, with the same numbers available in a chart or a table.",
            href: "#calculator",
            action: "See the schedule",
          },
        ],
      }}
      cta={{
        heading: "Project the balance before you commit",
        description:
          "Start with what you could set aside today, then compare the projection against a mortgage repayment on the other side.",
        primary: { href: "#calculator", label: "Start with your savings" },
        secondary: {
          href: CALCULATORS[0].href,
          label: "Start with your mortgage",
        },
      }}
    />
  )
}
