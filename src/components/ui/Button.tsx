'use client'

import React from 'react';
import Link from 'next/link';
import { classNames } from '@/app/lib/utils';

enum ButtonVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Link = 'link',
}

enum ButtonShape {
    Rounded = 'rounded',
    RoundedFull = 'rounded-full',
}

type ButtonProps = {
    variant?: ButtonVariant;
    shape?: ButtonShape;
    href?: string;
    tag?: 'a' | 'button' | 'div';
    className?: string;
    isSubmit?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => void;
    children?: React.ReactNode;
    mode?: "modal" | "redirect";
    disabled?: boolean;
};

const Button = ({
    variant,
    shape,
    href = "",
    tag: Tag = 'button',
    className,
    isSubmit = false,
    onClick,
    onKeyDown,
    children,
    disabled,
}: ButtonProps) => {
    const baseClasses = `
        inline-block py-3
        font-ubuntu
        font-medium
        text-sm
        leading-none
        text-center
        focus:outline-none
        disabled:opacity-70
        disabled:cursor-not-allowed
    `;

    const primaryClasses = `
        px-12
        bg-gradient-to-r from-[#EAA79E] to-[#ECBCB3]
        shadow-[0px_15px_20px_0px_#EAA89F33]
        text-white 
        hover:bg-transparent 
        hover:text-white
        active:text-white
    `;

    const secondaryClasses = `
        px-12
        bg-white
        shadow-[0px_15px_30px_0px_#0000000D]
        text-[rgb(223_145_134_/_var(--tw-bg-opacity))]
        hover:bg-[#DF9186]
        hover:text-white
        active:bg-white
    `;

    const linkClasses = `
        text-white
        hover:underline
        px-0
    `;

    const shapeClasses = shape === ButtonShape.RoundedFull ? 'rounded-full' : shape === ButtonShape.Rounded ? 'rounded' : '';

    const variantClasses = variant === ButtonVariant.Primary
        ? primaryClasses
        : variant === ButtonVariant.Secondary
            ? secondaryClasses
            : variant === ButtonVariant.Link
                ? linkClasses
                : '';

    const combinedClasses = classNames(
        baseClasses,
        variantClasses,
        shapeClasses,
        className
    );

    if (Tag === 'a' && href) {
        return (
            <Link
                href={href}
                className={combinedClasses}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                {children}
            </Link>
        );
    }

    return (
        <Tag
            className={combinedClasses}
            onClick={onClick}
            onKeyDown={onKeyDown}
            type={isSubmit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {children}
        </Tag>
    );
};

export { Button, ButtonVariant, ButtonShape };
