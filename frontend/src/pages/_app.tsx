import '@/styles/globals.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import '@/styles/custom-primereact.css'
import BackButton from '@/components/BackButton'
import Navbar from '@/components/Navbar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div id="main" className='bg-background w-screen h-screen p-4'>
      <Navbar />
      <Component {...pageProps} />
    </div>
}
