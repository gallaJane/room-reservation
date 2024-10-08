import { create } from 'zustand';

type MenuProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useMenu = create<MenuProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useMenu;