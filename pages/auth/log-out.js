import { useContext, useEffect } from "react";
import { UserContext } from "../../comps/layout";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

const LogOut = () => {
    const userData = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const auth = getAuth()
        auth.signOut()
        userData.setUser({})
        router.push('/')
    }, [])
    return (  
        <>
        
        </>
    );
}
 
export default LogOut;
