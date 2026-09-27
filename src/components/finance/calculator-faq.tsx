import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export type FaqItem = {
  question: string
  answer: string
}

export type CalculatorFaqProps = {
  heading: string
  description: string
  items: FaqItem[]
}

/** FAQ section. Stays a server component; only the Accordion ships to the client. */
export function CalculatorFaq({ heading, description, items }: CalculatorFaqProps) {
  return (
    <section className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20">
        <div className="flex max-w-2xl flex-col gap-3">
          <Badge variant="secondary" className="w-fit">
            FAQ
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            {description}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="max-w-3xl border-t"
        >
          {items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
