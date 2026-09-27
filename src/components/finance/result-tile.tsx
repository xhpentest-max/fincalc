type ResultTileProps = {
  label: string
  value: string
  hint?: string
}

/** A single label/value pair for a results summary, rendered inside a `<dl>`. */
export function ResultTile({ label, value, hint }: ResultTileProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-xl font-semibold tabular-nums">{value}</dd>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}
