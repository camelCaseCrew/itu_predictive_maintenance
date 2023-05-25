import React from 'react';
import Link from 'next/link';

const Logo = () => (
    <div id='Logo-id' className='m-6'>
        <Link href="/">
            <h1 className=' italic relative font-semibold top-2'>Systematic</h1>
            <h1 className=' text-4xl'>PredictIT</h1>
        </Link>
    </div>
)

export default Logo;