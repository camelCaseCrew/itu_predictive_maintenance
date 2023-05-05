import React from 'react';
import NavbarButton from './NavbarButton';
import Logo from './Logo';


function Navbar() {
    return <div id="navbar" className="bg-component1 text-text rounded h-20 flex justify-start place-items-center md:gap-x-8 overflow-x-auto">
        <Logo></Logo>
        <NavbarButton title="Health-Graphs" href="/health_graphs"></NavbarButton>
        <NavbarButton title="History" href="/history"></NavbarButton>
    </div>
}

export default Navbar;