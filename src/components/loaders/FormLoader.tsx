import type React from "react";
import styled from "@emotion/styled";

import { FormRenderer } from "../form";
import { useFormSchema } from "../../hooks";
import { FetchError, FormSkeleton } from "../ui";

import type { FieldValues, SubmitHandler } from "react-hook-form";

const FormWrapper = styled.div({
  width: "100%",
});

export const FormLoader: React.FC<{
  formId: string;
}> = ({ formId }) => {
  const { data: schema, isLoading, error, refetch } = useFormSchema(formId);

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!schema) return;

    const { submitEndpoint, submitMethod } = schema.metadata;

    const response = await fetch(submitEndpoint, {
      method: submitMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }
  };

  return (
    <FormWrapper>
      {isLoading && <FormSkeleton />}

      {error && <FetchError error={error} onRetry={refetch} />}

      {schema && (
        <FormRenderer schema={schema} onSubmit={handleSubmit}></FormRenderer>
      )}
    </FormWrapper>
  );
};
