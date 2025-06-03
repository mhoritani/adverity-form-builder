import { useState } from "react";

import { FormLoader } from "./components/loaders";
import { FormSelector, FormWelcome } from "./components/ui";
import { Flex, Header } from "./components/layout";

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
          <Header />
          <FormSelector onFormSelection={setFormId} />
        </Flex>

        {!formId && <FormWelcome />}
        {formId && <FormLoader formId={formId} />}
      </Flex>
    </>
  );
}

export default App;
