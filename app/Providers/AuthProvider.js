'use client'
import { createContext, useState } from "react";


export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)

    console.log(user);

    const auths = {
        user, setUser
    }
    return (
        <AuthContext.Provider value={auths}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;