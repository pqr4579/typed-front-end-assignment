import React, { ReactNode } from "react";
import styled from "styled-components";

const ModalOverlay = styled.div<{ opacity?: number }>(({ opacity }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  position: "absolute",
  justifyContent: "center",
  backgroundColor: "rgba(0,0,0,0.5)",
  opacity: opacity ?? 0,
  top: 0,
  left: 0,
  zIndex: 99999,
}));

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  opacity?: number;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, isOpen, opacity }) => {
  return (
    <>{isOpen ? <ModalOverlay opacity={opacity} onClick={onClose} /> : null}</>
  );
};

export default Overlay;
