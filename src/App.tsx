import React from "react";
import styled from "styled-components";

const PageContainer = styled.div({
  display: "flex",
  flex: 1,
  minHeight: "100vh",
  maxWidth: "100vw",
});

const App: React.FC = () => {
  return <PageContainer></PageContainer>;
};

export default App;
