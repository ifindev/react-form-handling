/**
 * Generic type to transform deep nested object type
 * so that each keys in the object will have a new type
 * of TNew
 *
 * example :
 *
 * type Information = {
 *   name: string;
 *   address: {
 *     street: string
 *     zipCode: number
 *   }
 * }
 *
 * If we want to convert all fields in the Information type
 * to have a boolean type, then we can do this
 *
 * type NewInformation = MapNestedObjects<Information, boolean>
 *
 * Which is the same as
 *
 * type NewInformation = {
 *   name: boolean;
 *   address: {
 *     street: boolean
 *     zipCode: boolean
 *   }
 * }
 *
 *
 */
export type MapNestedObjects<T extends object, TNew> = {
  [K in keyof T]: T[K] extends object ? MapNestedObjects<T[K], TNew> : TNew;
};

/**
 * Generic type that accepts an object type
 * and will return the original object type if all
 * object keys are not of object type
 *
 * Example :
 *
 * type ValidType = {
 *   one: string;
 *   two: string;
 * }
 *
 * CheckNestedObject<Valid> will return
 * type ValidType = {
 *   one: string;
 *   two: string;
 * }
 *
 * Whereas
 *
 * type InValidType = {
 *   one: string;
 *   nested: {
 *     a: number;
 *     b: string;
 *   }
 * }
 *
 * CheckNestedObject<InValidType> will return
 *
 * type InValidType = {
 *   one: never;
 *   nested: never
 * }
 */
export type CheckNestedObject<T extends object> = {
  [K in keyof T]: T[K] extends object ? never : T[K];
};

/**
 * Generic type to check whether two given types are stricly equal.
 * In this type expression, the type variable T is not explicitly
 * defined or constrained outside the function type.
 * Instead, it's inferred based on the context in which Equals<X, Y> is used
 *
 * Source: https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
 */
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? true
  : false;
