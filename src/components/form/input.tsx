import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useId } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface FormInputProps {
  name: string
  label?: string
  description?: string
  descriptionTop?: string
  optional?: boolean
  onValueChange?: (val: string) => void
}

export function FormInput({
  name,
  label,
  description,
  descriptionTop,
  optional = false,
  onValueChange,
  ...rest
}: FormInputProps & React.ComponentProps<typeof Input>) {
  const id = useId()
  const { control } = useFormContext()
  const { t } = useTranslation("common")

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className="w-full">
          {label && (
            <FieldLabel htmlFor={id} className="gap-1">
              {label}
              {optional && (
                <span className="text-sm text-muted-foreground">
                  {t("optional")}
                </span>
              )}
            </FieldLabel>
          )}
          {descriptionTop && (
            <FieldDescription>{descriptionTop}</FieldDescription>
          )}
          <Input
            id={id}
            {...rest}
            {...field}
            value={
              rest.type === "number" && field.value === 0 ? "" : field.value
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              field.onChange(e)
              onValueChange?.(e?.target?.value)
            }}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
