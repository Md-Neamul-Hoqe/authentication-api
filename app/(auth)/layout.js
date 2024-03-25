export default function AuthLayout({ children }) {
    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                <div className="border-green-500 border rounded-lg max-w-7xl min-w-96">
                    {children}
                </div>
            </div>
        </section>
    );
}
