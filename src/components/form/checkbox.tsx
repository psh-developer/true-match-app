import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { useId } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"

interface FormCheckboxProps {
  name: string
  label?: string
  description?: string
  optional?: boolean
  orientation?: "vertical" | "horizontal" | "responsive" | null | undefined
}

export function FormCheckbox({
  name,
  label,
  description,
  optional = false,
  orientation = "horizontal",
  ...rest
}: FormCheckboxProps & React.ComponentProps<typeof Checkbox>) {
  const id = useId()
  const { control } = useFormContext()
  const { t } = useTranslation("common")

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation={orientation}>
          {
            <Checkbox
              id={id}
              {...rest}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          }
          <div>
            {label && (
              <FieldLabel htmlFor={id} className="gap-1">
                {label}
                {optional && (
                  <span className="text-muted-foreground">{t("optional")}</span>
                )}
              </FieldLabel>
            )}
            {description && (
              <FieldDescription className="text-xs">
                {description}
              </FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </div>
        </Field>
      )}
    />
  )
}
