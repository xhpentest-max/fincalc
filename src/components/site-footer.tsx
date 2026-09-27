import { Calculator } from "lucide-react"
import Link from "next/link"

import { Separator } from "@/components/ui/separator"

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
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link
            href="#mortgage"
            className="text-muted-foreground hover:text-foreground"
          >
            Mortgage
          </Link>
          <Link
            href="#compound-interest"
            className="text-muted-foreground hover:text-foreground"
          >
            Compound interest
          </Link>
        </nav>
      </div>
    </footer>
  )
}
