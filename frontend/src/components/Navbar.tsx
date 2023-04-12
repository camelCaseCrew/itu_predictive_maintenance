import React from 'react';
import Logo from './Logo';
import Placeholder from './Placeholder';
import NavbarButton from './NavbarButton';


function Navbar() {
    return <div className="bg-component1 text-text w-full h-28 flex justify-start place-items-center gap-x-4">
        <Placeholder></Placeholder>
        <NavbarButton title="Dashboard" href="/dashboard"></NavbarButton>
        <NavbarButton title="History" href="/history"></NavbarButton>
    
    </div>
}

export default Navbar;