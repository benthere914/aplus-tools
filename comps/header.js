import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { useContext } from "react";
import { UserContext } from "./layout";
import Link from 'next/link';
const Header = () => {
    const userData = useContext(UserContext)
    return (  
        <>
            <Navbar bg='primary' variant='dark'>
                <Nav>
                    <Link href='/' passHref><Nav.Link><Navbar.Brand>Home</Navbar.Brand></Nav.Link></Link>
                    {userData?.user?.loggedIn 
                    ? (
                        <>
                            <Link href='/auth/log-out' passHref><Nav.Link>Log Out</Nav.Link></Link>
                        </>
                    ) 
                    : (
                        <>
                            <Link href='/auth/log-in' passHref><Nav.Link>login</Nav.Link></Link>
                            <Link href='/auth/register' passHref><Nav.Link>Request Account</Nav.Link></Link>
                        </>
                    )}
                    
                </Nav>
            </Navbar>
        </>
    );
}
 
export default Header;
