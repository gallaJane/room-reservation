'use client'

import Image from 'next/image'
import React from 'react';

type AvatarProps = {
    onClick?: () => void;
    imageSrc: string;
    height: number;
    width: number;
}

const Avatar = ({
    onClick,
    imageSrc,
    height,
    width
}: AvatarProps) => {
    return (
        <Image
            className='rounded-full'
            height={height}
            width={width}
            alt='Avatar'
            src={imageSrc}
            onClick={onClick}
        />
    )
}

export default Avatar;