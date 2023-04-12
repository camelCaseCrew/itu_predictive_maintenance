import React from 'react';
import PlaceholderLogo from '../assets/Placeholder.png';
import Image from 'next/image';
import Link from 'next/link';

function Placeholder() {
    return <div className='m-4'>
        <Link href="/">
            <Image src={PlaceholderLogo} alt="Systematic Logo" width={100} height={100} />
        </Link>
    </div>
}

export default Placeholder;