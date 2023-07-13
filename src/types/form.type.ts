import { z } from "zod";
import { CheckNestedObject, Equals, MapNestedObjects } from "./common.type";

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
 * including all schema keys with nested object.
 */
export type FormFieldValues<TZodSchema extends z.ZodTypeAny> = MapNestedObjects<
  FormSchema<TZodSchema>,
  string
>;

/**
 * Generic type that accepts a valid zod schema and returns a
 * mapped boolean typescript object type from the schema keys
 */
export type FormTouchedState<TZodSchema extends z.ZodTypeAny> =
  MapNestedObjects<FormSchema<TZodSchema>, boolean>;

/**
 * Generic type for errors returned from zod safe parsing the form schema
 */
export type FormErrorState<TZodSchema extends z.ZodTypeAny> = FieldErrors<
  FormSchema<TZodSchema>
>;

/** Generic type to check whether a given zod schema has nested fields or not */
export type NonNestedZodSchema<TZodSchema extends z.ZodTypeAny> = Equals<
  CheckNestedObject<FormSchema<TZodSchema>>,
  FormSchema<TZodSchema>
> extends true
  ? TZodSchema
  : never;
