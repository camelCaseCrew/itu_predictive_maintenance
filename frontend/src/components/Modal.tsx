import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal() {
  
  function validateEmail(email: string) {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const [email, setEmail] = useState('')

  const [open, setOpen] = useState(true)

  const inputText = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={inputText} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-component1 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-component1 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="font-semibold leading-6 text-text">
                        Subscribe to Email notifications:
                      </Dialog.Title>
                      <input type="email"
                             className={`rounded required bg-white mt-2 outline outline-component1 focus:outline-blue-500 outline-offset-2 outline-1 shadow-2xl p-2 peer ${!validateEmail(email) ? `focus:outline-red-500` : ``} `} 
                             ref={inputText} 
                             placeholder='Email' 
                             onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="mt-2 text-sm text-red-400 hidden peer peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">Please enter a valid Email address</span>
                    </div>
                  </div>
                </div>
                <div className="bg-background px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-component2 md:hover:scale-105 px-3 py-2 text-sm font-semibold text-text shadow-sm transition duration-200 shadow-2xl sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Subscribe
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-component2 md:hover:scale-105 px-3 py-2 text-sm font-semibold text-text shadow-sm transition duration-200 shadow-2xl sm:ml-3 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ) 
}