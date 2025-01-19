import Link from "next/link";

export default function InvestButton() {
    return (
        <div className="bg-red-50">
            <Link href="/invest" className="inline-block rounded-full bg-red-500 px-6 py-2 font-extrabold text-white shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg">
                Invest
            </Link>
        </div>
    );
}
