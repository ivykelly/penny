import Image from "next/image";
import Coin from "@/app/components/Coin";
import InvestButton from "./InvestButton";

export default function Header() {
    return (
        <div className="p-6">
            <Coin />
            <InvestButton />
        </div>
    );
}

function Penny() {
    return <Image src="/penny.png" alt="" width={500} height={536} className="max-w-16" />;
}
