import { http, HttpResponse } from "msw";
import { mockFormSchemas } from "./mockData";

export const handlers = [
  // RETURN FORM
  http.get("/api/forms/:formId/schema", async ({ params }) => {
    const { formId } = params;

    const delay = Math.random() * 1000 + 500;
    const schema = mockFormSchemas[formId as string];

    if (!schema) {
      return HttpResponse.json(
        { error: "Form not found" },
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(schema));
      }, delay);
    });
  }),

  // SUBMIT FORM
  http.post("/api/users", async ({ request }) => {
    const body = await request.json();
    console.log("Form submitted:", body);

    return HttpResponse.json({
      success: true,
      id: "user_" + Date.now(),
    });
  }),
];
