import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState, useReducer } from 'react'
import {v4 as uuid} from 'uuid'
import styles from './diagnostic.module.css'
import axios from 'axios'
const initialState = new Set()
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD': 
            state.add(action.payload)
            return state
        case 'REMOVE':
            state.delete(action.payload)
            return state
        case 'RESET':
            return new Set()
    }
}
const DiagnosticLookup = () => {
    const [nextKeywords, setNextKeywords] = useState('')
    const [manufactor, setManufactor] = useState('')
    const [machine, setMachine] = useState('')
    const [model, setModel] = useState('')
    const [results, setResults] = useState([])
    const [keywords, dispatchKeywords] = useReducer(reducer, initialState)
    const addKeywordHandler = (e) => {
        if (e.code !== "Enter") return
        dispatchKeywords({'type': 'ADD', 'payload': nextKeywords})
        setNextKeywords('')
    }
    const removeKeywordHandler = (value) => {
        dispatchKeywords({'type': 'REMOVE', 'payload': value})
        setNextKeywords(value)
    }

    const searchHandler = async () => {
        const url = 'https://aplus-crm/search/jobs'
        const temp = await axios.get(url, {manufactor, machine, keywords: [...keywords] })
        setResults(temp?.data?.items)

    }
    return (  
        <>
            <Alert className={styles.searchAlert}>
                <Alert.Heading><h1>Diagnostic Lookup</h1></Alert.Heading>
                <Form onSubmit={(e) => {e.preventDefault()}}>
                    <Form.Group>
                        <Form.Label>Machine</Form.Label>
                        <Form.Control value={machine} onChange={(e) => {setMachine(e.target.value.toUpperCase())}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Manufactor</Form.Label>
                        <Form.Control value={manufactor} onChange={(e) => {setManufactor(e.target.value.toUpperCase())}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model Number</Form.Label>
                        <Form.Control value={model} onChange={(e) => {setModel(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control value={nextKeywords} onChange={(e) => {setNextKeywords(e.target.value)}} onKeyPress={(e) => {addKeywordHandler(e)}}/>
                    </Form.Group>
                </Form>
                <div className={styles.keywordButtons}>
                    {[...keywords].sort((a,b) => a.length - b.length).map((keyword) => (
                            <Button key={uuid()} style={{margin: '10px 2px'}} onClick={() => {removeKeywordHandler(keyword)}}>{keyword}</Button>
                        ))}
                </div>
                <Button className={styles.submitButton} onClick={searchHandler}>Submit</Button>
            </Alert>

            {results.length ? (
                <Alert className={styles.resultAlert}>
                <Alert.Heading><h1>Results</h1></Alert.Heading>
                {results.map((result) => (
                    <>
                        <Card>
                            <Card.Header>{result?.manufactor} {result?.machine}</Card.Header>
                            <Card.Text>{result?.description}</Card.Text>
                        </Card>
                    </>
                ))}
                </Alert>
            ):null}
        </>
    );
}
 
export default DiagnosticLookup;