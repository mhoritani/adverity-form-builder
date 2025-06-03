import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";

import { getValidationRules } from "../../lib/validation";
import { FieldWrapper } from "./FieldWrapper";
import { focusOutline } from "../../styles/mixins";

import type { BaseFieldProps } from "../../types";

export type SelectFieldProps = BaseFieldProps;

const StyledSelect = styled.select(({ theme }) => ({
  appearance: "none",
  width: "100%",
  padding: `${theme.spacing.sm}`,
  fontSize: theme.typography.fontSize.sm,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.background.secondary,
  color: theme.colors.text.primary,
  ...focusOutline(theme),
}));

export const SelectField: React.FC<SelectFieldProps> = ({ definition }) => {
  const { register } = useFormContext();

  if (definition.type.kind !== "select") {
    return null;
  }

  const validationRules = getValidationRules(definition);

  return (
    <FieldWrapper definition={definition}>
      <StyledSelect
        defaultValue=""
        id={definition.id}
        autoComplete="false"
        {...register(definition.id, validationRules)}
      >
        <option value="" disabled>
          Please choose...
        </option>
        {definition.type.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </FieldWrapper>
  );
};
