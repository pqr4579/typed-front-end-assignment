import React, { ReactNode } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div({
  width: "100vw",
  height: "100vh",
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  opacity: 0,
  top: 0,
  left: 0,
  zIndex: 99999,
});

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, isOpen }) => {
  return <>{isOpen ? <ModalOverlay onClick={onClose} /> : null}</>;
};

export default Overlay;
