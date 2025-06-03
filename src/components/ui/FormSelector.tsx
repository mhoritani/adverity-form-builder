import { useState } from "react";
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

const options = [
  {
    id: "user-registration",
    title: "Personal Information",
    text: "Basic personal details and contact information",
    icon: <IconClipboardText size={32} stroke={2} />,
  },
  {
    id: "contact-form",
    title: "Employment History",
    text: "Work experience and employment details",
    icon: <IconBriefcase size={32} stroke={2} />,
  },
  {
    id: "education-form",
    title: "Education Background",
    text: "Academic qualifications and certifications",
    icon: <IconSchool size={32} stroke={2} />,
  },
];

export const FormSelector: React.FC<FormSelectorProps> = ({
  onFormSelection,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const onSelection = (index: number) => {
    setSelected(index);
    onFormSelection(options[index].id);
  };

  return (
    <Flex justify="center" gap={theme.spacing.lg}>
      {options.map((option, index: number) => (
        <Card
          key={option.id}
          title={option.title}
          text={option.text}
          icon={option.icon}
          selected={selected === index}
          onClick={() => onSelection(index)}
        />
      ))}
    </Flex>
  );
};
