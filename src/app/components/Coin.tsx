"use client";

import Image from "next/image";
import { useCoin } from "../contexts/CoinContext";

export default function Coin() {
    const { coins } = useCoin();

    return (
        <div className="flex flex-row items-center gap-4 rounded-2xl border-2 border-red-100 px-2">
            <Image src="/pennyWithCoin.png" alt="" width={644} height={686} className="max-w-16" />
            <p className="text-cText font-bold">{coins}p</p>
        </div>
    );
}
