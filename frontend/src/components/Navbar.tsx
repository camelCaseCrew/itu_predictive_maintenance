import React, { useState } from 'react';
import NavbarButton from './NavbarButton';
import Modal from './Modal';
import Logo from './Logo';


const Navbar = () => {

    const [showModal, updateShowModal] = useState<Boolean>(false)

    return (
        <div id="navbar" className="relative bg-component1 text-text rounded h-20 flex justify-start place-items-center md:gap-x-8">
            <Logo></Logo>
            <NavbarButton title="Health-Graphs" href="/health_graphs"></NavbarButton>
            <NavbarButton title="History" href="/history"></NavbarButton>
            <div className="bg-component2 text-text text-center leading-10 cursor-pointer select-none w-48 h-10 md:gap-x-4 md:hover:scale-105 transition duration-300 shadow-2xl mr-2"
                 onClick={() => updateShowModal(prevValue => !prevValue)}>
                Subscribe
            </div>
            {showModal &&
                <Modal></Modal>
            }
        </div>
    )
}

export default Navbar;