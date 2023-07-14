import { z } from "zod";
import {
  FieldErrors,
  FormSchema,
  FormTouchedState,
} from "../../types/form.type";

/**
 * Validates values against a Zod schema and returns any validation errors.
 *
 * @template TZodSchema - The generic Zod schema type.
 *
 * @param {FormSchema<TZodSchema>} schema - The Zod schema to validate against.
 * @param {z.infer<TSchema>} values - The values to validate.
 *
 * @returns {FieldErrors<FormSchema<TZodSchema>>}
 *   - An object containing the field errors,
 *   where each field is a key and the value is an array of strings.
 *   - If there are no validation errors, an empty object is returned.
 */
export function zodValidate<TZodSchema extends z.ZodTypeAny>(
  schema: TZodSchema,
  values: FormSchema<TZodSchema>
): FieldErrors<FormSchema<TZodSchema>> {
  const result = schema.safeParse(values);

  if (result.success) {
    return {} as FieldErrors<FormSchema<TZodSchema>>;
  }

  return result.error.flatten().fieldErrors as FieldErrors<
    FormSchema<TZodSchema>
  >;
}

/**
 * Get the error message for a specific form field.
 *
 * @template TZodSchema - The Zod schema type for the form.
 * @param {z.ZodType<any>} schema - The Zod schema for the form.
 * @param {FormSchema} values - The form values.
 * @param {FormTouchedState} touchedState - The touched state of form fields.
 * @param {keyof FormSchema} field - The field name to retrieve the error for.
 * @returns {string | undefined} - The error message for the field, or undefined if no error or field is not touched.
 */
export function getFieldError<
  TZodSchema extends z.ZodTypeAny,
  TField extends keyof FormSchema<TZodSchema>
>(
  schema: TZodSchema,
  values: FormSchema<TZodSchema>,
  touchedState: FormTouchedState<TZodSchema>,
  field: TField
): string | undefined {
  const errors = zodValidate(schema, values);

  if (
    errors !== undefined &&
    Object.keys(errors).length !== 0 &&
    touchedState[field]
  ) {
    const fieldError = errors[field];

    if (fieldError && fieldError.length > 0) {
      return fieldError[0];
    }
  }

  return undefined;
}
