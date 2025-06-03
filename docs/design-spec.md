# Dynamic Form System Architecture Design
## Summary

This design doc outlines a scalable, maintainable architecture for rendering dynamic forms driven by backend JSON schemas. The proposed solution relies on type safety, extensibility, and consistent user experience while accommodating complex business requirements typical in data-intensive applications.

## Tech Stack
- React + Typescript + Vite (CSR only)
- Emotion (Styled Components) as a CSS in JS solution with theme support for potential design tokens
- TanStack Query for robust schema fetching with built-in caching, error handling, and loading states
- Jest/Vitest, React Testing Library and Playwright for testing

---

## 1. Schema Definition

The top-level the schema follows a basic but hierachical approach, where the form itself consists of an `id`, `metadata` which might hold a form `title` and a `description`, as well as the more complex part, which are the defined fields and their respective field types.

### Core Schema Structure
```typescript
interface FormSchema {
  id: string;
  metadata: FormMetadata;
  fields: FieldDefinition[];
}

interface FormMetadata {
  title: string;
  description?: string;
  submitEndpoint: string;
  submitMethod: "POST" | "PUT" | "PATCH";
}

interface FieldDefinition {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  validation: ValidationRule[];
  placeholder?: string;
}
```

### Field Type System

The `FieldType` is a union made up of all different, more specific FieldTypes. This makes it type safe but leaves room for extending it in the future, considering different fields having different needs. The `kind` and `variant` property will be recurring on most, but it is possible to extend and add other one-off properties when needed. I also considered constraints part of each specific FieldType and decided to split more generic validation out.

```typescript

interface TextFieldType {
  kind: "text";
  variant: "single-line" | "multi-line" | "email" | "password" | "number";
  constraints?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

interface SelectFieldType {
  kind: "select";
  variant: "single"; // Might support multi-select at some point
  options: SelectOption[];
  searchable?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

interface CheckboxFieldType {
  kind: "checkbox";
}

```

### Validation Rules

The remaining non-field-specific validation rules will be composable and generic
```typescript
interface ValidationRule {
  type: 'required' | 'custom' | ...;
  message: string;
}

// Example field definition:
const emailField: FieldDefinition = {
  id: 'email',
  label: 'Email Address',
  type: {
    kind: 'text',
    variant: 'email',
    constraints: {
      maxLength: 255
    }
  },
  validation: [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', params: { pattern: '^[^@]+@[^@]+\.[^@]+
  ]
}
```

#### Design Rationale

- Self-contained field types where each field type contains its specific configuration, avoiding separate configuration objects. This makes it a bit more verbose but reduces overall complexity and makes it more extensible.
- While this design focuses on TypeScript compile-time safety, in a production system we could add runtime validation of API responses using a library like Zod or implement manual type guards to handle incorrect backend data.

---

## 2. Frontend Architecture

### Component Hierarchy

```
FormLoader
├──	FormRenderer (Container)
│	├── FormHeader (Title, Description)
	├── Form Provider (React Hook Form Context)
	│	├── FieldRenderer[] (Like a Field Factory)
	│	│   ├── TextField
	│	│   ├── SelectField
	│	│   ├── CheckboxField
	│	│   └── [ExtensibleFieldTypes]
```
![[Adverity Component Layout]]

### Responsibilities

- **FormLoader:** Handles mechanics around showing loading skeletons, error components or the actual form renderer.
- **FormRenderer:** Orchestrates the entire form using React Hook Form's `useForm` hook for state management and validation.
- **FormProvider:** React Hook Form's context provider that enables form state access throughout the component tree.
- **FieldRenderer:** Acts as a factory, determining which component to render based on field type and converting our schema validation rules to React Hook Form's format.
- **Individual Field Components:** Handle field-specific rendering and display validation errors.

---

## 3. State Management & Validation

### React Hook Form Integration
We leverage React Hook Form for optimal performance and built-in validation capabilities:

```typescript
const FormRenderer: React.FC<FormRendererProps> = ({ schema, initialValues, onSubmit }) => {
  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields */}
      </form>
    </FormProvider>
  );
};
```

### Dynamic Validation Rules
Our schema validation rules will need to be converted to React Hook Form's validation format:

```typescript
const convertValidationRules = (field: FieldDefinition): RegisterOptions => {
  const rules: RegisterOptions = {};

  field.validation.forEach(rule => {
    switch (rule.type) {
      case 'required':
        rules.required = rule.message;
        break;
    }
    ...
  });

  return rules;
};
```

### Field-Specific Validation
Since each form field can have its own specific constraints/validation requirements, these also need to be mapped case-by-case

