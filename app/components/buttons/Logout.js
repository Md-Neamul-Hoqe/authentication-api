'use client'

const Logout = () => {

    const handleLogout = () => {
        console.log('logout');
    }

    return (
        <button onClick={handleLogout} className="border hover:bg-green-400 hover:text-white capitalize mr-2">Log out</button>
    );
};

export default Logout;