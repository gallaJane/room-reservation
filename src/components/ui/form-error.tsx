'use client'

import React from 'react'
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

type FormErrorProps = {
    message?: string,
}

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className='flex items-center p-3 text-sm text-red-400 bg-red-100 border-red-700 rounded-md gap-x-2'>
            <HiOutlineExclamationTriangle className='w-4 h-4' />
            <p>{message}</p>
        </div>
    )
}

export default FormError;