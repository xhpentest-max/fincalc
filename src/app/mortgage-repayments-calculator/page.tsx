import { CalendarClock, Home, PiggyBank, Table } from "lucide-react"
import type { Metadata } from "next"

import { CalculatorPage } from "@/components/calculator-page"
import { MortgageCalculator } from "@/components/finance/mortgage-calculator"
import { CalculatorExplainer } from "@/components/finance/calculator-explainer"
import { CalculatorFaq } from "@/components/finance/calculator-faq"
import { CALCULATORS } from "@/lib/site-nav"
import {
  repaymentExplainer,
  repaymentFaq,
} from "@/lib/finance/repayment-content"

export const metadata: Metadata = {
  title: "Mortgage Repayments Calculator",
  description:
    "Work out your level mortgage repayment, the total interest over the life of the loan, and what voluntary overpayments save you. Weekly, fortnightly, or monthly, with a full year-by-year schedule.",
  alternates: { canonical: CALCULATORS[0].href },
}

export default function MortgageRepaymentsCalculatorPage() {
  return (
    <CalculatorPage
      hero={{
        eyebrow: "Free · No sign-up required",
        title: "Mortgage repayments calculator",
        description:
          "Set the amount, rate, and term to see the level payment, the total interest, and how much overpayments save you — with the full year-by-year schedule underneath.",
        primary: { href: "#calculator", label: "Calculate repayments" },
        secondary: {
          href: CALCULATORS[1].href,
          label: "Project compound growth",
        },
        highlights: [
          "Level payments and overpayments",
          "Weekly, fortnightly, or monthly",
          "Year-by-year amortisation",
        ],
      }}
      calculator={{
        id: "calculator",
        eyebrow: "Mortgage calculator",
        heading: "What a mortgage really costs you",
        description:
          "Every payment is broken into interest and principal, so you can see exactly how much of each one goes towards the balance.",
      }}
      calculatorSlot={<MortgageCalculator />}
      content={
        <>
          <CalculatorExplainer {...repaymentExplainer} />
          <CalculatorFaq {...repaymentFaq} />
        </>
      }
      features={{
        heading: "Everything the repayment schedule shows you",
        description:
          "No spreadsheets to build, no sign-up wall. Adjust a number and every figure on this page updates as you type.",
        items: [
          {
            icon: Home,
            title: "Level payment and total interest",
            description:
              "The payment stays the same for the whole term. See the running total of interest, and the share of everything you repay that it represents.",
            href: "#calculator",
            action: "Run the numbers",
          },
          {
            icon: PiggyBank,
            title: "What overpayments save",
            description:
              "Add a voluntary amount to each payment and watch the interest saved, the shortened term, and the new payoff date side by side.",
            href: "#calculator",
            action: "Try an overpayment",
          },
          {
            icon: CalendarClock,
            title: "Weekly or fortnightly",
            description:
              "Switch the repayment frequency and compare what the same loan costs when you pay 52, 26, or 12 times a year.",
            href: "#calculator",
            action: "Change frequency",
          },
          {
            icon: Table,
            title: "Year-by-year schedule",
            description:
              "Principal, interest, overpayments and remaining balance for every year, with totals underneath you can check by hand.",
            href: "#calculator",
            action: "See the schedule",
          },
        ],
      }}
      cta={{
        heading: "Run the numbers before you commit",
        description:
          "Adjust the amount, rate, and term to match the loan you have been quoted, then take the schedule to a lender or broker.",
        primary: { href: "#calculator", label: "Start with your mortgage" },
        secondary: {
          href: CALCULATORS[1].href,
          label: "Start with your savings",
        },
      }}
    />
  )
}
