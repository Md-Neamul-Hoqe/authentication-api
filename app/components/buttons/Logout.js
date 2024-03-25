'use client'

import { baseURL } from "@/app/utils/constansts";
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter()

    const handleLogout = async () => {
        const res = await fetch(`${baseURL}/v1/logout`, {
            method: 'POST'
        })

        const data = await res.json()

        if (data?.error) {
            return alert(data?.error)
        }

        router.push('/signin')
    }

    return (
        <button onClick={handleLogout} className="border hover:bg-green-400 hover:text-white capitalize mr-2">Log out</button>
    );
};

export default Logout;