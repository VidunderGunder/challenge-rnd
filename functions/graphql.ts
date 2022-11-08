import { PartialRecursive } from "types/general";

/**
 * Loop through a nested object.
 * For each layer down, make all child key-value pairs the value of a `create`-key.
 */
export function createMutationVariablesFromFormData<T>(
  formValues: PartialRecursive<T> & Record<string, any>
): Record<string, any> {
  const variables: Record<string, any> = {};
  for (const key in formValues) {
    if (formValues.hasOwnProperty(key)) {
      const value = formValues[key];
      if (typeof value === "object") {
        variables[key] = {
          create: createMutationVariablesFromFormData(value),
        };
      } else {
        if (value !== undefined) variables[key] = value;
      }
    }
  }
  return variables;
}
