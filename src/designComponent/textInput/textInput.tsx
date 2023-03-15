import React from "react";
import styled from "styled-components";
import { colors } from "typed-design-system";
import Space from "../space/space";

const TextInputWrapper = styled.div({
  width: "100%",
  height: "fit-objects",
});

const ResourceInput = styled.input({
  display: "flex",
  height: 30,
  padding: "0px 8px 0px 8px",
  borderRadius: "3px",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: colors.gray97().toString(),
  border: `1px solid ${colors.gray90().toString()}`,
  fontSize: 14,
  lineHeight: 16,
  fontWeight: 400,
  ":focus": {
    border: "none",
    outline: `1px solid ${colors.blue50().toString()}`,
  },
});

const ErrorInfo = styled.div({
  fontSize: 12,
  color: colors.red50().toString(),
});

interface ResourceInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  validator?: (value: string) => boolean;
  errorInfo?: string;
  value: string;
  isValid: boolean;
}

const TextInput: React.FC<ResourceInputProps> = ({
  validator,
  value,
  errorInfo,
  isValid,
  ...props
}) => {
  return (
    <TextInputWrapper>
      <ResourceInput {...props} />
      {!isValid && (
        <>
          <Space size={8} />
          <ErrorInfo>{errorInfo}</ErrorInfo>
        </>
      )}
    </TextInputWrapper>
  );
};

export default TextInput;
