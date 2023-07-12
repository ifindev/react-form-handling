import { z } from "zod";
import {
  FormErrorState,
  FormFieldValues,
  FormSchema,
  FormTouchedState,
} from "../../types/form.type";

type UseFormOptions<TZodSchema extends z.ZodTypeAny> = {
  schema: TZodSchema;
  initialFormValues: FormSchema<TZodSchema>;
  initialFormTouchedState: FormTouchedState<TZodSchema>;
};

type UseFormResult<TZodSchema extends z.ZodTypeAny> = {
  values: {
    errors: FormErrorState<TZodSchema>;
    formValues: FormFieldValues<TZodSchema>;
    FormTouchedState: FormTouchedState<TZodSchema>;
  };
  handlers: {
    handleBlur: (field: keyof FormSchema<TZodSchema>) => void;
    handleChange: (value: string, field: keyof FormSchema<TZodSchema>) => void;
  };
};
