import { act, renderHook } from "@testing-library/react-hooks";
import { ChangeEvent } from "react";

import useLoginForm from "./useLoginForm.hook";

describe("useLoginFormHook", () => {
  test("login form fields should have correct initial values", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.values.formState.username).toEqual("");
    expect(result.current.values.formState.password).toEqual("");
  });

  test("login form dirty state should have correct initial values", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.values.isDirty.username).toEqual(false);
    expect(result.current.values.isDirty.password).toEqual(false);
  });

  test("handleFieldChange should handle correct form state update", () => {
    const username = "john_doe";
    const password = "123password";
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handlers.handleFieldChange(username, "username");
    });
    expect(result.current.values.formState.username).toEqual(username);

    act(() => {
      result.current.handlers.handleFieldChange(password, "password");
    });
    expect(result.current.values.formState.password).toEqual(password);
  });

  test("handleUsernameChange updates the username field in form state", () => {
    const { result } = renderHook(() => useLoginForm());

    const username = "john_doe";
    const event = {
      target: { value: username },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handlers.handleUsernameChange(event);
    });

    expect(result.current.values.formState.username).toBe(username);
  });

  test("handlePasswordChange updates the password field in form state", () => {
    const { result } = renderHook(() => useLoginForm());

    const password = "password123";
    const event = {
      target: { value: password },
    } as ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handlers.handlePasswordChange(event);
    });

    expect(result.current.values.formState.password).toBe(password);
  });

  test("handleBlur should update dirty state correctly", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handlers.handleBlur("username");
    });
    expect(result.current.values.isDirty.username).toEqual(true);
    expect(result.current.values.isDirty.password).toEqual(false);

    act(() => {
      result.current.handlers.handleBlur("password");
    });
    expect(result.current.values.isDirty.username).toEqual(true);
    expect(result.current.values.isDirty.password).toEqual(true);
  });

  test("username & password error should be undefined initially", () => {
    const { result } = renderHook(() => useLoginForm());

    expect(result.current.values.usernameError).toBeUndefined();
    expect(result.current.values.passwordError).toBeUndefined();
  });

  test("required error should be returned if formState is empty onBlur", () => {
    const { result } = renderHook(() => useLoginForm());

    act(() => {
      result.current.handlers.handleBlur("username");
    });
    expect(result.current.values.usernameError).toEqual("Username is required");
    expect(result.current.values.passwordError).toBeUndefined();

    act(() => {
      result.current.handlers.handleBlur("password");
    });
    expect(result.current.values.passwordError).toEqual("Password is required");
  });
});
