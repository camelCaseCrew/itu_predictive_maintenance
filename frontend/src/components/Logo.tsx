import React from 'react';
import Systematic from '../assets/Systematic.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
    return <div className='m-6 text-bold text-4xl'>
        <Link href="/">
            <h1>PredictIT</h1>
        </Link>
    </div>
}

export default Logo;