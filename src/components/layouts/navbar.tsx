'use client'

import React, {
    useCallback,
    useEffect
} from 'react'

import useSignUpModal from '@/app/store/use-sign-up-modal.store';
import useSignInModal from '@/app/store/use-sign-in-modal.store';
import useMenu from '@/app/store/use-menu.store';

import { useCurrentUserStore } from '@/app/store//use-current-user.store';

import { Session } from "next-auth";

import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

type NavBarProps = {
    currentUser: Session["user"] | undefined;
}


const Navbar = ({ currentUser }: NavBarProps) => {
    const signUpModal = useSignUpModal();
    const signInModal = useSignInModal();
    const menu = useMenu();

    const { setCurrentUser, clearUser } = useCurrentUserStore();


    useEffect(() => {
        if (currentUser) {
            setCurrentUser(currentUser);
        } else {
            clearUser();
        }
    }, [currentUser, setCurrentUser, clearUser]);

    const handleSignInButtonClick = useCallback(() => {
        if (menu.isOpen) {
            menu.onClose();
        }
        if (!currentUser) {
            signInModal.onOpen();
        }
    }, [currentUser, signInModal, menu]);

    const handleSignUpButtonClick = useCallback(() => {
        if (menu.isOpen) {
            menu.onClose();
        }
        if (!currentUser) {
            signUpModal.onOpen();
        }
    }, [currentUser, signUpModal, menu]);


    return (
        <div className='sticky top-0 border border-b-primary/10 bg-secondary'>
            <Container>
                <div className='flex justify-between items-center'>
                    <div className='flex item-center gap-1 cursor-pointer'>
                        <Logo />
                        <div className='font-bold text-xl'>CoWork Rooms</div>
                    </div>
                    <div className='flex gap-3 items-center'>

                        {!currentUser && (
                            <>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    onClick={handleSignInButtonClick}>Sign in</Button>
                                <Button
                                    size='sm'
                                    onClick={handleSignUpButtonClick}
                                >Sign up</Button>
                            </>

                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar;