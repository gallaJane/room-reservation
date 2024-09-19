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
    const confirmationSignInModal = useConfirmationSignInModal();
    const userProfileModal = useUserProfileModal();

    const toggle = useCallback(() => {
        confirmationSignInModal.onClose();
        userProfileModal.onOpen();
    }, [confirmationSignInModal, userProfileModal]);

    return (
        <>
            <Modal
                isOpen={confirmationSignInModal.isOpen}
                title={confirmationTitle}
                actionLabel='PROFILE'
                onClose={confirmationSignInModal.onClose}
                onSubmit={toggle}
                secondaryActionLabel='OK'
                secondaryAction={confirmationSignInModal.onClose}
                body={body}
            />
            <UserProfileModal
                confirmationTitle=''
            />
        </>
    )
}

export default ConfirmationSignInModal;