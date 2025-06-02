import type { FormSchema } from "../types";

export const mockFormSchemas: Record<string, FormSchema> = {
  "user-registration": {
    id: "user-registration",
    metadata: {
      title: "User Registration",
      description: "Create your account",
      submitEndpoint: "/api/users",
      submitMethod: "POST",
    },
    fields: [
      {
        id: "firstName",
        type: {
          kind: "text",
          variant: "single-line",
          constraints: {
            minLength: 2,
            maxLength: 50,
          },
        },
        label: "First Name",
        validation: [{ type: "required", message: "First name is required" }],
        placeholder: "Enter your full name",
      },
      {
        id: "email",
        type: {
          kind: "text",
          variant: "email",
          constraints: {
            maxLength: 255,
            pattern: "^[^@]+@[^@]+\\.[^@]+$",
          },
        },
        label: "Email Address",
        validation: [
          { type: "required", message: "Email is required" },
          {
            type: "async",
            params: { endpoint: "/api/validate/email" },
            message: "Email already exists",
          },
        ],
        placeholder: "your.email@example.com",
      },
      {
        id: "password",
        type: {
          kind: "text",
          variant: "password",
          constraints: {
            minLength: 8,
            maxLength: 20,
          },
        },
        label: "Password",
        validation: [
          { type: "required", message: "A password is required to proceed" },
        ],
        placeholder: "Super duper secret password here",
      },
      {
        id: "country",
        type: {
          kind: "select",
          variant: "single",
          options: [
            { value: "us", label: "United States" },
            { value: "ca", label: "Canada" },
            { value: "uk", label: "United Kingdom" },
            { value: "de", label: "Germany" },
          ],
        },
        label: "Country",
        validation: [{ type: "required", message: "Please select a country" }],
      },
    ],
  },

  "contact-form": {
    id: "contact-form",
    metadata: {
      title: "Contact Us",
      submitEndpoint: "/api/contact",
      submitMethod: "POST",
    },
    fields: [
      {
        id: "name",
        type: {
          kind: "text",
          variant: "single-line",
          constraints: { minLength: 2 },
        },
        label: "Your Name",
        validation: [{ type: "required", message: "Name is required" }],
        placeholder: "Enter your full name",
      },
      {
        id: "message",
        type: {
          kind: "text",
          variant: "multi-line",
          constraints: { minLength: 10, maxLength: 1000 },
        },
        label: "Message",
        validation: [{ type: "required", message: "Message is required" }],
        placeholder: "What do you want to tell us?",
      },
    ],
  },
};
