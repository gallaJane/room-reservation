'use client';

import React from 'react';

import { Button } from '@/components/ui/button';

type OutsideContentProps = {
    label?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => void;
}

const OutsideContent = ({
    label,
    onClick,
}: OutsideContentProps) => {
    return (
        <div>
            <Button
                variant='link'
                onClick={onClick}
            >
                <div className='text-sm font-light text-center'>{label}</div>
            </Button>
        </div>
    )
}

export default OutsideContent;