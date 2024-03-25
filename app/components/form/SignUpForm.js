'use client'

import { AuthContext } from "@/app/Providers/AuthProvider";
import { baseURL } from "@/app/utils/constansts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import EmailPassForm from "./EmailPassForm";
import Link from "next/link";
import AuthFooter from "../footers/AuthFooter";

const SignUpForm = () => {
    /* useRouter() must import from next/navigation to work */
    const router = useRouter()
    const { setUser } = useContext(AuthContext)

    const handleSignIn = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target)

        const name = form.get('uname')
        const email = form.get('uemail')
        const password = form.get('password')
        const confirm_password = form.get('confirm_password')

        if (confirm_password !== password) {
            /* TODO: Use state and onChange to implement this feature */
            return alert('Password doesn&apos;t match. Confirm same password.')
        }
        /* TODO reset form after getting form info */

        const res = await fetch(`${baseURL}/v1/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json()

        if (data?.error) {
            console.log(data.error);

            /* TODO: Show toast */
            alert(data.error);
        } else {
            /* set user info to the auth state */
            setUser({ name, email, role: data?.user?.role })

            /* after sign in then redirect to a path from client side  */
            return router.push('/')
        }
    }

    /* TODO: Make input as reusable component */
    return (
        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="uname">User&apos;s Name</label>
                <input className="w-full bg-gray-300 text-black px-5 py-3" placeholder="Enter your name..." type="text" name="uname" id="uname" />
            </div>
            <EmailPassForm />
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="confirm_password">Confirm Password</label>
                <input className="w-full bg-gray-300 text-black px-5 py-3" placeholder="Confirm your password..." type="password" name="confirm_password" id="confirm_password" required />
            </div>
            <AuthFooter isSignIn={false} />
        </form>
    );
};

export default SignUpForm;