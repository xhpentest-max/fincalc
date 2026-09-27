import { ChartLine, Home, Table, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const features = [
  {
    icon: Home,
    title: "Mortgage repayments",
    description:
      "Set the loan, rate, and term to see the level payment, the total interest, and how much voluntary overpayments save you.",
    href: "#mortgage",
    action: "Try the mortgage calculator",
  },
  {
    icon: TrendingUp,
    title: "Compound interest",
    description:
      "Combine a starting balance with monthly contributions, pick a compounding frequency, and project where the balance lands.",
    href: "#compound-interest",
    action: "Try the compound calculator",
  },
  {
    icon: Table,
    title: "Year-by-year schedules",
    description:
      "Both calculators break the projection down annually, so you can see which years cost the most and when growth overtakes contributions.",
    href: "#mortgage",
    action: "See a schedule",
  },
  {
    icon: ChartLine,
    title: "Charts that explain themselves",
    description:
      "Every scenario is drawn as a stacked breakdown of what you pay and what you earn, with the same numbers in an inspectable table.",
    href: "#compound-interest",
    action: "See the charts",
  },
]

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Everything you need to see the real cost
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            No spreadsheets to build, no sign-up wall. Adjust a number and every
            figure below updates as you type.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="size-5 text-muted-foreground" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={feature.href}>
                    {feature.action}
                    <TrendingUp data-icon="inline-end" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
