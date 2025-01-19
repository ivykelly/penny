"use client";

import Image from "next/image";
import { useCoin } from "../contexts/CoinContext";

// Define the Coin component
export default function Coin() {
    const { coins } = useCoin(); // Get the user's coins

    const coinsTruncated = Math.round((coins + Number.EPSILON) * 100) / 100; // truncates to 2 decimal places

    return (
        <div className="flex flex-col items-center">
            <Image src="/pennyWithCoin.png" alt="" width={644} height={686} className="max-w-32" />
            <p className="-mt-3 text-xl font-extrabold text-amber-400">{coinsTruncated}p</p>
        </div>
    );
}
