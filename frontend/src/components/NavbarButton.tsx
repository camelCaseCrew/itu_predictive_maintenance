import React from 'react';
import Link from 'next/link';

function NavbarButton(props: { title: string, href: string }) {
    return <div>
        <Link href={props.href}>
            {props.title}
        </Link>
    </div>
}

export default NavbarButton;