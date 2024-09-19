'use client'

import React from 'react';
import { Input } from '@/components/ui/input';
import { IoIosSearch } from 'react-icons/io';

const SearchInput = () => {
    return (
        <div className='relative sm:block hidden'>
            <IoIosSearch className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input
                className='pl-10 bg-primary/10'
                placeholder="Search"
            />
        </div>

    )
}

export default SearchInput;