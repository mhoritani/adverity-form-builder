import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "@emotion/styled";

import type { FormSchema } from "../../types";

interface SchemaCodeBlockProps {
  schema: FormSchema;
}

const CodeBlock = styled.div(({ theme }) => ({
  borderRadius: theme.radius.md,
  marginTop: theme.spacing.lg,
  fontSize: theme.typography.fontSize.sm,
}));

export const SchemaCodeBlock: React.FC<SchemaCodeBlockProps> = ({ schema }) => (
  <CodeBlock>
    <SyntaxHighlighter language="json" style={atomDark}>
      {JSON.stringify(schema, null, 2)}
    </SyntaxHighlighter>
  </CodeBlock>
);
