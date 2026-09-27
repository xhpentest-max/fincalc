import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          Run the numbers before you commit
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">
          Both calculators are free to use, update as you type, and show the
          full schedule behind the headline number.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="#mortgage">
              Start with your mortgage
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#compound-interest">Start with your savings</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
