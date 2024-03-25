'use client'

import { AuthContext } from "@/app/Providers/AuthProvider";
import { baseURL } from "@/app/utils/constansts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import EmailPassForm from "./EmailPassForm";

const SignInForm = () => {
    /* useRouter() must import from next/navigation to work */
    const router = useRouter()
    const { setUser } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target)

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
        <div className="border-green-500 border rounded-lg max-w-7xl min-w-96">
            <h2 className="bg-green-300 text-center text-2xl py-2 font-serif font-medium border-b-2 border-gray-900 border-spacing-10 rounded-t-lg">Sign In</h2>
            <form onSubmit={handleSignIn} className="flex flex-col gap-6">
                <EmailPassForm />
                <div className="flex justify-end m-2">
                    <input type="submit" value="Sign In" className="rounded px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold" />
                </div>
            </form>
        </div>
    );
};

export default SignInForm;