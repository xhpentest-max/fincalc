const LOCALE = "en-US"
const CURRENCY = "USD"

const wholeCurrency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
})

const exactCurrency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactCurrency = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
  notation: "compact",
  maximumFractionDigits: 1,
})

/** Guards against `NaN` / `Infinity` reaching `Intl`, which renders as "$NaN". */
function finite(value: number) {
  return Number.isFinite(value) ? value : 0
}

export function formatMoney(value: number) {
  return wholeCurrency.format(finite(value))
}

export function formatMoneyExact(value: number) {
  return exactCurrency.format(finite(value))
}

export function formatMoneyCompact(value: number) {
  return compactCurrency.format(finite(value))
}

export function formatPercent(value: number, fractionDigits = 2) {
  return `${finite(value).toFixed(fractionDigits)}%`
}

export function formatRatio(value: number, fractionDigits = 0) {
  return `${(finite(value) * 100).toFixed(fractionDigits)}%`
}

export function formatTerm(years: number) {
  const safeYears = finite(years)
  return `${safeYears % 1 === 0 ? safeYears : safeYears.toFixed(1)} ${
    safeYears === 1 ? "year" : "years"
  }`
}
