import SignUpForm from "@/app/components/form/SignUpForm";

export const metadata = {
    title: "Sing Up",
};


const SignUp = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignUpForm />
        </div>
    );
};

export default SignUp;