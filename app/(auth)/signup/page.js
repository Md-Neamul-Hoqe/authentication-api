import SignUpForm from "@/app/components/form/SignUpForm";
import AuthHeading from "@/app/components/heading/AuthHeading";

export const metadata = {
    title: "Sing Up",
};

const SignUp = () => {
    return (
        <>
            <AuthHeading heading={'Sign Up'} />
            <SignUpForm />
        </>
    );
};

export default SignUp;