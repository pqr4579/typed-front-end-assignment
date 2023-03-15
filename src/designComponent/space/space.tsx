import React from "react";
import styled from "styled-components";

const Div = styled.div<SpaceProps>(({ size }) => ({
  width: size,
  height: size,
}));

interface SpaceProps {
  size: number;
}

const Space: React.FC<SpaceProps> = ({ size }) => {
  return <Div size={size} />;
};

export default Space;
