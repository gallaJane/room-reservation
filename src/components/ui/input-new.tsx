'use client'

import React from 'react';
import {
    FieldError,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';
import { Label } from '@/components/ui/label';
import ErrorMessage from '@/components/ui/error-message';

type InputProps = {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    error?: FieldError | undefined;
    icon?: React.ReactNode;
    value?: string;
    register?: UseFormRegister<FieldValues>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

const Input = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    error,
    icon,
    value,
    register,
    onChange,
    onKeyDown,
}: InputProps) => {
    return (
        <div className='relative w-full'>
            <input
                id={id}
                type={type}
                disabled={disabled}
                {...(register ? register(id, { required }) : {})}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder=''
                className={`
                w-full
                peer
                p-4
                pt-6
                font-normal
                bg-custom-lf
                text-sm
                border-2
                border-gray-300
                rounded
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                ${error ? 'border-rose-500' : 'border-neutral-300'}
                ${error ? 'focus:border-rose-500' : 'focus:text-custom-dark'}
                ${icon ? 'pr-10' : ''}
                `}
            />

            <Label
                className={`
                absolute
                text-sm
                duration-150
                transform
                -translate-y-3
                top-5
                z-10
                origin-[0]
                left-4
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${error ? 'text-rose-500' : 'text-customPlaceholder'}
            `}
            >
                {label}
            </Label>
            {error && <ErrorMessage error={error?.message} />}
            {icon && (  // Conditionally render the icon
                <div className="absolute inset-y-0 flex items-center pointer-events-none right-4">
                    {icon}
                </div>
            )}
        </div>
    )
}

export default Input;