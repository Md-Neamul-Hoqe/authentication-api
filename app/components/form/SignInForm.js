'use client'

import { AuthContext } from "@/app/Providers/AuthProvider";
import { useContext } from "react";

const SignInForm = () => {
    const { setUser } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target)

        const name = form.get('uname')
        const email = form.get('uemail')
        const password = form.get('password')

        const data = await fetch('http://localhost:3000/api/v1/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const res = await data.json()

        if (res?.error) {
            // console.log(res.error);
        } else {
            console.log('Sign in result: ', res);
            setUser({ name, email, role: res?.user?.role })
        }
    }

    return (
        <form onSubmit={handleSignIn} className="border-green-500 border-2 rounded-lg flex flex-col gap-6">
            <div className="">
                <label className="sr-only" htmlFor="uname">User&apos;s Name</label>
                <input className="bg-gray-500 text-white px-5 py-3" placeholder="Enter your name..." type="text" name="uname" id="uname" />
            </div>
            <div className="">
                <label className="sr-only" htmlFor="uemail">User&apos;s Email</label>
                <input className="bg-gray-500 text-white px-5 py-3" placeholder="Enter your email..." type="email" name="uemail" id="uemail" />
            </div>
            <div className="">
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