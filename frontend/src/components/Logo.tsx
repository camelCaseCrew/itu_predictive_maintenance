import React from 'react';
import Link from 'next/link';

const Logo = () => (
    <div className='m-6'>
        <Link href="/">
            <h1 className=' italic absolute -mt-4 font-semibold'>Systematic</h1>
            <h1 className=' text-4xl'>PredictIT</h1>
        </Link>
    </div>
)

export default Logo;