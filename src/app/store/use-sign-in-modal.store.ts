import { create } from 'zustand';

type SignInModalStoreProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSignInModal = create<SignInModalStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useSignInModal;