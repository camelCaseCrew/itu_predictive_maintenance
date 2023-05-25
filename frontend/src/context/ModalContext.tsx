import { createContext } from 'react'

export const ModalContext = createContext({
    showModal: false,
    updateShowModal: (open: boolean) => {}
})

export default ModalContext