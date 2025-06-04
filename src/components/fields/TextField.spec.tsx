import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithForm } from "../../testing/utils";
import { TextField } from "./TextField";

import type { FieldDefinition } from "../../types";

const definition: FieldDefinition = {
  id: "email",
  type: { kind: "text", variant: "email" },
  label: "Email Address",
  validation: [{ type: "required", message: "Email is required" }],
};

describe("#TextFieldRenderer", () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    renderWithForm(<TextField definition={definition} />);
    input = screen.getByLabelText(/Email Address/);
  });

  describe("#basic", () => {
    it("should render an input with associated label and correct type", () => {
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "email");
    });
  });
});
