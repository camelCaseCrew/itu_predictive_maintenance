import React from 'react';
import Logo from './Logo';
import NavbarButton from './NavbarButton';

function Navbar() {
    return <div className="bg-component1 text-text w-full h-28 flex justify-start place-items-center gap-x-4">
        <Logo></Logo>
        <div className="bg-component2 text-text w-28 h-28 flex justify-start place-items-center gap-x-4">
        <NavbarButton title="Dashboard" href="/dashboard"></NavbarButton>
        </div>
        <div className="bg-component2 text-text w-28 h-28 flex justify-start place-items-center gap-x-4">
        <NavbarButton title="History" href="/history"></NavbarButton>
        </div>
    </div>
}

export default Navbar;