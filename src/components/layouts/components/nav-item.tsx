'use client'

import React from 'react';
import { Montserrat } from 'next/font/google';
import { classNames } from '@/app/lib/utils';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

type NavItemsProps = {
    href?: string;
    label: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => void;
};

const NavItem = ({ href, label, className = '', onClick }: NavItemsProps) => {
    const baseClass = 'block mt-12 lg:inline-block lg:mt-0 mr-10 transition hover:text-gray-500/75 font-medium text-sm leading-none text-left';
    const combinedClassNames = classNames(
        baseClass,
        montserrat.className,
        className
    );

    const ItemComponent = href ? 'a' : 'div';

    return (
        <ItemComponent
            href={href}
            className={combinedClassNames}
            onClick={onClick}
        >
            {label}
        </ItemComponent>
    );
};

export default NavItem;
