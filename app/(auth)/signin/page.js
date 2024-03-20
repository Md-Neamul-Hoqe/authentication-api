export const metadata = {
    title: "Sing In",
};

const SignIn = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form action="#" method="post" className="border-green-500 border-2 rounded-lg flex flex-col gap-6">
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
                <div className="flex justify-end px-5 outline-double">
                    <input type="submit" value="Ok" className="" />
                </div>
            </form>
        </div>
    );
};

export default SignIn;