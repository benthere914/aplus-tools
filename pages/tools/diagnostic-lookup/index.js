import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { useState, useReducer } from 'react'
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import styles from './diagnostic.module.css'
import { manufactors, machines } from '../../../utils/abreviations'


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

    const convert_machine = () => {
        return machines[machine.toLowerCase()]
    }
    
    const convert_manufactor = () => {
        return manufactors[manufactor.toLowerCase()]
    }

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
        setResults([])
        const url = "https://aplus-crm.herokuapp.com/repairs/diagnose"
        const data = JSON.stringify({
            "manufactor": convert_manufactor(), 
            "machine_type": convert_machine(), 
            "symptoms": [...keywords, nextKeywords], 
            "model_number": model
        })
        const response = await axios.post(url, data)
        setResults(response?.data?.result)
        console.log(response)
    }

    return (  
        <>
        <div className={styles.pageDiv}>

            <Alert className={styles.searchAlert}>
                <Alert.Heading><h2>Diagnostic Lookup</h2></Alert.Heading>
                <Form onSubmit={(e) => {e.preventDefault()}}>
                    <Form.Group>
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control value={manufactor} onChange={(e) => {setManufactor(e.target.value.toLowerCase())}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Machine</Form.Label>
                        <Form.Control value={machine} onChange={(e) => {setMachine(e.target.value.toLowerCase())}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model Number</Form.Label>
                        <Form.Control value={model} onChange={(e) => {setModel(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control value={nextKeywords} onChange={(e) => {setNextKeywords(e.target.value.toLowerCase())}} onKeyPress={(e) => {addKeywordHandler(e)}}/>
                    </Form.Group>
                </Form>
                <div className={styles.keywordButtons}>
                    {[...keywords].sort((a,b) => a.length - b.length).map((keyword) => (
                            <Button key={uuid()} style={{margin: '10px 2px'}} onClick={() => {removeKeywordHandler(keyword)}}>{keyword}</Button>
                        ))}
                </div>
                <Button className={styles.submitButton} onClick={searchHandler}>Submit</Button>
            </Alert>
            <Alert className={styles.resultsAlert}>
                <Alert.Heading><h2 style={{"textAlign": "center"}}>Diagnostic Results</h2></Alert.Heading>
                <Table striped bordered hover responsive variant='dark'>
                    <thead>
                        <tr>
                            <th>Job #</th>
                            <th>Job Description</th>
                            <th>Completion Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results?.map((result) => (
                            <tr key={uuid()}>
                                <td className={styles.tableResult}>{result?.number}</td>
                                <td className={styles.tableResult}>{result?.description}</td>
                                <td className={styles.tableResult}>{result?.completion_notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Alert>
        </div>
        </>
    );
}
 
export default DiagnosticLookup;