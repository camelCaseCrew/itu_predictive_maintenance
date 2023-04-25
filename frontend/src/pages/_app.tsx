import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div id="main" className='bg-background w-screen h-screen p-4'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
}
