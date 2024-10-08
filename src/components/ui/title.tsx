'use client'

import React from 'react';
import { classNames } from '@/app/lib/utils';

export enum TypeEnum {
    section = 'section',
    cardMain = 'card-main',
    card = 'card',
}

const titleTypes: Record<TypeEnum, string> = {
    [TypeEnum.section]: 'text-lg sm:text-custom-4xl font-light',
    [TypeEnum.cardMain]: ' sm:text-2xl  text-2xl font-semibold leading-none tracking-tight',
    [TypeEnum.card]: 'text-lg font-semibold mb-2',
};

type TitleProps = {
    children: React.ReactNode;
    as?: React.ElementType;
    type?: TypeEnum;
    className?: string;
}

const Title = ({
    children,
    as: TagName = 'h1',
    type = TypeEnum.cardMain,
    className }
    : TitleProps) => {
    const combinedClassNames = classNames(
        titleTypes[type],
        className
    );

    return (
        <div className='flex flex-col w-full gap-y-4'>
            <TagName className={combinedClassNames}>{children}</TagName>
        </div>
    );
};

export default Title;
