'use client';

import React from 'react';
import Title, { TypeEnum } from '@/components/ui/title';
import Avatar from '@/components/ui/avatar';

type ProfileWrapperProps = {
    children: React.ReactNode;
    title?: string;
    imgSrc: string;
}

function ProfileWrapper({
    title,
    imgSrc,
    children,
}: ProfileWrapperProps) {
    return (
        <div className='relative px-12'>
            <div className='relative flex flex-row flex-auto gap-8'>
                <Avatar height={80} width={80} imageSrc={imgSrc} />
                <div className='flex flex-col justify-center'>
                    <Title as="h5" type={TypeEnum.cardMain} className='font-light text-custom-dark'>
                        {title}
                    </Title>
                </div>
            </div>
            {children}
        </div>
    );
}

export default ProfileWrapper;
