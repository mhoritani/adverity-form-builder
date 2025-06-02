import styled from "@emotion/styled";
import { FormHeader } from "./FormHeader";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../ui";

import type { FormSchema } from "../../types";

interface FormRendererProps {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  onSubmit?: (values: FormData) => Promise<void>;
}

const StyledForm = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  padding: theme.spacing.lg,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
}));

export const FormRenderer: React.FC<FormRendererProps> = ({ schema }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form submitted!");
  };

  return (
    <>
      <FormHeader
        title={schema.metadata.title}
        description={schema.metadata.description}
      />
      <StyledForm onSubmit={handleSubmit}>
        <FieldRenderer fields={schema.fields} />

        <Button type="submit">Submit</Button>
      </StyledForm>
    </>
  );
};
