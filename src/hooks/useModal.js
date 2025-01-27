import { useContext } from 'react';
import { ModalContext } from '../components/ModalProvider';

export const useModal = () => useContext(ModalContext);
