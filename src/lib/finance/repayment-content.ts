import type { ExplainerTerm } from "@/components/finance/calculator-explainer"
import type { FaqItem } from "@/components/finance/calculator-faq"

/**
 * Copy for the mortgage repayments page. The formula and term definitions
 * mirror `calculateMortgage` in `@/lib/finance/mortgage`.
 */
export const repaymentExplainer = {
  heading: "How the repayment is calculated",
  description:
    "Every figure on this page comes from one formula, applied once per payment period against the outstanding balance.",
  formula: "P = L × r ÷ (1 − (1 + r)⁻ⁿ)",
  formulaCaption:
    "The level payment that clears a loan of L after n payment periods at a periodic rate of r.",
  terms: [
    {
      term: "Loan amount (L)",
      definition:
        "The amount you borrow, used as the opening balance. It is the loan, not the value of the property.",
    },
    {
      term: "Interest rate (r)",
      definition:
        "Your annual rate divided by the number of payments per year — a monthly schedule charges interest at the monthly rate, not the annual one.",
    },
    {
      term: "Term (n)",
      definition:
        "Years multiplied by payments per year. A 30-year loan repaid monthly is 360 periods, repaid weekly it is 1,560.",
    },
    {
      term: "Repayment frequency",
      definition:
        "Weekly, fortnightly, or monthly. Paying more often means less interest builds up between payments, which lowers the total cost over the same term.",
    },
    {
      term: "Extra repayment",
      definition:
        "Added on top of the level payment and applied straight to principal, which is what shortens the loan and cuts the total interest.",
    },
    {
      term: "Level payment",
      definition:
        "Held constant for the whole term, so each payment covers a larger share of principal as the balance falls. The split changes; the amount does not.",
    },
  ] satisfies ExplainerTerm[],
}

export const repaymentFaq = {
  heading: "Mortgage repayment questions",
  description:
    "How level payments work, why overpayments help, and what these figures leave out.",
  items: [
    {
      question: "How is my monthly mortgage repayment calculated?",
      answer:
        "The calculator applies the standard level-payment formula: the loan amount multiplied by the periodic interest rate, divided by one minus that rate's discount factor over the number of periods. The result is a payment that stays the same for the whole term, so early payments are mostly interest and later ones are mostly principal.",
    },
    {
      question: "Why does my payment stay the same while the balance falls?",
      answer:
        "A level payment is fixed by design. Interest is charged on the outstanding balance, so as that balance falls the interest portion shrinks and the same total payment covers more principal. The split between the two changes every period; the amount you hand over does not.",
    },
    {
      question: "Do weekly or fortnightly repayments save money?",
      answer:
        "On an otherwise identical loan, yes. Repaying 26 times a year instead of 12 means less interest accrues between payments, so the total cost over the term is lower. The trade-off is that each individual payment is smaller, and the amount you pay across a year is usually similar either way.",
    },
    {
      question: "What do overpayments actually do?",
      answer:
        "Any amount above the level payment is applied directly to the principal instead of being held in advance. That reduces the balance sooner, so the loan clears earlier and the total interest falls. The calculator quantifies the saving and shows the term it shortens the loan by.",
    },
    {
      question: "Is this guaranteed, and does it include fees?",
      answer:
        "This is an estimate of interest and principal only. It excludes arrangement and lender fees, insurance, taxes, and any early-repayment charges, and it assumes the rate stays fixed for the entire term. Confirm the real figure with a lender or broker before you commit.",
    },
  ] satisfies FaqItem[],
}