```typescript
const getFieldSpecificValidation = (field: FieldDefinition): RegisterOptions => {
  const baseRules = convertValidationRules(field);

  // Add field-type specific validation
  switch (field.type.kind) {
    case 'text':
      if (field.type.constraints?.minLength) {
        baseRules.minLength = {
          value: field.type.constraints.minLength,
          message: `Minimum ${field.type.constraints.minLength} characters required`
        };
      }
      ...
  }

  return baseRules;
};
```

### Error Display Strategy
Each field will wrap itself in a reusable FieldWrapper that contains a consistent label and can display the validation error messages provided by React Hook Form
```typescript
<Wrapper>
  <Flex>
	<Label htmlFor={definition.id}>
	  {definition.label}
	  {isRequired && <RequiredMark>*</RequiredMark>}
	</Label>

	{children} // This will be the real form element

	{error && <ErrorMessage>{error}</ErrorMessage>}
  </Flex>
</Wrapper>
```

---

## 4. Data Fetching

### TanStack Query Integration
We use TanStack Query for robust schema fetching with built-in caching, error handling, and loading states.

### Schema Versioning and Cache Invalidation
While not considered in my POC, each form schema could theoretically contain a version property. We could use TanStack query to periodically refetch the schema, compare the version and if there is a new one, invalidate the query and refresh the state.

### Loading States and Error Handling
Handled through the FormLoader component. Loading states could use a proper Skeleton loading component for a better user experience.

### Benefits of TanStack Query Approach
**Built-in Features:**
- Automatic caching with configurable invalidation
- Background refetching
- Offline support with cache persistence
- Loading and error states management

**Performance Benefits:**
- Reduces redundant network requests
- Intelligent cache management

**Developer Experience:**
- Built-in TypeScript support
- Great DevTools integration
- Minimal boilerplate code

---

## 5. Styling & Theming

### Design System Integration
We leverage a token-based design system for consistent styling across all dynamic forms. While in my POC these are statically created, they would most likely be pulled in as a separate package. A future improvement would be another form-specific abstraction theming layer.

I tried to utilize all the standard tokens like `color`, `elevation`, `radius`, `spacing` and `typography`

Sidenote: The way we register each form element with React Hook Form also allows us to easily swap them out for potential design system components in the future.

```typescript
// Design tokens
export const colors = {
  primary: {
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#10b77f",
    600: "#059669",
    700: "#0d9488",
    800: "#047857",
    900: "#0f766e",
  },

  text: {
    primary: "#ffffff",
    secondary: "#a1a1aa",
    muted: "#71717a",
    inverse: "#09090b",
  },
  ...
}
```

### Styling Strategy: CSS-in-JS with Design Tokens

Emotion with design tokens for maximum flexibility and performance. Honestly, my first time in a long time trying out styled components. The integration with design tokens seems nice together with type support and a general dynamic approach to styling compared to basics css pre-processors. The downside that needs to be considered here is performance since all the styles will be bundled up, but this seems to be mitigated by using Emotion over styled components significantly.

```typescript
import styled from "@emotion/styled";
import { FieldWrapper } from "./FieldWrapper";
import { focusOutline } from "../../styles/mixins";

const StyledInput = styled.input(({ theme }) => ({
  backgroundColor: theme.colors.background.secondary,
  border: `1px solid ${theme.colors.border.default}`,
  borderRadius: theme.radius.md,
  color: theme.colors.text.primary,
  fontSize: theme.typography.fontSize.sm,
  padding: `${theme.spacing.sm}`,
  width: "100%",
  ...focusOutline(theme),
}));

const StyledTextArea = StyledInput.withComponent("textarea");
```

---

## 6. Testing Strategy
Due to time limitations and this being a take-home, this POC will only include very basic testing (if at all).
Nevertheless, I want to emphasize that in production work environments I certainly do believe in the value of good tests and want to lay out a general strategy.

### Testing Pyramid Approach
```
           E2E Tests (10%)
       Integration Tests (20%)
    Unit Tests (70%)
```

### Unit Testing
Largely focused on the actual field components. Regarding libraries I am most comfortable with jest and React Testing Library as an industry standard with excellent React integration and React Hook Form compatibility. As a chance to try out something new I used vitest this time since I already bootstrapped the project with Vite and the API is largely interchangeable.

```typescript
const definition: FieldDefinition = {
  id: "email",
  type: { kind: "text", variant: "email" },
  label: "Email Address",
  validation: [{ type: "required", message: "Email is required" }],
};

describe("#TextFieldRenderer", () => {
  let input: HTMLInputElement;

  beforeEach(() => {
    // renderWithForm takes care of making sure the Form and Theme Contexts are available
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

```

