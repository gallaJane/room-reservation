'use client';

import React, { useState, useCallback } from 'react';
import {
    useForm,
    UseFormRegister,
    SubmitHandler,
    FieldValues
} from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from '@/actions/login';
import useSignInModal from '@/app/store/use-sign-in-modal.store';
import useConfirmationSignInModal from '@/app/store/use-confirmation-sign-in-modal.store';
import { SignInSchema, SignInFormData } from '@/schemas';
import Modal from '@/components/modals/components/modal';
import ConfirmationSignInModal from '@/components/modals/confirmation-sign-in-modal';
import FormError from "@/components/ui/form-error";
import Input from '@/components/ui/input-new';


const SignInModal = () => {
    const signInModal = useSignInModal();
    const confirmationSignInModal = useConfirmationSignInModal();

    const [error, setError] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(SignInSchema),
    });
    const toggle = useCallback(() => {
        signInModal.onClose();
        confirmationSignInModal.onOpen();
    }, [signInModal, confirmationSignInModal]);

    const onSubmit: SubmitHandler<SignInFormData> = async (
        data: SignInFormData) => {
        setError('');
        startTransition(() => {
            login(data)
                .then((data) => {
                    if (!data?.error) {
                        router.refresh();
                        toggle();
                    } else {
                        setError(data?.error);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                });
        });

    };


    const castedRegister = register as unknown as UseFormRegister<FieldValues>;

    const bodyContent = (
        <div className='flex flex-col gap-4'>
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
            <p>You have successfully signed into CoWork Rooms!</p>
        </div>
    );

    return (
        <>
            <Modal
                disabled={isPending}
                isOpen={signInModal.isOpen}
                title='Welcome Back'
                actionLabel='Sign in to your Account'
                onClose={signInModal.onClose}
                onSubmit={handleSubmit(onSubmit)}
                body={bodyContent}
            />
            <ConfirmationSignInModal
                confirmationTitle="Congratulations!"
                body={confirmationBodyContent}
            />
        </>

    )
}

export default SignInModal;