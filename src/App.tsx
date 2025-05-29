import { useState } from "react";
import { FormLoader } from "./components/loaders";

import "./App.css";

function App() {
  const [formId, setFormId] = useState<string | undefined>();

  return (
    <>
      <h1>Welcome to the dynamic form fetcher.</h1>
      <p>
        This application dynamically fetches and displays form schemas based on
        the provided form ID.
        <br />
        To see the form in action, please choose one of the available forms.
      </p>
      <p>
        You can use the following form IDs to test:
        <button onClick={() => setFormId("user-registration")}>
          Registration Form
        </button>
        <button onClick={() => setFormId("contact-form")}>Contact Form</button>
        <button onClick={() => setFormId("nahhhh")}>Non-existing Form</button>
      </p>

      {formId && <FormLoader formId={formId} />}
    </>
  );
}

export default App;
