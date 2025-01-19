import Link from "next/link";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 flex flex-row justify-between bg-gradient-to-b from-transparent via-red-300 to-red-400 px-6 pb-4 pt-12">
            <Link href="/achievements" className="bg-cText mb-4 inline-block rounded-lg px-6 py-2 font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg">
                Achievements
            </Link>
            <Link href="/invest" className="bg-cText mb-4 inline-block rounded-lg px-6 py-2 font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg">
                Investments
            </Link>
        </footer>
    );
}
