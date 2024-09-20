'use client';

import React, { useState, useCallback } from 'react';
import { useForm, UseFormRegister, SubmitHandler, FieldValues } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpFormData } from '@/schemas';

import useSignUpModal from '@/app/store/use-sign-up-modal.store';
import useConfirmationSignUpModal from '@/app/store/use-confirmation-sign-up-modal.store';

import { signUpUserRequest } from '@/actions/register';

import Modal from '@/components/modals/components/modal';
import ConfirmationSignUpModal from '@/components/modals/confirmation-sign-up-modal';
import FormError from "@/components/ui/form-error";
import Input from '@/components/ui/input-new';

const SignUpModal = () => {
    const signUpModal = useSignUpModal();
    const confirmationSignUpModal = useConfirmationSignUpModal();
    const [error, setError] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        resolver: zodResolver(SignUpSchema),
    });

    const toggle = useCallback(() => {
        signUpModal.onClose();
        confirmationSignUpModal.onOpen();
    }, [signUpModal, confirmationSignUpModal]);

    const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
        setError('');
        startTransition(() => {
            signUpUserRequest(data)
                .then((data) => {
                    setError(data?.error);
                    if (!data?.error) {
                        toggle();
                    }
                })
                .catch((error) => {
                    setError(error.message);
                })
        })
    };


    const castedRegister = register as unknown as UseFormRegister<FieldValues>;

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-row gap-2">
                <Input
                    id="name"
                    label="Name"
                    disabled={isPending}
                    register={castedRegister}
                    error={errors.name}
                    required
                />
            </div>
            <Input
                id="email"
                label="Email Address"
                disabled={isPending}
                register={castedRegister}
                error={errors.email}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isPending}
                register={castedRegister}
                error={errors.password}
                required
            />
            <FormError message={error} />
        </div>
    );


    const confirmationBodyContent = (
        <div className='flex flex-col gap-4 text-center'>
            <p>You have successfully signed up for CoWork Rooms!</p>
        </div>
    );

    return (
        <>
            <Modal
                disabled={isPending}
                isOpen={signUpModal.isOpen}
                title='Create an Account'
                actionLabel='Create Account'
                onClose={signUpModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
            />
            <ConfirmationSignUpModal
                confirmationTitle="Congratulations!"
                body={confirmationBodyContent}
            />
        </>
    )
}

export default SignUpModal;