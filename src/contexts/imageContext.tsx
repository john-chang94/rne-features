import React, { useState, createContext } from "react";

export const ImageContext = createContext({});

export const ImageContextProvider = ({ children }: any) => {
    const [image, setImage] = useState(null);

    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    )
}