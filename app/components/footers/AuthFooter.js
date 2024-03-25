'use client'
import Link from 'next/link';

const AuthFooter = ({ isSignIn }) => {
    const footerContent = {
        link: isSignIn ? '/signup' : '/signin',
        linkText: isSignIn ? 'Sign Up' : 'Sign In',
        submit: isSignIn ? 'Sign In' : 'Sign Up'
    }
    return (
        <div className="flex justify-between m-2">
            <Link href={footerContent?.link} className="text-black hover:underline underline-offset-2 hover:text-blue-700">{footerContent?.linkText}</Link>
            <input type="submit" value={footerContent?.submit} className="rounded px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold" />
        </div>
    );
};

export default AuthFooter;