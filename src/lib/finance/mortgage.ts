export const REPAYMENT_FREQUENCIES = {
  weekly: { label: "Weekly", periodsPerYear: 52 },
  fortnightly: { label: "Fortnightly", periodsPerYear: 26 },
  monthly: { label: "Monthly", periodsPerYear: 12 },
} as const

export type RepaymentFrequency = keyof typeof REPAYMENT_FREQUENCIES

export type MortgageInput = {
  principal: number
  annualRate: number
  termYears: number
  frequency: RepaymentFrequency
  extraRepayment: number
}

export type MortgagePeriod = {
  period: number
  interest: number
  principal: number
  extra: number
  balance: number
}

export type MortgageYear = {
  year: number
  interest: number
  principal: number
  extra: number
  balance: number
}

export type MortgageResult = {
  scheduledPayment: number
  totalPayment: number
  interest: number
  principalPaid: number
  extraPaid: number
  totalPaid: number
  interestSaved: number
  periods: number
  schedule: MortgagePeriod[]
  byYear: MortgageYear[]
}

/**
 * Level payment that clears `principal` after `periods` compounding periods:
 * `P = L * r / (1 - (1 + r)^-n)`.
 */
function levelPayment(principal: number, ratePerPeriod: number, periods: number) {
  if (periods <= 0 || principal <= 0) return 0
  if (ratePerPeriod === 0) return principal / periods

  return (principal * ratePerPeriod) / (1 - Math.pow(1 + ratePerPeriod, -periods))
}

function buildSchedule(
  principal: number,
  ratePerPeriod: number,
  periods: number,
  scheduledPayment: number,
  extraRepayment: number
) {
  const schedule: MortgagePeriod[] = []
  let balance = principal

  for (let period = 1; period <= periods && balance > 0.005; period += 1) {
    const interest = balance * ratePerPeriod
    let principalPart = scheduledPayment - interest
    let extraPart = extraRepayment

    // Never collect more than the outstanding balance on the final payment.
    if (principalPart + extraPart > balance) {
      const scale = balance / (principalPart + extraPart)
      principalPart *= scale
      extraPart *= scale
    }

    if (principalPart + extraPart <= 0) break

    balance -= principalPart + extraPart
    schedule.push({ period, interest, principal: principalPart, extra: extraPart, balance })
  }

  return schedule
}

function sumByPeriod(schedule: MortgagePeriod[], key: keyof MortgagePeriod) {
  return schedule.reduce((total, row) => total + (row[key] as number), 0)
}

function aggregateByYear(schedule: MortgagePeriod[], periodsPerYear: number) {
  const byYear: MortgageYear[] = []

  for (let index = 0; index < schedule.length; index += 1) {
    const year = Math.floor(index / periodsPerYear) + 1
    const last = byYear[byYear.length - 1]

    if (!last || last.year !== year) {
      byYear.push({ year, interest: 0, principal: 0, extra: 0, balance: 0 })
    }

    const row = byYear[byYear.length - 1]
    row.interest += schedule[index].interest
    row.principal += schedule[index].principal
    row.extra += schedule[index].extra
    row.balance = schedule[index].balance
  }

  return byYear
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const periodsPerYear = REPAYMENT_FREQUENCIES[input.frequency].periodsPerYear
  const principal = Math.max(0, input.principal)
  const ratePerPeriod = Math.max(0, input.annualRate) / 100 / periodsPerYear
  const extraRepayment = Math.max(0, input.extraRepayment)
  const periods = Math.max(1, Math.round(Math.max(1, input.termYears) * periodsPerYear))

  const scheduledPayment = levelPayment(principal, ratePerPeriod, periods)
  const schedule = buildSchedule(
    principal,
    ratePerPeriod,
    periods,
    scheduledPayment,
    extraRepayment
  )

  // Baseline without voluntary overpayments, used to quantify the saving.
  const baseline = extraRepayment
    ? buildSchedule(principal, ratePerPeriod, periods, scheduledPayment, 0)
    : schedule
  const interest = sumByPeriod(schedule, "interest")

  return {
    scheduledPayment,
    totalPayment: scheduledPayment + extraRepayment,
    interest,
    principalPaid: sumByPeriod(schedule, "principal"),
    extraPaid: sumByPeriod(schedule, "extra"),
    totalPaid: sumByPeriod(schedule, "interest") + sumByPeriod(schedule, "principal") + sumByPeriod(schedule, "extra"),
    interestSaved: extraRepayment ? Math.max(0, sumByPeriod(baseline, "interest") - interest) : 0,
    periods: schedule.length,
    schedule,
    byYear: aggregateByYear(schedule, periodsPerYear),
  }
}
