
'use client';

import React from 'react';
import { signOut } from 'next-auth/react';

import useUserProfileModal from '@/app/store/use-user-profile-modal.store';
import { useCurrentUserStore } from '@/app/store/use-current-user.store';

import Modal from '@/components/modals/components/modal';
import { Label } from '@/components/ui/label';
import ProfileWrapper from '@/components/ui/profile-wrapper';


export type UserProfileModalProps = {
    confirmationTitle: string;
}

const UserProfileModal = ({ confirmationTitle }: UserProfileModalProps) => {
    const userProfileModal = useUserProfileModal();
    const currentUser = useCurrentUserStore().currentUser;

    const onClick = () => {
        signOut();
    }

    const userProfileFields = [
        { label: 'First Name', value: currentUser?.first_name },
        { label: 'Last Name', value: currentUser?.last_name },
        { label: 'Date of Birth', value: 'June 20, 1985' },
        { label: 'Email', value: currentUser?.email || 'john.doe@gmail.com' }
    ];

    const bodyContent = (
        <ProfileWrapper
            title={`${currentUser?.first_name} ${currentUser?.last_name}`}
            imgSrc={currentUser?.image || "/images/avatar.png"}
        >
            {userProfileFields.map((field, index) => (
                <div key={index} className='pt-4'>
                    <Label className="text-custom-xs text-custom-light">{field.label}</Label>
                    <p>{field.value}</p>
                </div>
            ))}
        </ProfileWrapper>

    );


    return (
        <Modal
            isOpen={userProfileModal.isOpen}
            title={confirmationTitle}
            actionLabel='Logout'
            onClose={userProfileModal.onClose}
            onSubmit={onClick}
            body={bodyContent}
        />
    )
}

export default UserProfileModal;