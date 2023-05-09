import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import '@/styles/custom-primereact.css'
import BackButton from '@/components/BackButton'
import Navbar from '@/components/Navbar'
import { GlobalContextProvider } from "@/context/global";
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'
import ModalContext from '@/context/ModalContext'

export default function App({ Component, pageProps }: AppProps) {

  const [showModal, updateShowModal] = useState<boolean>(false)
  const SetModalContext = createContext(updateShowModal)

  return <div id="main" className='bg-background w-screen h-screen p-4 overflow-scroll'>
    
    <GlobalContextProvider>
      <ModalContext.Provider value={{showModal, updateShowModal}}>
        <Navbar />
      </ModalContext.Provider>
      <Component {...pageProps} />
    </GlobalContextProvider>
    </div>
}
