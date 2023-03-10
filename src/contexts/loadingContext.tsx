import { useState, createContext } from "react";

export const LoadingContext = createContext({});

export const LoadingContextProvider = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}