import type { RegisterOptions } from "react-hook-form";
import type { FieldDefinition } from "../../types";

export const getValidationRules = (field: FieldDefinition): RegisterOptions => {
  const rules: RegisterOptions = {};

  // First map field-specific "constraints"
  switch (field.type.kind) {
    case "text":
      if (field.type.constraints?.minLength) {
        rules.minLength = {
          value: field.type.constraints.minLength,
          message: `Minimum ${field.type.constraints.minLength} characters required`,
        };
      }
      if (field.type.constraints?.maxLength) {
        rules.maxLength = {
          value: field.type.constraints.maxLength,
          message: `Maximum ${field.type.constraints.maxLength} characters allowed`,
        };
      }
      if (field.type.constraints?.pattern) {
        rules.pattern = {
          value: new RegExp(field.type.constraints.pattern),
          message: "Invalid format",
        };
      }
      break;
  }

  // Then take care of more generic validation rules
  field.validation.forEach((rule) => {
    switch (rule.type) {
      case "required":
        rules.required = rule.message;
        break;
    }
  });

  return rules;
};
