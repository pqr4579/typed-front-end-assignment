import React, { useState, KeyboardEvent } from "react";
import TextInput from "../../designComponent/textInput/textInput";
import styled from "styled-components";
import { colors } from "typed-design-system";
import { replaceToEmbeddUrl, urlValidator } from "../../utils";
import Overlay from "../../designComponent/overlay/overlay";
import useResource from "../../hooks/useResource";

const NewUrlInputContainer = styled.div({
  display: "flex",
  position: "absolute",
  width: 250,
  minHeight: 30,
  padding: 5,
  backgroundColor: "#FFF",
  borderRadius: 5,
  top: 45,
  border: `1px solid ${colors.gray90()}`,
  zIndex: 9999999,
});

interface NewResourceInputProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewResourceInput: React.FC<NewResourceInputProps> = ({
  isOpen,
  onClose,
}) => {
  const [urlValue, setUrlValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const { addResource } = useResource();

  const onPressEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!urlValidator(urlValue)) {
        setIsValid(false);
        return;
      } else {
        setIsValid(true);

        const checkedUrl = replaceToEmbeddUrl(urlValue);

        await addResource({
          name: checkedUrl,
          resource: checkedUrl,
          type: "url",
        });
      }
    }
  };

  if (isOpen) {
    return (
      <>
        <Overlay isOpen onClose={onClose} />
        <NewUrlInputContainer>
          <TextInput
            value={urlValue}
            isValid={isValid}
            placeholder="URL 입력 (Enter시 저장됩니다.)"
            errorInfo="올바른 URL 주소가 아닙니다"
            autoFocus={true}
            onKeyDown={async (e) => {
              onPressEnter(e);
            }}
            onChange={(e) => {
              setUrlValue(e.target.value);
            }}
          />
        </NewUrlInputContainer>
      </>
    );
  }

  return <></>;
};

export default NewResourceInput;
