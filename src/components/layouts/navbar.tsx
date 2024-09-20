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
import UserNav from '@/components/ui/user-nav';
import SearchInput from '@/components/ui/search-input';
import { NavMenu } from './nav-menu';

type NavBarProps = {
    currentUser: Session["user"] | undefined;
}


const Navbar = ({ currentUser }: NavBarProps) => {
    const signUpModal = useSignUpModal();
    const signInModal = useSignInModal();
    const menu = useMenu();

    const { setCurrentUser, clearUser } = useCurrentUserStore();

    const commonItems = [
        { label: 'Flowers', href: '/flowers', className: 'text-gray-500' },
        { label: 'Latest Sightings', href: '/latest-sightings', className: 'text-gray-500' },
        { label: 'Favorites', href: '/favorites', className: 'text-gray-500' }
    ];

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

    const toggle = useCallback(() => {
        if (menu.isOpen) {
            menu.onClose();
        } else {
            menu.onOpen();
        }
    }, [menu]);

    const handleNavItemClick = useCallback(() => {
        if (menu.isOpen) {
            menu.onClose();
        }
    }, [menu]);


    return (
        <div className='sticky top-0 border border-b-primary/10 bg-secondary'>
            <Container>
                <div className='flex justify-between items-center'>
                    <div className='flex item-center gap-1 cursor-pointer'>
                        <Logo />
                        <div className='font-bold text-xl'>CoWork Rooms</div>
                    </div>

                    <SearchInput />

                    <div className='flex gap-3 items-center'>
                        <div>
                            <NavMenu currentUser={currentUser} />
                        </div>
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
                        {currentUser && (
                            <UserNav
                                currentUser={currentUser}
                                className='text-gray-500'
                            />
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Navbar;