import SignInForm from "@/app/components/form/SignInForm";
import AuthHeading from "@/app/components/heading/AuthHeading";

export const metadata = {
    title: "Sing In",
};

const SignIn = () => {
    return (
        <>
            <AuthHeading heading={'Sign In'} />
            <SignInForm />
        </>
    );
};

export default SignIn;