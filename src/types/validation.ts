export interface ValidationRule {
  message: string;
  type: "required" | "custom" | "async";
  trigger?: "onChange" | "onBlur" | "onSubmit";
}
