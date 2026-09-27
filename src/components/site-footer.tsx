import { Calculator } from "lucide-react"
import Link from "next/link"

import { CALCULATORS, FEATURES_LINK } from "@/lib/site-nav"

import { Separator } from "@/components/ui/separator"

const nav = [FEATURES_LINK, ...CALCULATORS]

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <Separator />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calculator className="size-4" />
          FinCalc
        </div>
        <p className="text-sm text-muted-foreground text-balance">
          Estimates only — always confirm figures with a lender or adviser.
        </p>
        <nav className="flex items-center gap-4 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
