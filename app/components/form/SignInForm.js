'use client'

import { AuthContext } from "@/app/Providers/AuthProvider";
import { baseURL } from "@/app/utils/constansts";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const SignInForm = () => {
    /* useRouter() must import from next/navigation to work */
    const router = useRouter()
    const { setUser } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target)

        const name = form.get('uname')
        const email = form.get('uemail')
        const password = form.get('password')

        /* TODO reset form after getting form info */

        const res = await fetch(`${baseURL}/v1/signin`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json()

        if (data?.error) {
            console.log(data.error);

            /* Show toast */
            alert(data.error);
        } else {
            /* set user info to the auth state */
            setUser({ name, email, role: data?.user?.role })

            /* after sign in then redirect to a path from client side  */
            return router.push('/')
        }
    }

    return (
        <form onSubmit={handleSignIn} className="border-green-500 border-2 rounded-lg flex flex-col gap-6">
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="uname">User&apos;s Name</label>
                <input className="bg-gray-500 text-white px-5 py-3" placeholder="Enter your name..." type="text" name="uname" id="uname" />
            </div>
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="uemail">User&apos;s Email</label>
                <input className="bg-gray-500 text-white px-5 py-3" placeholder="Enter your email..." type="email" name="uemail" id="uemail" />
            </div>
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="password">User&apos;s Name</label>
                <input className="bg-gray-500 text-white px-5 py-3" placeholder="Enter your password..." type="password" name="password" id="password" />
            </div>
            <div className="flex justify-end m-2">
                <input type="submit" value="Sign In" className="rounded px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold" />
            </div>
        </form>
    );
};

export default SignInForm;