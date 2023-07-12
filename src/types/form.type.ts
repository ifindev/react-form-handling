import { z } from "zod";

/**
 * Generic type for errors returned from zod safe parsing the form schema
 */
export type FieldErrors<TFields extends object> = {
  [K in keyof TFields]: string[] | undefined;
};

/**
 * Generic type that accepts a valid zod schema and returns
 * a valid typescript object type
 */
export type FormSchema<TZodSchema extends z.ZodTypeAny> = z.infer<TZodSchema>;

/**
 * Generic type that accepts a valid zod schema and returns
 * mapped type for form input values where all form fields have string type
 */
export type FormFieldValues<TZodSchema extends z.ZodTypeAny> = {
  [K in keyof FormSchema<TZodSchema>]: string;
};

/**
 * Generic type that accepts a valid zod schema and returns a
 * mapped boolean typescript object type from the schema keys
 */
export type FormTouchedState<TZodSchema extends z.ZodTypeAny> = {
  [K in keyof z.infer<TZodSchema>]: boolean;
};

/**
 * Generic type for errors returned from zod safe parsing the form schema
 */
export type FormErrorState<TZodSchema extends z.ZodTypeAny> = FieldErrors<
  FormSchema<TZodSchema>
>;
