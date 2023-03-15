import React, { useState } from "react";
import styled from "styled-components";
import { Resource } from "../../atom/resource";
import { TypedIconButton } from "typed-design-system";

const ViewerContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
});

const ViewerHeader = styled.div({
  display: "flex",
  boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.1)`,
  height: "50px",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: "#FFF",
});

const URL = "https://typed.do/api/view?url=";

interface ResourceViewerProps {
  selectedResource?: Resource | null;
  onClose: () => void;
}

const ResourceViewer: React.FC<ResourceViewerProps> = ({
  selectedResource,
  onClose,
}) => {
  const [isViewerLoading, setIsViewerLoading] = useState<boolean>(false);

  return (
    <ViewerContainer>
      {selectedResource && selectedResource.type === "url" && (
        <>
          <ViewerHeader>
            {selectedResource?.name}
            <TypedIconButton
              onClick={onClose}
              icon="close_19"
              style={{
                border: "none",
              }}
              css
              size={25}
              iconSize={20}
            />
          </ViewerHeader>
          <iframe
            onLoad={() => {
              setIsViewerLoading(false);
            }}
            onLoadStart={() => {
              setIsViewerLoading(true);
            }}
            title={selectedResource?.type}
            frameBorder={0}
            sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"}
            src={URL + selectedResource.resource}
            width="100%"
            height="100%"
          />
        </>
      )}
    </ViewerContainer>
  );
};

export default ResourceViewer;
