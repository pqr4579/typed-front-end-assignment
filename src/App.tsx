import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import ResourceList from "./components/resourceList/reseourceList";
import ResourceViewer from "./components/resourceViewer/viewer";
import { Resource } from "./atom/resource";

import "react-toastify/dist/ReactToastify.css";

const PageContainer = styled.div({
  display: "flex",
  flex: 1,
  minHeight: "100vh",
  backgroundColor: "#C4C4C4",
});
const App: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );

  const onCloseViewer = () => {
    setSelectedResource(null);
  };

  return (
    <PageContainer>
      <ResourceList
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
      />
      <ResourceViewer
        selectedResource={selectedResource}
        onClose={onCloseViewer}
      />
      <ToastContainer />
    </PageContainer>
  );
};

export default App;
