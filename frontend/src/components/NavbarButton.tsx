import React, { ReactNode, FC } from 'react';
import Link from 'next/link';


const NavbarButton: FC<{ title: string, href: string, children: ReactNode }> = ({title, href, children}) => {
    return <div className="bg-component2 text-text w-48 h-10 md:gap-x-4 md:hover:scale-105 transition duration-300 shadow-2xl mr-2">
        <Link id={title + "-id"} href={href} className='h-full w-full flex justify-center place-items-center text-base'>
            <div className=' min-w-[30px] sm:hidden'>{children}</div>
            <div className=' hidden sm:block'>{title}</div>
        </Link>
    </div>
}

export default NavbarButton;