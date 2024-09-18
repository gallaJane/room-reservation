'use client'

import React, { ReactNode } from 'react';
import { classNames } from '@/app/lib/utils';

export enum LabelTags {
    label = 'label',
}

export type LabelProps = {
    children?: ReactNode;
    as?: React.ElementType
    fontSize?: string
    className?: string
};

export const Label = ({
    children,
    as: TagName = 'label',
    className = '',
    fontSize,
    ...props
}: LabelProps) => (
    <TagName
        className={classNames(
            className,
            fontSize,
        )}
        {...props}
    >
        {children}
    </TagName>
);
