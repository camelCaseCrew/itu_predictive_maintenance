import React from 'react';
import Logo from './Logo';

function Navbar() {
    return <div className="bg-component1 text-text w-full h-28 flex justify-start place-items-center gap-x-4">
        <Logo></Logo>
        <div>
            Dashboard
        </div>
        <div>
            History
        </div>
    </div>
}

export default Navbar;