import React from 'react';
import Link from 'next/link';

function NavbarButton(props: { title: string, href: string }) {
    return <div className="bg-component2 text-text w-28 h-28 flex justify-start place-items-center gap-x-4">
        <Link href={props.href}>
            {props.title}
        </Link>
    </div>
}

export default NavbarButton;