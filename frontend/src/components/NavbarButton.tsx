import React from 'react';
import Link from 'next/link';

function NavbarButton(props: { title: string, href: string }) {
    return <div className="bg-component2 text-text w-48 h-10 md:gap-x-4 md:hover:scale-105 transition duration-300 shadow-2xl mr-2">
        <Link id={props.title + "-id"} href={props.href} className='h-full w-full flex justify-center place-items-center text-xs md:text-base'>
            {props.title}
        </Link>
    </div>
}

export default NavbarButton;