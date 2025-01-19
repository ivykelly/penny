import Link from "next/link";

// Define the InvestButton component
export default function InvestButton() {
    return ( // Return the InvestButton component
        <div className="bg-red-50">
            <Link href="/invest" className="rounded-full bg-red-500 px-6 py-2 font-extrabold text-white shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg inline-block">
                Invest
            </Link>
        </div>
    );
}
