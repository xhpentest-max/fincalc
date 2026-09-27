"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

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
import { Switch } from "@/components/ui/switch"
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
  COMPOUND_FREQUENCIES,
  calculateCompoundInterest,
  type CompoundFrequency,
} from "@/lib/finance/compound"

const chartConfig = {
  contributed: { label: "Contributed", color: "var(--chart-2)" },
  interest: { label: "Interest", color: "var(--chart-3)" },
} satisfies ChartConfig

export function CompoundCalculator() {
  const deposit = useNumericField(10_000)
  const contribution = useNumericField(500)
  const rate = useNumericField(7)
  const years = useNumericField(30)
  const inflation = useNumericField(2.5)
  const [frequency, setFrequency] = React.useState<CompoundFrequency>("monthly")
  const [inRealTerms, setInRealTerms] = React.useState(false)

  const result = React.useMemo(
    () =>
      calculateCompoundInterest({
        initialDeposit: deposit.value,
        monthlyContribution: contribution.value,
        annualRate: rate.value,
        years: years.value,
        frequency,
        inflationRate: inflation.value,
      }),
    [
      deposit.value,
      contribution.value,
      rate.value,
      years.value,
      frequency,
      inflation.value,
    ]
  )

  // "Today's money" only makes sense once there is an inflation assumption.
  const showReal = inRealTerms && inflation.value > 0
  const headline = showReal ? result.realFutureValue : result.futureValue
  const chartData = result.schedule.map((row) =>
    showReal
      ? {
          year: row.year,
          contributed: row.realContributed,
          interest: row.realInterest,
        }
      : { year: row.year, contributed: row.contributed, interest: row.interest }
  )
  const finalRow = result.schedule[result.schedule.length - 1]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compound interest</CardTitle>
        <CardDescription>
          Project how a lump sum plus regular contributions grows, with the
          compounding frequency and inflation under your control.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <FieldGroup>
            <NumericField
              id="compound-deposit"
              label="Initial deposit"
              field={deposit}
              prefix="$"
              min={0}
              step={500}
              slider={{ min: 0, max: 100_000, step: 500 }}
            />
            <NumericField
              id="compound-contribution"
              label="Monthly contribution"
              field={contribution}
              prefix="$"
              min={0}
              step={50}
              slider={{ min: 0, max: 5_000, step: 50 }}
            />
            <NumericField
              id="compound-rate"
              label="Expected return"
              field={rate}
              suffix="% p.a."
              min={0}
              step={0.5}
              slider={{ min: 0, max: 20, step: 0.5 }}
            />
            <NumericField
              id="compound-years"
              label="Time horizon"
              field={years}
              suffix="years"
              min={0}
              step={1}
              slider={{ min: 1, max: 50, step: 1 }}
            />
            <NumericField
              id="compound-inflation"
              label="Inflation"
              field={inflation}
              suffix="% p.a."
              min={0}
              step={0.1}
              description="Used to express the result in today's money."
            />

            <Field>
              <FieldLabel htmlFor="compound-frequency">
                Compounding frequency
              </FieldLabel>
              <Select
                value={frequency}
                onValueChange={(next) =>
                  setFrequency(next as CompoundFrequency)
                }
              >
                <SelectTrigger id="compound-frequency" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.entries(COMPOUND_FREQUENCIES).map(
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

            <Field orientation="horizontal">
              <FieldLabel htmlFor="compound-real">
                Show in today&apos;s money
              </FieldLabel>
              <Switch
                id="compound-real"
                checked={inRealTerms}
                onCheckedChange={setInRealTerms}
              />
            </Field>
          </FieldGroup>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                {showReal ? "Projected value in today's money" : "Projected value"}
              </p>
              <p className="text-4xl font-semibold tracking-tight tabular-nums">
                {formatMoney(headline)}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{formatTerm(years.value)}</Badge>
                <Badge variant="outline">
                  {COMPOUND_FREQUENCIES[frequency].label} compounding
                </Badge>
                {showReal ? <Badge variant="outline">Inflation adjusted</Badge> : null}
              </div>
            </div>

            <Separator />

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              <ResultTile
                label="Total contributed"
                value={formatMoney(result.totalContributed)}
                hint="Deposits plus contributions"
              />
              <ResultTile
                label="Interest earned"
                value={formatMoney(result.totalInterest)}
                hint={`${formatRatio(result.interestShare)} of the final balance`}
              />
              <ResultTile
                label="Growth multiple"
                value={
                  result.totalContributed > 0
                    ? `${(result.futureValue / result.totalContributed).toFixed(2)}x`
                    : "—"
                }
                hint="Final value per dollar contributed"
              />
              <ResultTile
                label="Worth today"
                value={formatMoney(result.realFutureValue)}
                hint={`At ${inflation.value}% inflation`}
              />
            </dl>
          </div>
        </div>

        {result.totalInterest > 0 ? (
          <Alert>
            <AlertTitle>
              {formatRatio(result.interestShare)} of the balance is growth
            </AlertTitle>
            <AlertDescription>
              You put in {formatMoney(result.totalContributed)} and the balance
              reaches {formatMoney(result.futureValue)} — that is{" "}
              {formatMoney(result.totalInterest)} of compound growth on top of
              your own money.
            </AlertDescription>
          </Alert>
        ) : null}

        <Tabs defaultValue="chart">
          <TabsList>
            <TabsTrigger value="chart">Growth</TabsTrigger>
            <TabsTrigger value="schedule">Year by year</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <ChartContainer config={chartConfig} className="aspect-auto h-72 w-full">
              <AreaChart
                data={chartData}
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
                <Area
                  dataKey="contributed"
                  stackId="growth"
                  stroke="var(--color-contributed)"
                  fill="var(--color-contributed)"
                  fillOpacity={0.35}
                />
                <Area
                  dataKey="interest"
                  stackId="growth"
                  stroke="var(--color-interest)"
                  fill="var(--color-interest)"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="schedule">
            <ScrollArea className="h-80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Year</TableHead>
                    <TableHead className="text-right">Contributed</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    {showReal ? (
                      <TableHead className="text-right">In today&apos;s money</TableHead>
                    ) : null}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.schedule.map((row) => (
                    <TableRow key={row.year}>
                      <TableCell className="tabular-nums">{row.year}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.contributed)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.interest)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(row.balance)}
                      </TableCell>
                      {showReal ? (
                        <TableCell className="text-right tabular-nums">
                          {formatMoney(row.realBalance)}
                        </TableCell>
                      ) : null}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.totalContributed)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.totalInterest)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatMoney(result.futureValue)}
                    </TableCell>
                    {showReal ? (
                      <TableCell className="text-right tabular-nums">
                        {formatMoney(result.realFutureValue)}
                      </TableCell>
                    ) : null}
                  </TableRow>
                </TableFooter>
                <TableCaption>
                  {finalRow
                    ? `Balance after ${formatTerm(finalRow.year)}.`
                    : "Set a time horizon to see the schedule."}
                </TableCaption>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
