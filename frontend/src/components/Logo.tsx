import React from 'react';
import Link from 'next/link';

function Logo() {
    return <div className='m-6 text-bold text-4xl'>
        <Link href="/">
            <h1>PredictIT</h1>
            <h1 className=' italic absolute -mt-4 font-semibold'>Systematic</h1>
        </Link>
    </div>
}

export default Logo;