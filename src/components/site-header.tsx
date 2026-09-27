import { Calculator } from "lucide-react"
import Link from "next/link"

import { CALCULATORS, FEATURES_LINK } from "@/lib/site-nav"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const nav = [FEATURES_LINK, ...CALCULATORS]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-medium tracking-tight"
        >
          <Calculator className="size-5 text-muted-foreground" />
          FinCalc
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <Button size="sm" asChild>
          <Link href={CALCULATORS[0].href}>Open calculator</Link>
        </Button>
      </div>
      <Separator />
    </header>
  )
}
