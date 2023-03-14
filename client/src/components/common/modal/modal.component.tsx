import React from 'react';
import { ModalBackground, ModalWrapper } from './moda.styled';

interface ModalProps {
  showModal: boolean;
  children: React.ReactNode;
}

export const Modal = ({ showModal, children }: ModalProps) => {
  if (!showModal) return null;

  return (
    <ModalBackground>
      <ModalWrapper>{children}</ModalWrapper>
    </ModalBackground>
  );
};
