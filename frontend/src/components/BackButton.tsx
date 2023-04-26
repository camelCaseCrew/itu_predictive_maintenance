import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/solid';
function BackButton() {
    const router = useRouter();
    return (
        <div className='h-16 w-16 rounded ml-8 mt-12 sticky top-12 text-white bg-component1 flex justify-center place-items-center hover:cursor-pointer hover:scale-110 transition duration-300 shadow-2xl' onClick={() => router.back()}>
            <ArrowLeftIcon className='h-10 w-10'></ArrowLeftIcon>
        </div>
    )
}

export default BackButton;