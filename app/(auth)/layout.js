export const metadata = {
    title: "%s | Next JS Explore [API & JWT]",
    description: "Exploring Next JS power on API with Node JS, Express JS, MongoDB and JWT",
};

export default function AuthLayout({ children }) {
    return (
        <section>
            {children}
        </section>
    );
}
