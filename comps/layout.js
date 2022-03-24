import Header from "./header";
import Footer from "./footer";
import { useLocalStorage } from "../utils/useLocalStorage";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
export const UserContext = createContext()
const Layout = ({children}) => {
    const [user, setUser] = useLocalStorage('user')
    useEffect(() => {
        const auth = getAuth()
        auth.onAuthStateChanged((user) => {
            setUser({
                'userName': user?.displayName,
                'email': user?.email,
                'icon': user?.photoURL,
                'loggedIn': !!user?.email
            })
        })
    }, [])
    return (  
        <>
        <UserContext.Provider value={{user, setUser}}>
            <Header/>
                {children}
            <Footer/>
        </UserContext.Provider>
        </>
    );
}
 
export default Layout;
