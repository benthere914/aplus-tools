import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  DropdownButton  from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import {createContext, useEffect, useReducer, useState} from 'react'
import {v4 as uuid} from 'uuid'
import Calendar from 'react-calendar'

import styles from './index.module.css'
const dataFields = {
    "number": "string",
    "date": "datetime",
    "customer_name": "string",
    "parent_customer": "string",
    "status": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "category": "string",
    "source": "string",
    "payment_type": "string"
}
const job_categories = [
'New', 
'Part(s) Needed', 
'Needs Special Order Part(s)', 
'Install Equipment', 
'Call Back', 
'Stock Part Needed', 
'FYB', 
'Parts Available', 
'Pending - Waiting on client decision', 
'Parts Ordered', 
'Call client with quote', 
'Part(s) Back Ordered', 
'PIC', 
'WH-PMP', 
'Call Back - PA', 
'Call Back - PO', 
'Sealed System Repair', 
'GP PU Needed - PO', 
'Part(s) Pick Up/Drop Off', 
'Call Back - BO', 
'Dryer Vent Duct Cleaning', 
'WH-PMP + VC', 
'Call Back - PIC', 
'PMP1 and V/C Special', 
'New - Tenant', 
'New Acclaimed', 
'GMP PU Needed - PO', 
'RP PU Needed - PO', 
'DEY PU Needed - PO', 
'PMP', 
'Parts', 
'New-North Star Property Management', 
'WH-PMP + VC Renewal', 
'Part Simple', 
'Meeting', 
'Bank Run', 
'Part Factory Back Order' 
]
const job_statuses = [
'Unscheduled',
'Scheduled',
'Dispatched',
'On The Way',
'On Site',
'Completed',
'Cancelled',
'Job Closed',
'Invoiced',
'Needs 2 Techs',
'C1',
'C2',
'ISSUE',
'Tyler',
'WOC',
'Nancy',
'Needs Approval ',
'Robin',
'NEED OME',
'WOCA',
'SSE Needed',
'Gift Box',
'Gift Box+'
]
const initialState = new Set()
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            state.add(action.payload)
            return state
        case "DELETE":
            state.delete(action.payload)
            return state
        case "RESET":
            return new Set()
        default:
            return state
        }
    }
export const UseFields = createContext()
const JobSearch = () => {
    const [fields, dispatchFields] = useReducer(reducer, initialState)
    const buttons = {}
    const states = {}
    Object.keys(dataFields).forEach((key) => {
        const [selected, setSelected] = useState(false)
        const [string, setString] = useState('')
        const [exact, setExact] = useState(false)
        const [startDate, setStartDate] = useState(new Date())
        const [endDate, setEndDate] = useState(new Date())
        buttons[key] = {key,endDate, setEndDate, startDate, setStartDate, selected, setSelected, exact, setExact, string, setString, "type": dataFields[key]}
    })
    Object.keys(dataFields).forEach(key => {
        let [value, setValue] = useState('')
        states[key] = {value, setValue}
    })
    const clickHandler = (key) => {
        const type = buttons[key].selected ? 'DELETE' : 'ADD'
        dispatchFields({type, 'payload': key})
        buttons[key].setSelected(prev => !prev)
    }

    useEffect(() => {
        dispatchFields({type: 'ADD', payload: 'customer_name'})
        buttons.customer_name.setSelected(true)
    }, [])

    return (  
        <>
            <Alert> 
                <Alert.Heading>Job Search</Alert.Heading>
                <div className={styles.mainContentParent}>
                    <div className={styles.buttons}>
                        {Object.keys(buttons).map(key => (
                            <div className={styles.eachButton} key={uuid()}>                          
                            <Button 
                                variant={buttons[key]?.selected ? 'light': 'dark'} 
                                onClick={() => {clickHandler(key)}} 
                                style={{margin: '3px 2px'}}>{key}
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Form>
                        <Alert className={styles.formAlert}>

                        {Object.keys(buttons).map((button) => {
                            switch (buttons[button].type) {
                                case 'string':
                                    switch (buttons[button].key){
                                        case 'category':
                                            useEffect(() => {buttons.category.setString('Category')}, [])
                                            return buttons.category.selected ? (
                                                <Form.Group className={styles.dropdowns}>
                                                    <Form.Label>Job category</Form.Label>
                                                    <DropdownButton title={buttons.category.string}>
                                                        <DropdownMenu className={styles.categoriesMenu}>
                                                            {job_categories.map((category) => <Dropdown.Item key={uuid()} onClick={() => {buttons.category.setString(category)}}>{category}</Dropdown.Item>)}
                                                        </DropdownMenu>
                                                    </DropdownButton>
                                                </Form.Group>
                                            ):null
                                        case 'status':
                                            useEffect(() => {buttons.status.setString('Status')}, [])
                                            return buttons.status.selected ? (
                                                <Form.Group className={styles.dropdowns}>
                                                    <Form.Label>Job status</Form.Label>
                                                    <DropdownButton title={buttons.status.string}>
                                                        <DropdownMenu className={styles.categoriesMenu}>
                                                            {job_statuses.map((status) => <Dropdown.Item key={uuid()} onClick={() => {buttons.status.setString(status)}}>{status}</Dropdown.Item>)}
                                                        </DropdownMenu>
                                                    </DropdownButton>
                                                </Form.Group>
                                            ):null
                                            default:
                                                return (
                                                    buttons[button].selected ? (
                                                        <Form.Group key={button}>
                                                            <Form.Label style={{'display': 'flex', 'alignItems': 'center', 'marginTop': '10px'}}>
                                                                {button}
                                                                <div style={{'marginLeft': '10px'}}>
                                                                    <Form.Check type={'radio'} label={'exact'} name={button} inline checked={!buttons[button].exact} onChange={() => {buttons[button].setExact(prev => !prev)}}/>
                                                                    <Form.Check type={'radio'} label={'similar'} name={button} inline checked={buttons[button].exact} onChange={() => {buttons[button].setExact(prev => !prev)}}/>
                                                                </div>
                                                            </Form.Label>
                                                            <Form.Control value={buttons[button].string} onChange={(e) => {buttons[button].setString(e.target.value)}}/>
                                                        </Form.Group>
                                                    ):null
                                                )
                                    }
                                    case 'datetime':
                                        return buttons.date.selected ? (
                                        <Form.Group key={'datetime'} className={styles.dates}>
                                            <Form.Label>Date</Form.Label>
                                            <div className={styles.dates}>
                                                <Calendar onChange={buttons.date.setStartDate} value={buttons.date.startDate} />
                                            </div>
                                        </Form.Group>):null
                            }
                        })}
                        {[...fields].length > 0 ? <Button className={styles.searchButton}>Search</Button>:null}
                        </Alert>
                    </Form>
                </div>
            </Alert>
        </>
    );
}
 
export default JobSearch;