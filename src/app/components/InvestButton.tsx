export default function InvestButton() {
    return (
        <>
            <div className="min-h-screen bg-red-50 p-8">
                {/* Invest Now Button */}
                <div className="absolute right-8 top-8">
                    <button className="rounded-full bg-green-500 px-6 py-2 font-medium text-gray-700 shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg">Invest Now</button>
                </div>
            </div>
        </>
    );
}
