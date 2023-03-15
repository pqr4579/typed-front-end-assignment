import React, { useState } from "react";
import styled from "styled-components";
import { Resource } from "../../atom/resource";
import { TypedIconButton } from "typed-design-system";

const ViewerContainer = styled.div({
  display: "flex",
  flex: 1,
  maxHeight: "100vh",
  flexDirection: "column",
  overflowY: "scroll",
  overflowX: "hidden",
  position: "relative",
});

const ViewerHeader = styled.div({
  display: "flex",
  position: "absolute",
  top: 0,
  boxShadow: `0px 2px 5px rgba(0, 0, 0, 0.1)`,
  width: "100%",
  minHeight: "50px",
  maxeight: "50px",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "space-between",
  paddingLeft: 16,
  paddingRight: 16,
  backgroundColor: "#FFF",
});

const ViewContentWrapper = styled.div({
  display: "flex",
  flex: 1,
  paddingTop: 50,
  height: "100%",
  overflowY: "scroll",
  overflowX: "hidden",
  alignItems: "center",
  justifyContent: "center",
});

const UrlViwer = styled.iframe({});

const ImageViewer = styled.img({
  objectFit: "cover",
  maxWidth: "100%",
});

const URL = "https://typed.do/api/view?url=";

interface ResourceViewerProps {
  selectedResource: Resource | null;
  onClose: () => void;
}

const ResourceViewer: React.FC<ResourceViewerProps> = ({
  selectedResource,
  onClose,
}) => {
  const [isViewerLoading, setIsViewerLoading] = useState<boolean>(false);

  return (
    <ViewerContainer>
      {selectedResource && (
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
      )}
      <ViewContentWrapper>
        {selectedResource && selectedResource.type === "url" && (
          <UrlViwer
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
        )}
        {selectedResource && selectedResource.type === "image" && (
          <ImageViewer alt="img-viewer" src={selectedResource?.resource} />
        )}
      </ViewContentWrapper>
    </ViewerContainer>
  );
};

export default ResourceViewer;
