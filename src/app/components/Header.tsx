import Coin from "@/app/components/Coin";
import Image from "next/image";
import Link from "next/link";

// Define the Header component
export default function Header() {
    return (
        <div className="mb-[15vh] h-24">
            <Link href="/" className="absolute left-5 top-8 rounded-3xl px-4 py-2 text-[3.5rem] font-extrabold">
                <Image src="/logo.png" alt="" width="530" height="210" className="mt-5 max-w-44" />
            </Link>

            <div className="absolute right-5 top-5 rounded-2xl border-red-100 px-2">
                <Coin />
            </div>
        </div>
    );
}

// function Penny() {
//     return <Image src="/penny.png" alt="" width={500} height={536} className="max-w-16" />;
// }
