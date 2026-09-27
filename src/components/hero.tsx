import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const highlights = [
  "Level payments and overpayments",
  "Year-by-year amortisation",
  "Inflation-adjusted returns",
]

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center md:py-28">
      <Badge variant="secondary">
        <Sparkles data-icon="inline-start" />
        Free · No sign-up required
      </Badge>

      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl">
        Know what you&apos;ll repay, and what your money can grow into.
      </h1>

      <p className="max-w-2xl text-lg text-muted-foreground text-balance">
        Two calculators that show the real numbers — a mortgage repayment
        schedule down to the last dollar, and a compound interest projection
        that accounts for contributions and inflation.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" asChild>
          <Link href="#mortgage">
            Calculate repayments
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="#compound-interest">Project compound growth</Link>
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
