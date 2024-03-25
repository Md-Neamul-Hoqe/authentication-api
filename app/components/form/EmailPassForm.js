const EmailPassForm = () => {
    return (
        <>
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="uemail">User&apos;s Email</label>
                <input className="w-full bg-gray-300 text-black px-5 py-3" placeholder="Enter your email..." type="email" name="uemail" id="uemail" required />
            </div>
            <div className="focus:border-b-4 border-blue-600">
                <label className="sr-only" htmlFor="password">User&apos;s Password</label>
                <input className="w-full bg-gray-300 text-black px-5 py-3" placeholder="Enter your password..." type="password" name="password" id="password" required />
            </div>
        </>
    );
};

export default EmailPassForm;