import { useQuery } from "@tanstack/react-query";
import type { FormSchema } from "../types";

interface UseFormSchemaOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export const useFormSchema = (
  formId: string,
  options: UseFormSchemaOptions = {}
) => {
  return useQuery({
    queryKey: ["form-schema", formId],
    queryFn: async (): Promise<FormSchema> => {
      const response = await fetch(`/api/forms/${formId}/schema`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch schema: ${response.status} ${response.statusText}`
        );
      }

      const schema = await response.json();
      return schema;
    },
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5 mins
    cacheTime: options.cacheTime ?? 10 * 60 * 1000, // 10 mins
    retry: 1,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: options.enabled ?? true,
    ...options,
  });
};
