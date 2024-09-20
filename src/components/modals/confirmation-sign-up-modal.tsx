'use client';

import React, { useCallback } from 'react';
import useSignInModal from '@/app/store/use-sign-in-modal.store';
import useConfirmationSignUpModal from '@/app/store/use-confirmation-sign-up-modal.store';
import Modal from '@/components/modals/components/modal';
import SignInModal from '@/components/modals/sign-in-modal';

export type ConfirmationSignUpModalProps = {
    confirmationTitle: string;
    body: any;
}

const ConfirmationSignUpModal = ({ confirmationTitle, body }: ConfirmationSignUpModalProps) => {
    const signInModal = useSignInModal();
    const confirmationSignUpModal = useConfirmationSignUpModal();

    const toggle = useCallback(() => {
        confirmationSignUpModal.onClose();
        signInModal.onOpen();
    }, [signInModal, confirmationSignUpModal]);

    return (
        <>
            <Modal
                isOpen={confirmationSignUpModal.isOpen}
                title={confirmationTitle}
                actionLabel='OK'
                onClose={confirmationSignUpModal.onClose}
                onSubmit={toggle}
                body={body}
            />
            <SignInModal />
        </>
    )
}

export default ConfirmationSignUpModal;