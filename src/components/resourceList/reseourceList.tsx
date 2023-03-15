import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { colors } from "typed-design-system";

import { Resource } from "../../atom/resource";
import { FlatButton, Space } from "../../designComponent";
import useResource from "../../hooks/useResource";
import NewResourceInput from "../newResourceInput/newResourceInput";
import ResourceItem from "../resourceItem/resourceItem";

const ResourceListContainer = styled.div({
  display: "flex",
  backgroundColor: colors.gray97().toString(),
  flexDirection: "column",
  width: "280px",
  maxWidth: "280px",
  height: "100vh",
  position: "relative",
  overflow: "scroll",
});

const ResourceOption = styled.div({
  display: "flex",
  backgroundColor: "#FFF",
  alignItems: "center",
  maxWidth: "100%",
  height: "50px",
  boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.1)`,
  position: "relative",
  top: 0,
  paddingLeft: 10,
  paddingRight: 10,
});

const ImageFileUploadInput = styled.input({
  width: 0,
  height: 0,
});

const ImageInputButton = styled(FlatButton)({});

const ItemsWrapper = styled.div({
  padding: "0px 10px 0px 10px",
});

interface ResoruceListProps {
  selectedResource: Resource | null;
  setSelectedResource: (resource: Resource | null) => void;
}

const ResourceList: React.FC<ResoruceListProps> = ({
  selectedResource,
  setSelectedResource,
}) => {
  const { resources, addResource } = useResource();

  const [isOpen, setIsOpen] = useState(false);

  const enrolledResource = useMemo(() => {
    if (resources) {
      return Object.values(resources).sort((resourceA, resourceB) => {
        return resourceA.created_at - resourceB.created_at;
      });
    } else {
      return [];
    }
  }, [resources]);

  const initSelectedFile = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = "";
  };

  const onImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedImage = e.target.files;

      for (let i = 0; i < uploadedImage.length; i++) {
        const fileReader = new FileReader();

        const imageFile = uploadedImage.item(i);
        if (imageFile) {
          fileReader.readAsDataURL(imageFile);

          fileReader.onload = async (e) => {
            await addResource({
              name: imageFile.name,
              type: "image",
              resource: e.target?.result?.toString() as string,
            });
          };
        }
      }
    }
  };

  return (
    <ResourceListContainer>
      <ResourceOption>
        <FlatButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          URL 추가
        </FlatButton>
        <Space size={10} />
        <ImageInputButton>
          <label htmlFor="image_file_uploador">이미지 추가</label>
          <ImageFileUploadInput
            id={"image_file_uploador"}
            accept="image/jpg , image/png "
            type={"file"}
            multiple
            onClick={initSelectedFile}
            onChange={onImageFileUpload}
          />
        </ImageInputButton>
        <NewResourceInput
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </ResourceOption>
      <ItemsWrapper>
        {enrolledResource.map((resource) => {
          return (
            <ResourceItem
              onSelect={setSelectedResource}
              key={resource.name}
              resource={resource}
              isSelected={selectedResource?.resource === resource.resource}
            />
          );
        })}
      </ItemsWrapper>
    </ResourceListContainer>
  );
};

export default ResourceList;
