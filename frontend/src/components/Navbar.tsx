import React from 'react';
import NavbarButton from './NavbarButton';
import Logo from './Logo';


function Navbar() {
    return <div className="bg-component1 text-text rounded h-20 flex justify-start place-items-center gap-x-8">
        <Logo></Logo>
        <NavbarButton title="Health Graphs" href="/healthgraphs"></NavbarButton>
    </div>
}

export default Navbar;