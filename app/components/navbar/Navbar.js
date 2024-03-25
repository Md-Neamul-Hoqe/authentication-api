import Logout from "../buttons/Logout";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center w-screen h-20">
            <aside className="text-2xl font-serif italic font-semibold">AuthTest</aside>
            <aside><Logout /></aside>
        </nav>
    );
};

export default Navbar;