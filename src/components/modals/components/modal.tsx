'use client'

import React, { useState, useEffect, useCallback } from 'react';

import { Button, } from '@/components/ui/button';
import Title, { TypeEnum } from '@/components/ui/title';
import {
    CardContent,
} from '@/components/ui/card';
import { IoMdClose } from 'react-icons/io'

type ModalProps = {
    isOpen?: boolean,
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className='fixed inset-0 z-50 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70'>
                <div
                    className='relative w-full h-full mx-auto my-6 md:w-4/6 lg:w-3/6 xl:w-[440px] lg:h-auto md:h-auto'>
                    {/* content */}
                    <div className={`translate duration-300 h-full 
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <div
                            className='relative flex flex-col w-full h-full bg-white outline-none translate lg:h-auto md:h-auto focus:outline-none
                            rounded-lg border bg-card text-card-foreground shadow-sm
                            '
                        >
                            {/* HEADER */}
                            <div className='relative flex items-center justify-center p-6 rounded-t'>
                                <Button
                                    variant='ghost'
                                    onClick={handleClose}
                                    className='absolute p-1 transition border-0 hover:opacity-70 right-9'>
                                    <IoMdClose size={18} />
                                </Button>
                                <Title as="h5" type={TypeEnum.cardMain}>
                                    {title}
                                </Title>
                            </div>
                            {/* BODY */}
                            <CardContent>
                                {body}
                            </CardContent>
                            {/* FOOTER */}
                            <div className='flex flex-col gap-2 p-6'>
                                <div className='flex flex-row items-center w-full gap-4'>
                                    {secondaryAction && secondaryActionLabel && (
                                        <Button
                                            variant='secondary'
                                            onClick={handleSecondaryAction}
                                            type="submit"
                                            disabled={disabled}
                                            className='w-full' size='lg'
                                        >
                                            {secondaryActionLabel}
                                        </Button>
                                    )}

                                    <Button
                                        variant='default'
                                        onClick={handleSubmit}
                                        type="submit"
                                        disabled={disabled}
                                        className='w-full'
                                    >
                                        {actionLabel}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;