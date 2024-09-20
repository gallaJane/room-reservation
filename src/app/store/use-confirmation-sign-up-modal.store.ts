import { create } from 'zustand';

type useConfirmationSignUpModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useConfirmationSignUpModal = create<useConfirmationSignUpModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useConfirmationSignUpModal;