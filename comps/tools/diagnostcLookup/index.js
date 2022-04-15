import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react";
import styles from './index.module.css'
import axios from 'axios'
import SearchResults from './searchResults';
import { manufacturers, machine_types, machine_formats } from '../../../utils/abreviations'
import { isMobile } from 'react-device-detect';
const DiagnosticLookup = () => {
    const [machine, setMachine] = useState('')
    const [model_number, setModelNumber] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [results, setResults] = useState([])

    const searchFunc = async () => {
        setResults([])
        const valueFromMachine = (obj, func) => {
            for (let key in obj){
                if (machine.toLowerCase().split(' ').includes(key)) return obj[key]
                else func(obj, key)
            }
        }
         
        const loopThruObj = (obj) => {
            const output = []
            for (let key in obj){
                if (machine.split(' ').includes(key)) output.push(obj[key])
            } 
            return output
        }
        const manufacturer = valueFromMachine(manufacturers, (obj, key) => {})
        const machine_type = valueFromMachine(machine_types, (obj, key) => {})
        const machine_format = loopThruObj(machine_formats)
        const result = await axios.post("https://aplus-crm.herokuapp.com/repairs/diagnose", JSON.stringify({manufacturer,machine_type, machine_format, model_number, symptoms: symptoms.toLowerCase().split(',')}))
        setResults(result.data?.repairs)
    }
    return (  
        <>

            <Alert className={`${isMobile ? (styles.mobileSearchAlert) : (styles.searchAlert)}`}>
                <Alert.Heading>Diagnostic Lookup</Alert.Heading>
                <Form onSubmit={(e) => {e.preventDefault(); searchFunc()}}>
                    <Form.Group>
                        <Form.Label>Machine</Form.Label>
                        <Form.Control value={machine} onChange={(e) => {setMachine(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter"){searchFunc()}}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Model Number</Form.Label>
                        <Form.Control value={model_number} onChange={(e) => {setModelNumber(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter"){searchFunc()}}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Symptoms</Form.Label>
                        <Form.Control value={symptoms} onChange={(e) => {setSymptoms(e.target.value)}} onKeyDown={(e) => {if (e.key === "Enter"){searchFunc()}}}/>
                    </Form.Group>
                </Form>
                <Button type={"button"} onClick={searchFunc}>Search</Button>
            </Alert>
            <SearchResults data={[results, ["Job #", "Job Description", "Completion Notes"], ["number", "description", "completion_notes"]]}/>
        </>
    );
}
 
export default DiagnosticLookup;