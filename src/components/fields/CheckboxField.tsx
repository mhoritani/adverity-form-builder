import type { BaseFieldProps } from "../../types";

export type CheckboxFieldProps = BaseFieldProps;

export const CheckboxField: React.FC<CheckboxFieldProps> = ({ definition }) => {
  if (!definition) {
    return null;
  }

  return <input type={definition.type.kind} />;
};
