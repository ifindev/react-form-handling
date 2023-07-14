import { z } from "zod";
import { FormSchema, FormTouchedState } from "../../types/form.type";
import { getFieldError, zodValidate } from "./form.util";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(6, { message: "username should be at least 6 characters" }),
  password: z
    .string()
    .min(6, { message: "password should be at least 6 characters" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

describe("form util", () => {
  describe("zodValidate function", () => {
    it("returns an empty object for valid values", () => {
      const validValues: LoginFormSchema = {
        username: "johndoe",
        password: "password123",
      };
      const errors = zodValidate(loginFormSchema, validValues);

      expect(errors).toEqual({});
    });

    it("returns error for invalid value", () => {
      const invalidValues: LoginFormSchema = {
        username: "user",
        password: "password123",
      };
      const errors = zodValidate(loginFormSchema, invalidValues);

      expect(errors.username).toEqual(
        expect.arrayContaining(["username should be at least 6 characters"])
      );
    });

    it("returns undefined for valid username", () => {
      const validValues: LoginFormSchema = {
        username: "validusername",
        password: "password123",
      };
      const errors = zodValidate(loginFormSchema, validValues);

      expect(errors.username).toBeUndefined();
    });
  });

  describe("getFieldError", () => {
    const schema = z.object({
      username: z.string().nonempty({ message: "Username is required" }),
      password: z.string().nonempty({ message: "Password is required" }),
    });

    it("returns the error message for a touched field with an error", () => {
      const values: FormSchema<typeof schema> = {
        username: "",
        password: "123",
      };

      const touchedState: FormTouchedState<typeof schema> = {
        username: true,
        password: true,
      };

      const error = getFieldError(schema, values, touchedState, "username");
      expect(error).toEqual("Username is required");
    });

    it("returns undefined for a field with no error", () => {
      const values: FormSchema<typeof schema> = {
        username: "",
        password: "123",
      };

      const touchedState: FormTouchedState<typeof schema> = {
        username: false,
        password: true,
      };

      const error = getFieldError(schema, values, touchedState, "password");
      expect(error).toBeUndefined();
    });

    it("returns undefined for a field that is not touched", () => {
      const values: FormSchema<typeof schema> = {
        username: "",
        password: "123",
      };

      const touchedState: FormTouchedState<typeof schema> = {
        username: false,
        password: true,
      };

      const error = getFieldError(schema, values, touchedState, "username");
      expect(error).toBeUndefined();
    });
  });
});
