"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  NumericField,
  useNumericField,
} from "@/components/finance/numeric-field"
import { ResultTile } from "@/components/finance/result-tile"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  formatMoney,
  formatMoneyCompact,
  formatRatio,
  formatTerm,
} from "@/lib/finance/format"
import {
  REPAYMENT_FREQUENCIES,
  calculateMortgage,
  type RepaymentFrequency,
} from "@/lib/finance/mortgage"

const chartConfig = {
  principal: { label: "Principal", color: "var(--chart-2)" },
  interest: { label: "Interest", color: "var(--chart-3)" },
} satisfies ChartConfig

export function MortgageCalculator() {
  const amount = useNumericField(400_000)
  const rate = useNumericField(6.5)
  const term = useNumericField(30)
  const extra = useNumericField(0)
  const [frequency, setFrequency] = React.useState<RepaymentFrequency>("monthly")

  const result = React.useMemo(
    () =>
      calculateMortgage({
        principal: amount.value,
        annualRate: rate.value,
        termYears: term.value,
        frequency,
        extraRepayment: extra.value,
      }),
    [amount.value, rate.value, term.value, frequency, extra.value]
  )

  const frequencyLabel = REPAYMENT_FREQUENCIES[frequency].label.toLowerCase()
  const totalRepaid = result.interest + result.principalPaid + result.extraPaid
  const interestShare = totalRepaid > 0 ? result.interest / totalRepaid : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage repayments</CardTitle>
        <CardDescription>
          Level payments on a fully amortising loan. Voluntary overpayments are
          applied straight to the principal.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <FieldGroup>
            <NumericField
              id="mortgage-amount"
              label="Loan amount"
              field={amount}
              prefix="$"
              min={0}
              step={1000}
              slider={{ min: 50_000, max: 2_000_000, step: 5_000 }}
            />
            <NumericField
              id="mortgage-rate"
              label="Interest rate"
              field={rate}
              suffix="% p.a."
              min={0}
              step={0.05}
              slider={{ min: 0, max: 15, step: 0.05 }}
            />
            <NumericField
              id="mortgage-term"
              label="Term"
              field={term}
              suffix="years"
              min={1}
              step={1}
              slider={{ min: 1, max: 40, step: 1 }}
            />
            <NumericField
              id="mortgage-extra"
              label="Extra repayment"
              field={extra}
              prefix="$"
              min={0}
              step={50}
              description={`Added to every ${frequencyLabel} payment.`}
            />

            <Field>
              <FieldLabel htmlFor="mortgage-frequency">
                Repayment frequency
              </FieldLabel>
              <Select
                value={frequency}
                onValueChange={(next) =>
                  setFrequency(next as RepaymentFrequency)
                }
              >
                <SelectTrigger id="mortgage-frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(REPAYMENT_FREQUENCIES).map(
                      ([value, option]) => (
                        <SelectItem key={value} value={value}>
                          {option.label}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                {frequencyLabel} repayment
              </p>
              <p className="text-4xl font-semibold tracking-tight tabular-nums">
                {formatMoney(result.totalPayment)}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {formatTerm(term.value)} · {frequencyLabel}
                </Badge>
                {extra.value > 0 ? (
                  <Badge variant="outline">Includes overpayments</Badge>
                ) : null}
              </div>
            </div>

            <Separator />

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <ResultTile
                label="Scheduled payment"
                value={formatMoney(result.scheduledPayment)}
                hint="Before overpayments"
              />
              <ResultTile
                label="Total interest"
                value={formatMoney(result.interest)}
                hint={`${formatRatio(interestShare)} of everything you repay`}
              />
              <ResultTile
                label="Total repaid"
                value={formatMoney(totalRepaid)}
                hint={`Over ${result.periods} payments`}
              />
              <ResultTile
                label="Principal repaid"
                value={formatMoney(result.principalPaid + result.extraPaid)}
              />
            </dl>
          </div>
        </div>

        {result.interestSaved > 0 ? (
          <Alert>
            <AlertTitle>
              Overpayments saved you {formatMoney(result.interestSaved)}
            </AlertTitle>
            <AlertDescription>
              Without the extra {formatMoney(extra.value)} per payment you would
              pay {formatMoney(result.interest)} in interest over{" "}
              {formatTerm(term.value)} — and the loan would take{" "}
              {Math.ceil(result.periods / 12)} years instead of{" "}
              {Math.ceil(term.value)}.
            </AlertDescription>
          </Alert>
        ) : null}

        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Breakdown</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
              <BarChart
                data={result.byYear}
                margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={64}
                  tickFormatter={(value: number) => formatMoneyCompact(value)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) => `Year ${value}`}
                      formatter={(value, name) => (
                        <div className="flex w-full items-center justify-between gap-6">
                          <span className="text-muted-foreground">
                            {
                              chartConfig[
                                String(name) as keyof typeof chartConfig
                              ]?.label
                            }
                          </span>
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {formatMoney(Number(value))}
                          </span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar
                  dataKey="principal"
                  stackId="repayments"
                  fill="var(--color-principal)"
                />
                <Bar
                  dataKey="interest"
                  stackId="repayments"
                  fill="var(--color-interest)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="schedule">
            <ScrollArea className="h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">Extra</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.byYear.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="tabular-nums">{row.year}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.principal)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.interest)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.extra)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.balance)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.principalPaid)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.interest)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.extraPaid)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(totalRepaid)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
                <TableCaption>
                  Principal and interest aggregated per year of the repayment
                  schedule.
                </TableCaption>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
