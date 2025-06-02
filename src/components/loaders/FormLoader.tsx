import type React from "react";
import styled from "@emotion/styled";

import { useFormSchema } from "../../hooks";
import { Button } from "../ui";
import { FormRenderer } from "../form";

const FormWrapper = styled.div({
  width: "100%",
});

export const FormLoader: React.FC<{
  formId: string;
}> = ({ formId }) => {
  const { data: schema, isLoading, error, refetch } = useFormSchema(formId);

  return (
    <FormWrapper>
      {isLoading && <div className="loading">Loading form schema...</div>}

      {error && (
        <div className="error">
          Error loading form schema: {error.message}
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      )}

      {schema && <FormRenderer schema={schema}></FormRenderer>}
    </FormWrapper>
  );
};
