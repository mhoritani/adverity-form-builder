import type { FieldDefinition } from "./field";

export interface FormSchema {
  id: string;
  version: string;
  metadata: FormMetadata;
  fields: FieldDefinition[];
}

export interface FormMetadata {
  title: string;
  description?: string;
  submitEndpoint: string;
  submitMethod: "POST" | "PUT" | "PATCH";
}
