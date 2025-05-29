import type { ValidationRule } from "./validation";

export interface FieldDefinition {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  defaultValue?: unknown;
  validation: ValidationRule[];
}

// Field Types

export interface TextFieldType {
  kind: "text";
  variant: "single-line" | "multi-line" | "email" | "password" | "number";
  constraints?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface SelectFieldType {
  kind: "select";
  variant: "single"; // ToDo: could add multi support at some point, will need more constraints like min/max selections
  options: SelectOption[];
  searchable?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxFieldType {
  kind: "checkbox";
}

// Easily extensible with things like file input, radio, etc.

export type FieldType = TextFieldType | SelectFieldType | CheckboxFieldType;
