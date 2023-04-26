import React from 'react';
import { useRouter } from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/solid';
function BackButton() {
    const router = useRouter();
    return (
        <div id="Back-Button" className='h-10 w-10 rounded md:ml-8 md:mt-12 mt-4 sticky top-12 text-text bg-component1 flex justify-center place-items-center hover:cursor-pointer hover:scale-110 transition duration-300 shadow-2xl md:h-16 md:w-16' onClick={() => router.back()}>
            <ArrowLeftIcon className='h-6 w-6 md:h-10 md:w-10'></ArrowLeftIcon>
        </div>
    )
}

export default BackButton;