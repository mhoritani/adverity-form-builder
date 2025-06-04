import { render } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";

import type { UseFormProps } from "react-hook-form";
import type { ReactElement } from "react";

export function renderWithForm(ui: ReactElement, formProps?: UseFormProps) {
  const Wrapper = ({ children }: React.PropsWithChildren) => {
    const methods = useForm(formProps);
    return (
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>{children}</FormProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
}
