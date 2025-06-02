import { CheckboxField, SelectField, TextField } from "../fields";

import type { BaseFieldProps, FieldDefinition, FieldType } from "../../types";

export interface FieldRendererProps {
  fields: FieldDefinition[];
}

const getFieldComponent = (type: FieldType): React.FC<BaseFieldProps> => {
  const componentMap: Record<string, React.FC<BaseFieldProps>> = {
    text: TextField,
    select: SelectField,
    checkbox: CheckboxField,
  };

  return componentMap[type.kind] || <div>No component found</div>;
};

export const FieldRenderer: React.FC<FieldRendererProps> = ({ fields }) => {
  return (
    <>
      {fields.map((field: FieldDefinition) => {
        const Component = getFieldComponent(field.type);

        return <Component key={field.id} definition={field} />;
      })}
    </>
  );
};
