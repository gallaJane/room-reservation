'use client';

import React from 'react';
import { Session } from "next-auth";
import useUserProfileModal from '@/app/store/use-user-profile-modal.store';
import useMenu from '@/app/store/use-menu.store';
import Avatar from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import NavItem from '@/components/layouts/components/nav-item';

type UserNavProps = {
    className?: string;
    currentUser: Session["user"];
}

const UserNav = ({
    className,
    currentUser,
}: UserNavProps) => {
    const userProfileModal = useUserProfileModal();
    const menu = useMenu();

    const handleAvatarClick = () => {
        if (menu.isOpen) {
            menu.onClose();
        }
        userProfileModal.onOpen();
    };

    return (
        <>
            <NavItem label={`${currentUser?.name}`} className={className} />
            <Button onClick={handleAvatarClick}>
                <Avatar
                    imageSrc={currentUser?.image || "/images/avatar.png"}
                    height={30}
                    width={30}
                />
            </Button>
        </>
    )
}

export default UserNav;