import { ReactNode, createContext, useContext, useState } from "react";

//https://dev.to/shareef/context-api-with-typescript-and-next-js-2m25

type globalContextType = {
    filterInt: number;
    changeFilter: (x: number) => void;
};


const globalContextDefaultValues: globalContextType = {
    filterInt: 0,
    changeFilter: (x: number) => x
};


const globalContext = createContext<globalContextType>(globalContextDefaultValues);

export function useGlobal() {
    return useContext(globalContext);
}

type Props = {
    children: ReactNode;
};

export function GlobalContextProvider({ children }: Props) {
    const [filterInt, setFilter] = useState<number>(0);

    const changeFilter = (x: number) => {
        setFilter(x);
    };

    const value:globalContextType = {
        filterInt,
        changeFilter
    };

    return (
        <>
            <globalContext.Provider value={value}>
                {children}
            </globalContext.Provider>
        </>
    );
}