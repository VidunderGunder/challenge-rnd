export type StringWithSuggestions = string & {};
export type PartialRecursive<T> = {
  [P in keyof T]?: PartialRecursive<T[P]>;
};
