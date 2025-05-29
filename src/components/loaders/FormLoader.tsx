import type React from "react";
import { useFormSchema } from "../../hooks";
import { Button } from "../ui";

export const FormLoader: React.FC<{
  formId: string;
}> = ({ formId }) => {
  const { data: schema, isLoading, error, refetch } = useFormSchema(formId);

  return (
    <div className="form-loader">
      {isLoading && <div className="loading">Loading form schema...</div>}

      {error && (
        <div className="error">
          Error loading form schema: {error.message}
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      )}

      {schema && (
        <div className="form-schema">
          <h2>{schema.metadata.title}</h2>
          <p>{schema.metadata.description}</p>
        </div>
      )}
    </div>
  );
};
