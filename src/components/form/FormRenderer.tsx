import styled from "@emotion/styled";
import { useForm, FormProvider } from "react-hook-form";
import { FormHeader } from "./FormHeader";
import { FieldRenderer } from "./FieldRenderer";
import { Button } from "../ui";

import type { SubmitHandler, FieldValues } from "react-hook-form";
import type { FormSchema } from "../../types";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: SubmitHandler<FieldValues>;
}

const StyledForm = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  padding: theme.spacing.lg,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
}));

export const FormRenderer: React.FC<FormRendererProps> = ({
  schema,
  onSubmit,
}) => {
  const methods = useForm();

  return (
    <>
      <FormHeader
        title={schema.metadata.title}
        description={schema.metadata.description}
      />
      <FormProvider {...methods}>
        <StyledForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FieldRenderer fields={schema.fields} />

          <Button type="submit">Submit</Button>
        </StyledForm>
      </FormProvider>
    </>
  );
};
