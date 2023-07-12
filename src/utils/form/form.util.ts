import { z } from "zod";
import { FieldErrors, FormSchema } from "../../types/form.type";

/**
 * Validates values against a Zod schema and returns any validation errors.
 *
 * @template TSchema - The generic Zod schema type.
 *
 * @param {TSchema} schema - The Zod schema to validate against.
 * @param {z.infer<TSchema>} values - The values to validate.
 *
 * @returns {FieldErrors<z.infer<TSchema>>}
 *   - An object containing the field errors,
 *   where each field is a key and the value is either a single string or an array of strings.
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
