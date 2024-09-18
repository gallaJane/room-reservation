
import { create } from 'zustand';
import { Session } from "next-auth";


type State = {
    currentUser: Session["user"] | undefined;
    setCurrentUser: (user: Session["user"] | undefined) => void;
    clearUser: () => void;
}

export const useCurrentUserStore = create<State>((set) => ({
    currentUser: undefined,
    setCurrentUser: (user) => set({ currentUser: user }),
    clearUser: () => set({ currentUser: undefined }),
}));
