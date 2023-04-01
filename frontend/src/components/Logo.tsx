import React from 'react';
import Systematic from '../assets/Systematic.png';
import Image from 'next/image';
import Link from 'next/link';

function Logo() {
    return <div>
        <Link href="/">
            <Image src={Systematic} alt="Systematic Logo" width={200} height={100} />
        </Link>
    </div>
}

export default Logo;