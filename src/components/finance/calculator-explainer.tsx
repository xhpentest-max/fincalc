import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export type ExplainerTerm = {
  term: string
  definition: string
}

export type CalculatorExplainerProps = {
  heading: string
  description: string
  /** The closed-form expression the calculator's engine actually uses. */
  formula: string
  formulaCaption: string
  terms: ExplainerTerm[]
}

/**
 * Long-form "how it works" section that states the formula behind a
 * calculator, so the published explanation cannot drift from the engine.
 */
export function CalculatorExplainer({
  heading,
  description,
  formula,
  formulaCaption,
  terms,
}: CalculatorExplainerProps) {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            How it works
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {description}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>The formula</CardTitle>
            <CardDescription>{formulaCaption}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <p className="font-mono text-2xl tracking-tight text-balance">
              {formula}
            </p>

            <Separator />

            <dl className="grid gap-6 sm:grid-cols-2">
              {terms.map((item) => (
                <div key={item.term} className="flex flex-col gap-1">
                  <dt className="text-sm font-medium">{item.term}</dt>
                  <dd className="text-sm text-muted-foreground text-balance">
                    {item.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
