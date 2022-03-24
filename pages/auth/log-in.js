import { useState, useContext } from 'react';
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './auth.module.css'
import { loginWithGoogle } from '../../utils/loginWithGoogle';
import { loginWithEmailAndPassword } from '../../utils/loginWithEmailAndPassword';
import { UserContext } from '../../comps/layout';
import { useRouter } from 'next/router';
const LogIn = () => {
    const userData = useContext(UserContext)
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (provider) => {
        switch (provider) {
            case 'google':
                await loginWithGoogle(userData?.setUser, router)   
                break
            case 'email/password':
                await loginWithEmailAndPassword(email, password, userData?.setUser, router)
                break
            }
    }
    return (  
        <>
            <Alert className={styles.logInAlert}>
                <Alert.Heading><h1>Log in</h1></Alert.Heading>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control id='emailLogin' type='email' placeholder='email@example.com' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id='passwordLogin' type='password' placeholder='**********' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Group>
                    <br/>
                    <div className={styles.authProviderButtons}>
                        <Button onClick={() => {loginHandler('email/password')}}>Log In With Email & Password</Button>
                        <Button onClick={() => {loginHandler('google')}}>Log In With Google</Button>
                    </div>
                </Form>
            </Alert>
        </>
    );
}
 
export default LogIn;