import Link from "next/link";

const NotFound = () => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-16">
            <div className="text-center">
                <h1 className="text-6xl font-semibold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl text-gray-600 mb-6">Page Not Found</h2>
                <p className="text-gray-500 mb-8">
                    {"Sorry, the page you're looking for doesn't exist. It might have been moved or deleted."}
                </p>
                <Link href="/" passHref>
                    <button className="py-2 px-6 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition duration-300">
                        Go to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound
