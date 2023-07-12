import { z } from "zod";

/**
 * Generic type for errors returned from zod safe parsing the form schema
 */
type FieldErrors<TFields extends object> = {
  [K in keyof TFields]: string[] | undefined;
};

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
export function zodValidate<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  values: z.infer<TSchema>
): FieldErrors<z.infer<TSchema>> {
  const result = schema.safeParse(values);

  if (result.success) {
    return {} as FieldErrors<z.infer<TSchema>>;
  }

  return result.error.flatten().fieldErrors as FieldErrors<z.infer<TSchema>>;
}
