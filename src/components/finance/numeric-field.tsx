"use client"

import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Slider } from "@/components/ui/slider"

function round(value: number) {
  return Math.round(value * 100) / 100
}

/**
 * Keeps the raw text of a numeric input so the field can be cleared mid-edit,
 * while always exposing a usable number to the calculators. An empty field
 * reads as 0 rather than `NaN`.
 */
export function useNumericField(initial: number) {
  const [raw, setRaw] = React.useState(() => String(initial))

  const value = React.useMemo(() => {
    const parsed = Number.parseFloat(raw)
    return Number.isFinite(parsed) ? parsed : 0
  }, [raw])

  const setValue = React.useCallback((next: number) => {
    setRaw(String(round(next)))
  }, [])

  return { raw, value, setRaw, setValue }
}

export type NumericField = ReturnType<typeof useNumericField>

type NumericFieldProps = {
  id: string
  label: string
  field: NumericField
  description?: string
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  slider?: { min: number; max: number; step: number }
}

export function NumericField({
  id,
  label,
  field,
  description,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  slider,
}: NumericFieldProps) {
  const sliderValue = slider
    ? Math.min(slider.max, Math.max(slider.min, field.value))
    : undefined

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        {prefix ? (
          <InputGroupAddon align="inline-start">
            <InputGroupText>{prefix}</InputGroupText>
          </InputGroupAddon>
        ) : null}
        <InputGroupInput
          id={id}
          type="number"
          inputMode="decimal"
          value={field.raw}
          onChange={(event) => field.setRaw(event.target.value)}
          min={min}
          max={max}
          step={step}
        />
        {suffix ? (
          <InputGroupAddon align="inline-end">
            <InputGroupText>{suffix}</InputGroupText>
          </InputGroupAddon>
        ) : null}
      </InputGroup>
      {slider ? (
        <Slider
          aria-label={label}
          value={[sliderValue ?? 0]}
          onValueChange={([next]) => field.setValue(next)}
          min={slider.min}
          max={slider.max}
          step={slider.step}
        />
      ) : null}
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  )
}
