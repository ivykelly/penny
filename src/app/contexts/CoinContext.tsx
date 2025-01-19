"use client";

import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from "react";

// define the shape of the context
interface CoinContextType {
    coins: number;
    setCoins: Dispatch<SetStateAction<number>>;
}

// create context with proper typing
const CoinContext = createContext<CoinContextType | undefined>(undefined);

// define the provider's props
interface CoinProviderProps {
    children: ReactNode;
}

export const CoinProvider: React.FC<CoinProviderProps> = ({ children }) => {
    const [coins, setCoins] = useState(100); // set default coins to 100

    return <CoinContext.Provider value={{ coins, setCoins }}>{children}</CoinContext.Provider>;
};

// custom hook to use the coin context
export const useCoin = (): CoinContextType => {
    const context = useContext(CoinContext);
    if (!context) {
        throw new Error("useCoin must be used within a CoinProvider");
    }
    return context;
};
