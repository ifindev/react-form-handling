# Form Validations with `react-hook-form` and Vanilla React Hooks

## Overview

The main goal of this project is to experiment with two different approaches for form handling & validations. The first approach is by using `react-hook-form` library and `zod`, while the second one is by using the basic `useState`, zod, and computed properties that are native from React.

The implementation strategy will revolve around extracting logics for form handling & validations to a custom hook. Then both approach will be compared specifically in the ease of testing & predictability. Testing becomes the main concern since in most modern software development lifecycle, a robust & testable codes are what differentiate whether a project is flexible to extension & refactoring or not. Basically, a very good & isolated unit testing will provide a great safety net for future enhancements and/or addition to the codes.

## Result

From what I have tried, setting up `react-hook-form` for handling form state and also for input validations are much more easier & uses less codes. Unfortunately, this benefits comes with several major drawbacks such as:

- input component becomes tightly coupled with specific implementation for `react-hook-form`.
- unit testing logics in custom hook & validation results is almost impossible
- continuing with the previous point, the only way to test validation error is by rendering input components. Basically, we need integration testing with rendering real input component to test the validations & form submitting
- too much magic & api surfaces

On the other hand, setting up form state handling & validations using plain `useState` & `zod` is much more tedious work. We have to write a lot of custom codes to handle form state, checking dirty fields, and also validating error based on the given schema & validation rules. Despite that, the main benefits of this are:

- the input component can be as generic as possible without having to know about specific library implementations
- logics are a lot easier to understand and reall straighforwards
- testing is a breeze since everything is a function or a computed properties
- less magics, more control, and logics are more predictable

## Closing

Anyway, clone the code and see it for yourself. Leave PR for improvements.

Thank you!
