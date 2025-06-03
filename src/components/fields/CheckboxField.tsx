import styled from "@emotion/styled";
import type { BaseFieldProps } from "../../types";
import { FieldWrapper } from "./FieldWrapper";
import { focusOutline } from "../../styles/mixins";
import { theme } from "../../styles/theme";

export type CheckboxFieldProps = BaseFieldProps;

const CheckBox = styled.input({
  marginBottom: theme.spacing.sm,
  ...focusOutline(theme),
});

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ definition }) => {
  if (!definition) {
    return null;
  }

  return (
    <FieldWrapper definition={definition}>
      <CheckBox id={definition.id} type={definition.type.kind} />
    </FieldWrapper>
  );
};