### Integration Testing
Focused on putting our building blocks together, like submitting a full form, testing for validation etc.

```typescript
describe('React Hook Form Integration', () => {
  it('should handle form submission with validation', async () => {
    const mockSubmit = jest.fn();
    const schema: FormSchema = {
      id: 'test-form',
      metadata: {
        title: 'Test Form',
        submitEndpoint: '/api/submit',
        submitMethod: 'POST'
      },
      fields: [
        {
          id: 'email',
          type: { kind: 'text', variant: 'email' },
          label: 'Email',
          validation: [
            { type: 'required', message: 'Email is required' }
          ]
        }
      ]
    };

    render(<FormRenderer schema={schema} onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    });
  });
});
```

**TanStack Query Integration Testing:**
I would most likely test this through the FormLoader
```typescript

// Set up MSW server
const server = setupServer(...);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("FormLoader", () => {
  it("fetches and displays form schema", async () => {
    renderWithClient(<FormLoader formId="user-registration" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/User Registration/i)).toBeInTheDocument()
    );
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
  });

  it("shows error UI if fetch fails", async () => {
    renderWithClient(<FormLoader formId="non-existent-form" />);
    await waitFor(() =>
      expect(screen.getByText(/Error loading form schema/i)).toBeInTheDocument()
    );
  });
});
```

### End-to-End Testing

In order to test full user journeys and potentially take visual regression snapshots we can use Playwright, Puppeteer or Cypress. While their API are similar, Playwright has great implementations for multi-browser testing and debugging capabilities.

```typescript
// Using Playwright
test('should complete form submission flow', async ({ page }) => {
  await page.goto('/form/user-registration');

  await page.waitForSelector('[data-testid="form-renderer"]');

  // Fill out form
  await page.fill('[data-testid="field-email"]', 'test@example.com');
  await page.fill('[data-testid="field-password"]', 'SecurePass123!');
  await page.selectOption('[data-testid="field-country"]', 'US');

  // Submit form
  await page.click('[data-testid="submit-button"]');

  // Verify success
  await page.waitForSelector('[data-testid="success-message"]');
  expect(await page.textContent('[data-testid="success-message"]'))
    .toContain('Registration successful');
});
```

### Critical Test Coverage Areas

1. Schema Parsing and ensuring all field types render correctly
2. Validation
3. Form state updates and persistence
4. Error Handling
5. A11y for screen reader compatibility, keyboard navigation
6. Critical user flows across browsers and potentially visual snapshot tests

---

## 7. Extensibility & Trade-offs

### Multi-step Form Support
To solve this we could potentially introduce a MultiStep renderer, which takes in the schema as it did before, but in addition a steps definition that includes a list of field ids for each step while keeping track of the full form state.
```typescript
interface StepDefinition {
  id: string;
  title: string;
  fields: string[]; // Field IDs for this step
  validation?: 'none' | 'on-next' | 'on-submit';
  conditional?: ConditionalRule[];
}

const MultiStepFormRenderer: React.FC<{
  schema: FormSchema;
  steps: StepDefinition[];
}> = ({ schema, steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const formState = useFormState(schema);

  const currentStepFields = schema.fields.filter(
    field => steps[currentStep].fields.includes(field.id)
  );

  return (
    <div>
      <StepIndicator steps={steps} currentStep={currentStep} />
      <FieldRenderer fields={currentStepFields} />
      <StepNavigation
        canGoNext={isStepValid(currentStep, formState)}
        onNext={() => setCurrentStep(prev => prev + 1)}
        onPrevious={() => setCurrentStep(prev => prev - 1)}
      />
    </div>
  );
};
```

### Potential Shortcomings
#### Bundle Size

**Trade-off:** Including all field types increases bundle size
**Possible Solution:** Implement code splitting with lazy loading:
```typescript
const fieldComponents = {
  text: React.lazy(() => import('./fields/TextFieldRenderer')),
  select: React.lazy(() => import('./fields/SelectFieldRenderer')),
  ...
};

const LazyFieldRenderer: React.FC<FieldProps> = ({ definition, ...props }) => {
  const Component = fieldComponents[definition.type.kind];

  return (
    <Suspense fallback={<FieldSkeleton />}>
      <Component definition={definition} {...props} />
    </Suspense>
  );
};
```
---

## Conclusion

This architecture balances scalability, maintainability, and developer experience while providing a solid foundation for complex form requirements. The modular design enables incremental adoption and future enhancements without major refactoring.

I hope this case study meets your expectations. Thanks for your time and considering my application.
