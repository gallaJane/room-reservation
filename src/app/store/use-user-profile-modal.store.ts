import { create } from 'zustand';

type UserProfileModalStoreProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useUserProfileModal = create<UserProfileModalStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUserProfileModal;