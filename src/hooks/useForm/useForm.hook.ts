import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import {
  FormErrorState,
  FormFieldValues,
  FormSchema,
  FormTouchedState,
  NonNestedZodSchema,
} from "../../types/form.type";
import { zodValidate } from "../../utils/form/form.util";

type UseFormOptions<TZodSchema extends z.ZodTypeAny> = {
  schema: NonNestedZodSchema<TZodSchema>;
  initialFormValues: FormFieldValues<TZodSchema>;
  initialTouchedState: FormTouchedState<TZodSchema>;
};

type UseFormResult<TZodSchema extends z.ZodTypeAny> = {
  values: {
    errors: FormErrorState<TZodSchema>;
    formData: FormFieldValues<TZodSchema>;
    isTouched: FormTouchedState<TZodSchema>;
  };
  handlers: {
    handleBlur: (field: keyof FormSchema<TZodSchema>) => void;
    handleChange: (value: string, field: keyof FormSchema<TZodSchema>) => void;
  };
};

export default function useForm<TZodSchema extends z.ZodTypeAny>(
  options: UseFormOptions<TZodSchema>
): UseFormResult<TZodSchema> {
  // #region DESTRUCURING OPTIONS

  const { schema, initialFormValues, initialTouchedState } = options;

  // #endregion

  // #region INTERNAL FORM STATE

  const [formData, setFormData] =
    useState<FormFieldValues<TZodSchema>>(initialFormValues);
  const [isTouched, setIsTouched] =
    useState<FormTouchedState<TZodSchema>>(initialTouchedState);

  // #endregion

  // #region FORM STATE HANDLER

  const handleChange = useCallback(
    (value: string, field: keyof FormSchema<TZodSchema>) => {
      setFormData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
      setIsTouched((prevState) => ({ ...prevState, [field]: true }));
    },
    []
  );

  const handleBlur = useCallback((field: keyof FormSchema<TZodSchema>) => {
    setIsTouched((prevState) => ({ ...prevState, [field]: true }));
  }, []);

  // #endregion

  // #region ERROR VALIDATIONS

  const errors = useMemo(
    () => zodValidate(schema, formData),
    [schema, formData]
  );

  // #endregion

  return {
    values: {
      errors,
      formData,
      isTouched,
    },
    handlers: {
      handleChange,
      handleBlur,
    },
  };
}
