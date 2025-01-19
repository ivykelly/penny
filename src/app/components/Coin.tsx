"use client";

import Image from "next/image";
import { useCoin } from "../contexts/CoinContext";

export default function Coin() {
    const { coins } = useCoin();

    return (
        <div className="flex flex-col items-center">
            <Image src="/pennyWithCoin.png" alt="" width={644} height={686} className="max-w-32" />
            <p className="-mt-3 text-xl font-extrabold text-amber-400">{coins}p</p>
        </div>
    );
}
