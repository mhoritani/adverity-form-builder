import styled from "@emotion/styled";
import type { ReactNode, CSSProperties } from "react";

interface FlexProps {
  direction?: CSSProperties["flexDirection"];
  gap?: CSSProperties["gap"];
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  children: ReactNode;
}

const StyledFlex = styled.div<FlexProps>(
  ({ direction = "row", gap = 0, align, justify }) => ({
    display: "flex",
    flexDirection: direction,
    gap,
    alignItems: align,
    justifyContent: justify,
  })
);

export const Flex = ({
  direction = "row",
  gap = 0,
  align,
  justify,
  children,
}: FlexProps) => (
  <StyledFlex direction={direction} gap={gap} align={align} justify={justify}>
    {children}
  </StyledFlex>
);
