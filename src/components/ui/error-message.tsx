'use client'

import React from 'react';

type ErrorMessageProps = {
    error?: string
}

const ErrorMessage = ({
    error
}: ErrorMessageProps) => {
    return (
        <div className='grid w-full place-content-end'>
            <p className='text-xs text-red-400'>{error}</p>
        </div>
    )
}

export default ErrorMessage;



