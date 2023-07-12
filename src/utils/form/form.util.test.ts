import { z } from "zod";
import { zodValidate } from "./form.util";

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
});
