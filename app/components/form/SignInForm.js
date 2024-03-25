'use client'

import { AuthContext } from "@/app/Providers/AuthProvider";
import { baseURL } from "@/app/utils/constansts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import EmailPassForm from "./EmailPassForm";
import Link from "next/link";
import AuthFooter from "../footers/AuthFooter";

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
        <form onSubmit={handleSignIn} className="flex flex-col gap-6">
            <EmailPassForm />
            <AuthFooter isSignIn={true} />
        </form>
    );
};

export default SignInForm;