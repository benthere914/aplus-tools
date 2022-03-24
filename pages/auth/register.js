import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from './auth.module.css'
const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [reason, setReason] = useState('')
    return (  
        <>
        <Alert className={styles.registerAlert}>
            <Alert.Heading><h1>Request An Account</h1></Alert.Heading>
            <p>Access to this website is restricted to certain individuals. Fill out the form below to request access to the site.</p>
            <Form>
                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Reason For Requesting Access</Form.Label>
                    <Form.Control as='textarea' value={reason} onChange={(e) => {setReason(e.target.value)}}/>
                </Form.Group>
                <br/>
                <Button>Request Access</Button>
            </Form>
        </Alert>
        
        </>
    );
}
 
export default Register;
