import React, { useState } from "react";
import styled from "styled-components";
import { colors, TypedIconButton } from "typed-design-system";
import { Resource } from "../../atom/resource";
import { Space } from "../../designComponent";
import useResource from "../../hooks/useResource";

const ResourceItemContainer = styled.div<{ isSelected?: boolean }>(
  ({ isSelected }) => ({
    display: "flex",
    position: "relative",
    marginTop: 10,
    flexDirection: "column",
    backgroundColor: "#FFF",
    borderRadius: 10,
    maxHeight: 90,
    height: 90,
    cursor: "pointer",
    paddingBottom: 15,
    border: isSelected ? `1px solid ${colors.blue50().toString()}` : "none",
  })
);

const ResourceContent = styled.div({
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  fontSize: 14,
  fontWeight: 400,
  margin: "12px 12px 0px 12px",
});

const ResourceInput = styled.input({
  height: 30,
  margin: "12px 12px 0px 12px",
  padding: "0px 8px 0px 8px",
  borderRadius: "3px",
  border: "none",
  backgroundColor: "#FFF",
  fontSize: 14,
  lineHeight: 16,
  fontWeight: 400,
  ":focus": {
    backgroundColor: colors.gray97().toString(),
    outline: `1px solid ${colors.blue50().toString()}`,
  },
});

const ButtonWrapper = styled.div({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  bottom: 12,
  right: 12,
});

const EditButton = styled(TypedIconButton)({
  border: "none",
  cursor: "pointer",
});

const DeleteButton = styled(TypedIconButton)({
  border: "none",
  cursor: "pointer",
});

interface ResourceItemProps {
  type?: "image" | "url";
  resource: Resource;
  value?: string;
  setValue?: () => void;
  isSelected?: boolean;
  onSelect: (r: Resource | null) => void;
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  type,
  resource,
  isSelected,
  onSelect,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [resourceName, setResourceName] = useState<string>(resource.name);

  const { removeResource, editResource } = useResource();

  const onBlurSaveChanged = async () => {
    if (resourceName !== resource.name) {
      if (resourceName === "") {
        alert("리소스의 이름은 공백이 될 수 없습니다.");
        setResourceName(resource.name);
      } else {
        await editResource({
          resourceId: resource.name,
          newName: resourceName,
          errorCallback: () => {
            setResourceName(resource.name);
          },
        });
      }
    }
  };

  return (
    <ResourceItemContainer
      isSelected={isSelected}
      onClick={() => {
        onSelect(resource);
      }}
    >
      {!isFocused ? (
        <ResourceContent>{resourceName}</ResourceContent>
      ) : (
        <ResourceInput
          multiple={false}
          value={resourceName}
          onChange={(e) => {
            setResourceName(e.target.value);
          }}
          onKeyDown={() => {}}
          autoFocus={true}
          onBlur={async () => {
            setIsFocused(false);
            await onBlurSaveChanged();
          }}
        />
      )}
      <Space size={16} />
      <ButtonWrapper>
        <EditButton
          size={25}
          css
          icon="edit_19"
          iconSize={17}
          onClick={(e) => {
            e.stopPropagation();
            if (!isFocused) {
              setIsFocused(true);
            }
          }}
        />
        <Space size={6} />
        <DeleteButton
          size={25}
          css
          icon="trash_19"
          iconSize={17}
          onClick={async (e) => {
            e.stopPropagation();
            if (window.confirm("리소스를 정말 삭제하시겠습니까?")) {
              await removeResource(resource.name);
              onSelect(null);
            }
          }}
        />
      </ButtonWrapper>
    </ResourceItemContainer>
  );
};

export default ResourceItem;
