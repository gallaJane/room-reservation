import { create } from 'zustand';

type SignUpModalStoreProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSignUpModal = create<SignUpModalStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useSignUpModal;