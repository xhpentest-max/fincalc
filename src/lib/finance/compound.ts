export const COMPOUND_FREQUENCIES = {
  annually: { label: "Annually", periodsPerYear: 1 },
  semiAnnually: { label: "Semi-annually", periodsPerYear: 2 },
  quarterly: { label: "Quarterly", periodsPerYear: 4 },
  monthly: { label: "Monthly", periodsPerYear: 12 },
  daily: { label: "Daily", periodsPerYear: 365 },
} as const

export type CompoundFrequency = keyof typeof COMPOUND_FREQUENCIES

export type CompoundInput = {
  initialDeposit: number
  monthlyContribution: number
  annualRate: number
  years: number
  frequency: CompoundFrequency
  inflationRate: number
}

export type CompoundYear = {
  year: number
  contributed: number
  interest: number
  balance: number
  realContributed: number
  realInterest: number
  realBalance: number
}

export type CompoundResult = {
  futureValue: number
  realFutureValue: number
  totalContributed: number
  totalInterest: number
  interestShare: number
  schedule: CompoundYear[]
}

/** Restates a nominal future amount in today's money. */
function deflate(value: number, inflationRate: number, years: number) {
  if (inflationRate <= 0) return value
  return value / Math.pow(1 + inflationRate, years)
}

export function calculateCompoundInterest(input: CompoundInput): CompoundResult {
  const periodsPerYear = COMPOUND_FREQUENCIES[input.frequency].periodsPerYear
  const initialDeposit = Math.max(0, input.initialDeposit)
  const monthlyContribution = Math.max(0, input.monthlyContribution)
  const ratePerPeriod = Math.max(0, input.annualRate) / 100 / periodsPerYear
  const inflationRate = Math.max(0, input.inflationRate) / 100
  const totalPeriods = Math.max(0, Math.round(Math.max(0, input.years) * periodsPerYear))
  // Contributions are monthly, so spread them evenly across each period. This
  // keeps daily compounding exact instead of rounding to whole months.
  const contributionPerPeriod = (monthlyContribution * 12) / periodsPerYear

  const schedule: CompoundYear[] = []
  let balance = initialDeposit
  let contributed = initialDeposit
  let interestEarned = 0

  const record = (year: number) => {
    const realBalance = deflate(balance, inflationRate, year)
    const realContributed = deflate(contributed, inflationRate, year)

    schedule.push({
      year,
      contributed,
      interest: interestEarned,
      balance,
      realContributed,
      realInterest: realBalance - realContributed,
      realBalance,
    })
  }

  if (totalPeriods === 0) {
    record(0)
  }

  for (let period = 1; period <= totalPeriods; period += 1) {
    // Contributions land at the end of the period, so they earn interest from
    // the next period onwards (an ordinary annuity).
    const interest = balance * ratePerPeriod
    balance += interest + contributionPerPeriod
    interestEarned += interest
    contributed += contributionPerPeriod

    if (period % periodsPerYear === 0 || period === totalPeriods) {
      record(period / periodsPerYear)
    }
  }

  return {
    futureValue: balance,
    realFutureValue: deflate(balance, inflationRate, Math.max(0, input.years)),
    totalContributed: contributed,
    totalInterest: interestEarned,
    interestShare: balance > 0 ? interestEarned / balance : 0,
    schedule,
  }
}
