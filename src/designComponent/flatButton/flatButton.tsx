import React from "react";
import styled from "styled-components";
import { colors } from "typed-design-system";

const StyledButton = styled.button({
  textAlign: "center",
  borderRadius: "5px",
  border: `1px solid ${colors.gray90()}`,
  height: "30px",
  width: "125px",
  backgroundColor: "#FFF",
  fontWeight: 400,
  fontSize: 14,
  cursor: "pointer",
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: "outline" | "contain";
  isFull?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  buttonType,
  isFull,
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
