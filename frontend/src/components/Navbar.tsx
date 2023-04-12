import React from 'react';
import Placeholder from './Placeholder';
import NavbarButton from './NavbarButton';


function Navbar() {
    return <div className="bg-component1 text-text rounded h-20 flex justify-start place-items-center gap-x-8">
        <Placeholder></Placeholder>
        <NavbarButton title="Dashboard" href="/dashboard"></NavbarButton>
        <NavbarButton title="History" href="/history"></NavbarButton>
    </div>
}

export default Navbar;