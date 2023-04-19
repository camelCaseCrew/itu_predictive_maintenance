import React from 'react';
import Link from 'next/link';

function NavbarButton(props: { title: string, href: string }) {
    return <div id={props.title + "-id"} className="bg-component2 text-text w-48 h-10 gap-x-4 hover:scale-110 transition duration-300 shadow-2xl">
        <Link href={props.href} className='h-full w-full flex justify-center place-items-center'>
            {props.title}
        </Link>
    </div>
}

export default NavbarButton;