import { useState } from "react";
import { FormLoader } from "./components/loaders";
import { Button } from "./components/ui";

import "./App.css";

function App() {
  const [formId, setFormId] = useState<string | undefined>();

  return (
    <>
      <h1>Formity.</h1>
      <p>
        This application dynamically fetches and displays form schemas based on
        the provided form ID.
      </p>
      <p>
        <p>Choose a form!</p>

        <Button onClick={() => setFormId("user-registration")}>
          Registration Form
        </Button>
        <Button onClick={() => setFormId("contact-form")}>Contact Form</Button>
        <Button onClick={() => setFormId("nahhhh")}>Non-existing Form</Button>
      </p>

      {formId && <FormLoader formId={formId} />}
    </>
  );
}

export default App;
