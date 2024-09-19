'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className='cursor-pointer'
            height="30"
            width="30"
            src="/booking-icon.svg"
        />
    )
}

export default Logo;