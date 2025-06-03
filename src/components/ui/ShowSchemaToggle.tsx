import { Button } from "./Button";
import { IconCode, IconEyeOff } from "@tabler/icons-react";

export interface ShowSchemaToggleProps {
  visible: boolean;
  onToggle: (visible: boolean) => void;
}

export const ShowSchemaToggle: React.FC<ShowSchemaToggleProps> = ({
  visible,
  onToggle,
}) => {
  return (
    <Button
      icon={visible ? <IconEyeOff size={18} /> : <IconCode size={18} />}
      onClick={() => onToggle(!visible)}
      style={{ position: "absolute", right: 0 }}
    >
      {visible ? "Hide Schema" : "Show Schema"}
    </Button>
  );
};
