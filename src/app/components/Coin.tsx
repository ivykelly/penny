"use client";

import Image from "next/image";
import { useCoin } from "../contexts/CoinContext";

export default function Coin() {
    const { coins } = useCoin();

    return (
        <div className="flex flex-row items-center gap-4">
            <Image src="/pennyWithCoin.png" alt="" width={644} height={686} className="max-w-16" />
            <p className="font-extrabold text-[#58CC02]">{coins}p</p>
        </div>
    );
}
