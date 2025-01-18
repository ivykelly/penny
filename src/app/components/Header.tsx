import Coin from "@/app/components/Coin";
import InvestButton from "./InvestButton";

export default function Header() {
    return (
        <div className="mx-4 mt-4 flex flex-row items-center justify-between bg-background">
            <Coin />
            <p className="text-2xl font-black">Penny</p>
            <InvestButton />
        </div>
    );
}

// function Penny() {
//     return <Image src="/penny.png" alt="" width={500} height={536} className="max-w-16" />;
// }
