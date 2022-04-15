import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdwonButton from 'react-bootstrap/DropdownButton'
import { useContext } from "react";
import { UserContext } from "./layout";
import styles from './header.module.css'
import { useRouter } from 'next/router';
const Header = () => {
    const userData = useContext(UserContext)
    const router = useRouter()
    const toolsClickHandler = (path) => {

    }
    return (  
        <>
            <Navbar bg='primary' variant='dark'>
                <Nav>
                    <div className={`${styles.rowFlexBetween} ${styles.headerItems}`}>
                        <div className={`${styles.rowFlexBetween}`}>
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
                        </div>
                        {userData?.user?.loggedIn 
                            ? (
                                <>
                                <DropdwonButton align='end' title='Tools'>
                                    <Dropdown.Item onClick={() => {router.push('/tools/diagnostic-lookup')}}>Diagnostic Lookup</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {router.push('/tools/job-search')}}>Job Search</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {router.push('/tools/dispatch')}}>Dispatch</Dropdown.Item>
                                </DropdwonButton>
                                </>
                            ) 
                            : (
                                <>
                                </>
                            )}
                        
               
                    </div>
                    
                </Nav>
            </Navbar>
        </>
    );
}
 
export default Header;
