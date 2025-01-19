import Coin from "@/app/components/Coin";
import InvestButton from "./InvestButton";
import Link from "next/link";

export default function Header() {
    return (
        <div className="mx-4 mt-4 flex flex-row items-center justify-between bg-background">
            <div className="rounded-2xl border-2 border-red-100 px-2">
                <Coin />
            </div>
            <Link href="/" className="text-2xl font-black">
                Penny
            </Link>
            <InvestButton />
        </div>
    );
}

// function Penny() {
//     return <Image src="/penny.png" alt="" width={500} height={536} className="max-w-16" />;
// }
