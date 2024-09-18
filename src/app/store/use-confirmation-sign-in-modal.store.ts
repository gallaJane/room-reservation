import { create } from 'zustand';

type useConfirmationSignInModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useConfirmationSignInModal = create<useConfirmationSignInModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useConfirmationSignInModal;