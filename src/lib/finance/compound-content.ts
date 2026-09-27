import type { ExplainerTerm } from "@/components/finance/calculator-explainer"
import type { FaqItem } from "@/components/finance/calculator-faq"

/**
 * Copy for the compound interest page. The formula and term definitions
 * mirror `calculateCompoundInterest` in `@/lib/finance/compound`.
 */
export const compoundExplainer = {
  heading: "How compound interest is calculated",
  description:
    "Interest is added to the balance, and then the new balance earns interest too. That is the whole idea — and it is why you end up with more than you put in.",
  formula: "FV = P₀ × (1 + r)ⁿ + C × ((1 + r)ⁿ − 1) ÷ r",
  formulaCaption:
    "The future value of a starting balance P₀ plus a stream of regular contributions C, compounding at r over n periods.",
  terms: [
    {
      term: "Initial deposit (P₀)",
      definition:
        "The lump sum you start with. It earns interest from the very first period onwards.",
    },
    {
      term: "Expected return (r)",
      definition:
        "Your annual return divided by the compounding frequency, so the daily setting charges a daily rate rather than a monthly one.",
    },
    {
      term: "Time horizon (n)",
      definition:
        "How many years the money stays invested. Growth is exponential, so the same monthly contribution buys far more over 30 years than over 10.",
    },
    {
      term: "Monthly contribution (C)",
      definition:
        "Added at the end of each period, which makes it an ordinary annuity — the money starts compounding from the following period rather than immediately.",
    },
    {
      term: "Compounding frequency",
      definition:
        "How often interest is added to the balance. For a given annual return, more frequent compounding earns slightly more.",
    },
    {
      term: "Inflation",
      definition:
        "Used to restate the final balance in today's money, so you can weigh the projection against what you actually paid in.",
    },
  ] satisfies ExplainerTerm[],
}

export const compoundFaq = {
  heading: "Compound interest questions",
  description:
    "What drives the growth, how to read a projection, and where the numbers stop being reliable.",
  items: [
    {
      question: "What is compound interest?",
      answer:
        "Interest paid on your balance plus the interest it has already earned. Simple interest only ever pays on the original amount, while compounding pays on a growing total — which is why the curve steepens the longer you stay invested.",
    },
    {
      question: "How much do my contributions actually matter?",
      answer:
        "More than most people expect. Each contribution earns interest for every period that remains, so money added early does far more work than money added late. The year-by-year table separates the balance into what you paid in and what the growth contributed, so you can see the crossover point.",
    },
    {
      question: "Should I choose daily or monthly compounding?",
      answer:
        "For the same nominal annual return, more frequent compounding earns slightly more. The gap is usually small, so pick whichever option matches your actual account rather than chasing the largest headline number.",
    },
    {
      question: "What does “in today’s money” mean?",
      answer:
        "It deflates the final balance by the inflation rate you set, showing what the projected amount is worth in today's purchasing power. It is a reality check against a number that can look larger than it feels.",
    },
    {
      question: "Are these projections guaranteed?",
      answer:
        "No. Real returns move around from year to year, and this assumes a constant rate with no fees, taxes, or inflation surprises. Treat it as a way to compare scenarios against each other, not as a prediction. Estimates only — confirm details with a provider or adviser.",
    },
  ] satisfies FaqItem[],
}
