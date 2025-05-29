import styled from "@emotion/styled";
import { radius } from "../../styles/tokens/radius";
import { focusOutline } from "../../styles/mixins";

const StyledCard = styled.div(({ theme }) => {
  const { colors, spacing, elevation, typography } = theme;

  return {
    cursor: "pointer",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
    borderRadius: radius.md,
    boxShadow: elevation.md,
    padding: spacing.md,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    color: colors.text.primary,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,

    "&:hover": {
      boxShadow: elevation.lg,
      backgroundColor: colors.background.tertiary,
    },

    "& h2": {
      fontSize: typography.fontSize.lg,
      marginBottom: spacing.sm,
    },

    "& p": {
      marginBottom: spacing.md,
      color: colors.text.secondary,
    },

    "& .card-icon": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary[900],
      borderRadius: radius.full,
      padding: spacing.sm,
    },

    ...focusOutline(theme),
  };
});

export interface CardProps {
  title: string;
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, text, icon, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <StyledCard
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {icon && <div className="card-icon">{icon}</div>}
      <h2>{title}</h2>
      <p>{text}</p>
    </StyledCard>
  );
};
