import {
  IconBriefcase,
  IconClipboardText,
  IconSchool,
} from "@tabler/icons-react";
import { theme } from "../../styles/theme";
import { Flex } from "../layout";
import { Card } from "./Card";

export interface FormSelectorProps {
  onFormSelection: (formId: string) => void;
}

export const FormSelector: React.FC<FormSelectorProps> = ({
  onFormSelection,
}) => {
  return (
    <Flex justify="center" gap={theme.spacing.lg}>
      <Card
        title="Personal Information"
        text="Basic personal details and contact information"
        icon={<IconClipboardText size={32} stroke={2} />}
        onClick={() => onFormSelection("user-registration")}
      />

      <Card
        title="Employment History"
        text="Work experience and employment details"
        icon={<IconBriefcase size={32} stroke={2} />}
        onClick={() => onFormSelection("user-registration")}
      />

      <Card
        title="Education Background"
        text="Academic qualifications and certifications"
        icon={<IconSchool size={32} stroke={2} />}
        onClick={() => onFormSelection("user-registration")}
      />
    </Flex>
  );
};
