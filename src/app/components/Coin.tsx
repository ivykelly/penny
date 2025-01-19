"use client"; // Use client-side rendering

import Image from "next/image";
import { useCoin } from "../contexts/CoinContext";

// Define the Coin component
export default function Coin() {
    const { coins } = useCoin(); // Get the user's coins

    return ( // Return the Coin component
        <div className="flex flex-row items-center gap-4">
            <Image src="/pennyWithCoin.png" alt="" width={644} height={686} className="max-w-16" />
            <p className="font-extrabold text-[#58CC02]">{coins}p</p>
        </div>
    );
}
