'use client';

import React, { useCallback } from 'react';
import useConfirmationSignInModal from '@/app/store/use-confirmation-sign-in-modal.store';
import useUserProfileModal from '@/app/store/use-user-profile-modal.store';
import Modal from '@/components/modals/components/modal';
import UserProfileModal from '@/components/modals/user-profile-modal';

export type ConfirmationSignInModalProps = {
    confirmationTitle: string;
    body: any;
}

const ConfirmationSignInModal = ({ confirmationTitle, body }: ConfirmationSignInModalProps) => {
    const confirmationLoginModal = useConfirmationSignInModal();
    const userProfileModal = useUserProfileModal();

    const toggle = useCallback(() => {
        confirmationLoginModal.onClose();
        userProfileModal.onOpen();
    }, [confirmationLoginModal, userProfileModal]);

    return (
        <>
            <Modal
                isOpen={confirmationLoginModal.isOpen}
                title={confirmationTitle}
                actionLabel='PROFILE'
                onClose={confirmationLoginModal.onClose}
                onSubmit={toggle}
                secondaryActionLabel='OK'
                secondaryAction={confirmationLoginModal.onClose}
                body={body}
            />
            <UserProfileModal
                confirmationTitle=''
            />
        </>
    )
}

export default ConfirmationSignInModal;