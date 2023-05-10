import React, { createContext, useContext, useEffect, useState } from 'react';
import NavbarButton from './NavbarButton';
import Modal from './Modal';
import Logo from './Logo';
import ModalContext from '@/context/ModalContext';
import { ClockIcon, PresentationChartLineIcon, BellIcon } from '@heroicons/react/outline';



const Navbar = () => {

    const modalContext = useContext(ModalContext)

    return (
        <div id="navbar" className="relative bg-component1 text-text rounded h-20 flex justify-start place-items-center md:gap-x-8">
            <Logo></Logo>
            <NavbarButton title="Health-Graphs" href="/health_graphs"><PresentationChartLineIcon/></NavbarButton>
            <NavbarButton title="History" href="/history"><ClockIcon/></NavbarButton>
            <div id='subscribe-id' className="bg-component1 text-text text-center ml-auto mr-10 leading-10 cursor-pointer select-none rounded-full outline outline-1 w-28 h-10 md:gap-x-4 md:hover:scale-105 transition duration-300 shadow-2xl"
                 onClick={() => modalContext.updateShowModal(!modalContext.showModal)}>
                <div className=' w-[30px] mx-auto mt-1 sm:hidden'><BellIcon /></div>
                <div className=' hidden sm:block'>Get Alerts</div>  
            </div>
            {modalContext.showModal &&
                <Modal></Modal>
            }
        </div>
    )
}

export default Navbar;