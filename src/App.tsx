import { useState } from "react";

import { FormLoader } from "./components/loaders";
import { FormSelector, Logo } from "./components/ui";
import { Flex } from "./components/layout";

import { theme } from "./styles/theme";

import "./App.css";

function App() {
  const [formId, setFormId] = useState<string | undefined>();

  return (
    <>
      <Flex
        direction="column"
        gap={theme.spacing.xl}
        align="center"
        justify="center"
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={theme.spacing.lg}
        >
          <Logo />
          <h2>Schema-Driven Form Generator</h2>
          <p>
            Select a form type to generate a dynamic form based on JSON schema
          </p>
          <FormSelector onFormSelection={setFormId} />
        </Flex>

        {formId && <FormLoader formId={formId} />}
      </Flex>
    </>
  );
}

export default App;
