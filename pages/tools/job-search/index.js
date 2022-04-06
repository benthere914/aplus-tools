import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import  DropdownButton  from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import DropdownItem from 'react-bootstrap/DropdownItem'
import Table from 'react-bootstrap/Table'
import {createContext, useEffect, useReducer, useState} from 'react'
import {v4 as uuid} from 'uuid'
import Calendar from 'react-calendar'
import Pagination from 'react-bootstrap/Pagination'
import { CSVLink } from 'react-csv'
import axios from 'axios'

import styles from './index.module.css'
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
const dataFields = {
    "number": "string",
    "date": "datetime",
    "customer_name": "string",
    "status": "string",
    "city": "string",
    "state": "string",
    "postal_code": "string",
    "category": "string",
    "source": "string",
    "payment_type": "string"
}
const JobSearch = () => {
    const [numberString, setNumberString] = useState('')
    const [date, setDate] = useState(new Date())
    const [secondDate, setSecondDate] = useState(new Date())
    const [customerNameString, setCustomerNameString] = useState('')
    const [statusString, setStatusString] = useState('')
    const [cityString, setCityString] = useState('')
    const [stateString, setStateString] = useState('')
    const [postalCodeString, setPostalCodeString] = useState('')
    const [categoryString, setCategoryString] = useState('')
    const [sourceString, setSourceString] = useState('')
    const [paymentString, setPaymentString] = useState('')

    const [selectedNumberString, setSelectedNumberString] = useState(false)
    const [selectedDate, setSelectedDate] = useState(false)
    const [selectedCustomerNameString, setSelectedCustomerNameString] = useState(false)
    const [selectedStatusString, setSelectedStatusString] = useState(false)
    const [selectedCityString, setSelectedCityString] = useState(false)
    const [selectedStateString, setSelectedStateString] = useState(false)
    const [selectedPostalCodeString, setSelectedPostalCodeString] = useState(false)
    const [selectedCategoryString, setSelectedCategoryString] = useState(false)
    const [selectedSourceString, setSelectedSourceString] = useState(false)
    const [selectedPaymentString, setSelectedPaymentString] = useState(false)


    const [exactNumberString, setExactNumberString] = useState(false)
    const [exactCustomerNameString, setExactCustomerNameString] = useState(false)
    const [exactStatusString, setExactStatusString] = useState(false)
    const [exactCityString, setExactCityString] = useState(false)
    const [exactStateString, setExactStateString] = useState(false)
    const [exactPostalCodeString, setExactPostalCodeString] = useState(false)
    const [exactCategoryString, setExactCategoryString] = useState(false)
    const [exactSourceString, setExactSourceString] = useState(false)
    const [exactPaymentString, setExactPaymentString] = useState(false)

    const [itemsLoaded, setItemsLoaded] = useState(false)
    const [loadedItems, setLoadedItems] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(50)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [pageIndexes, setPageIndexes] = useState([1, 2, 3, 4, 5])
    const [fields, dispatchFields] = useReducer(reducer, initialState)

    const [dateButtonSelected, setDateButtonSelected] = useState(0)
    const itemsPerPageOptions = [5, 10, 25, 50, 100]
    const [itemsPerPage, setItemsPerPage] = useState(50)

    const buttons = {
        "number": {
            "type": "string",
            "key": "number", 
            "string": numberString, 
            "setString": setNumberString, 
            "exact":exactNumberString, 
            "setExact": setExactNumberString, 
            "selected": selectedNumberString, 
            "setSelected": setSelectedNumberString
        },
        "date": {
            "type": "datetime",
            "key": "date", 
            "date": date, 
            "setDate": setDate,
            "selected": selectedDate, 
            "setSelected": setSelectedDate
        },
        "customer_name": {
            "type": "string",
            "key": "customer_name", 
            "string": customerNameString, 
            "setString": setCustomerNameString, 
            "exact":exactCustomerNameString, 
            "setExact": setExactCustomerNameString, 
            "selected": selectedCustomerNameString, 
            "setSelected": setSelectedCustomerNameString
        },
        "status": {
            "type": "string",
            "key": "status", 
            "string": statusString, 
            "setString": setStatusString, 
            "exact":exactStatusString, 
            "setExact": setExactStatusString, 
            "selected": selectedStatusString, 
            "setSelected": setSelectedStatusString
        },
        "city": {
            "type": "string",
            "key": "city", 
            "string": cityString, 
            "setString": setCityString, 
            "exact":exactCityString, 
            "setExact": setExactCityString, 
            "selected": selectedCityString, 
            "setSelected": setSelectedCityString
        },
        "state": {
            "type": "string",
            "key": "state", 
            "string": stateString, 
            "setString": setStateString, 
            "exact":exactStateString, 
            "setExact": setExactStateString, 
            "selected": selectedStateString, 
            "setSelected": setSelectedStateString
        },
        "postal_code": {
            "type": "string",
            "key": "postal_code", 
            "string": postalCodeString, 
            "setString": setPostalCodeString, 
            "exact":exactPostalCodeString, 
            "setExact": setExactPostalCodeString, 
            "selected": selectedPostalCodeString, 
            "setSelected": setSelectedPostalCodeString
        },
        "category": {
            "type": "string",
            "key": "category", 
            "string": categoryString, 
            "setString": setCategoryString, 
            "exact":exactCategoryString, 
            "setExact": setExactCategoryString, 
            "selected": selectedCategoryString, 
            "setSelected": setSelectedCategoryString
        },
        "source": {
            "type": "string",
            "key": "source", 
            "string": sourceString, 
            "setString": setSourceString, 
            "exact":exactSourceString, 
            "setExact": setExactSourceString, 
            "selected": selectedSourceString, 
            "setSelected": setSelectedSourceString
        },
        "payment_type": {
            "type": "string",
            "key": "paymentType", 
            "string": paymentString, 
            "setString": setPaymentString, 
            "exact":exactPaymentString, 
            "setExact": setExactPaymentString, 
            "selected": selectedPaymentString, 
            "setSelected": setSelectedPaymentString
        },
    }

    const clickHandler = (key) => {
        const type = buttons[key].selected ? 'DELETE' : 'ADD'
        dispatchFields({type, 'payload': key})
        buttons[key].setSelected(prev => !prev)
        switch (key) {
            case 'category':
                switch (type) {
                    case 'DELETE': 
                        setCategoryString('')
                        break
                    case 'ADD':
                        setCategoryString(key)
                        break
                }
                break
            case 'status':
                switch (type) {
                    case 'DELETE': 
                        setStatusString('')
                        break
                    case 'ADD':
                        setStatusString(key)
                        break
                }
                break
            case 'date':
                setDate(new Date())
                setSecondDate(new Date())
                switch (type) {
                    case 'DELETE':
                        setDateButtonSelected(0)
                        break
                    case 'ADD':
                        setDateButtonSelected(1)
                        break
                }
                break

            default:
                switch (type) {
                    case 'DELETE':
                        buttons[key].setString('')
                }
        }
    }

    useEffect(() => {
        dispatchFields({type: 'ADD', payload: 'customer_name'})
        buttons.customer_name.setSelected(true)
    }, [buttons.customer_name.setSelected])

    const searchHandler = async () => {
        const data = {
            "number": {"key": "number", "string": buttons.number.string, "exact": buttons.number.exact},
            "date": {"key": "date"},
            "customer_name": {"key": "customer_name", "string": buttons.customer_name.string, "exact": buttons.customer_name.exact},
            "status": {"key": "status", "string": buttons.status.string, "exact": buttons.status.exact},
            "city": {"key": "city", "string": buttons.city.string, "exact": buttons.city.exact},
            "state": {"key": "state_prov", "string": buttons.state.string, "exact": buttons.state.exact},
            "postal_code": {"key": "postal_code", "string": buttons.postal_code.string, "exact": buttons.postal_code.exact},
            "category": {"key": "category", "string": buttons.category.string, "exact": buttons.category.exact},
            "source": {"key": "source", "string": buttons.source.string, "exact": buttons.source.exact},
            "payment_type": {"key": "payment_type", "string": buttons.payment_type.string, "exact": buttons.payment_type.exact}
        }
        switch (dateButtonSelected) {
            case 1:
                data['date']['first_date'] = buttons.date.date
                break
            case 2:
                data['date']['first_date'] = buttons.date.date
                data['date']['second_date'] = secondDate
                break
        }
        console.log(data['date'])
        // const url = "https://aplus-crm.herokuapp.com/jobs/search"
        const url = "http://localhost:5000/jobs/search"
        setItemsLoaded(false)
        const result = await axios.post(url, JSON.stringify(data))
        setLoadedItems(result?.data?.result)
        setTotalPages(Math.ceil(result.data?.result.length / itemsPerPage))
        setItemsLoaded(true)
    }
    const setSelectedPage = (page) => {
        if (page < 0) return
        if (page > totalPages) return
        setPage(page)
        if (page <= 3) setPageIndexes([1, 2, 3, 4, 5])
        else if (page >= totalPages -3) setPageIndexes([totalPages - 4, totalPages - 3, totalPages -2, totalPages - 1, totalPages])
        else setPageIndexes([page - 2, page - 1, page, page + 1, page + 2])
        setStart((page * itemsPerPage) - itemsPerPage)
        setEnd(page * itemsPerPage)
    }

    const changeItemsPerPageFunc = (num) => {
        setItemsPerPage(num)
        setTotalPages(Math.ceil(loadedItems.length / num))
        setPage(1)
        setStart(0)
        setEnd(num)
        setPageIndexes([1,2,3,4,5])

    }
    
    return (  
        <>
            <Alert> 
                {itemsLoaded ? (
                    <>
                    <div className={styles.tableHeader}>
                        <Button className={styles.backButton} onClick={() => {setLoadedItems([]);setItemsLoaded(false)}}>Back</Button>
                        <div>

                            <p>Total Results - {loadedItems?.length} - page {page} of {totalPages}</p>
                            
                            <Pagination>
                                <Pagination.First onClick={() => {setSelectedPage(1)}}/>
                                <Pagination.Prev onClick={() => {setSelectedPage(page - 1)}}/>
                                {totalPages >= 1 ?<Pagination.Item onClick={() => {setSelectedPage(pageIndexes[0])}} active={pageIndexes[0] === page}>{pageIndexes[0]}</Pagination.Item>:null}
                                {totalPages >= 2 ?<Pagination.Item onClick={() => {setSelectedPage(pageIndexes[1])}} active={pageIndexes[1] === page}>{pageIndexes[1]}</Pagination.Item>:null}
                                {totalPages >= 3 ?<Pagination.Item onClick={() => {setSelectedPage(pageIndexes[2])}} active={pageIndexes[2] === page}>{pageIndexes[2]}</Pagination.Item>:null}
                                {totalPages >= 4 ?<Pagination.Item onClick={() => {setSelectedPage(pageIndexes[3])}} active={pageIndexes[3] === page}>{pageIndexes[3]}</Pagination.Item>:null}
                                {totalPages >= 5 ?<Pagination.Item onClick={() => {setSelectedPage(pageIndexes[4])}} active={pageIndexes[4] === page}>{pageIndexes[4]}</Pagination.Item>:null}
                                <Pagination.Next onClick={() => {setSelectedPage(page + 1)}}/>
                                <Pagination.Last onClick={() => {setSelectedPage(totalPages)}}/>
                            </Pagination>
                        </div>
                    </div>
                        {/* <CSVLink data={loadedItems}>Download</CSVLink> */}
                        <div className={styles.tableDiv}>
                            <Table striped bordered hover responsive variant='dark'>
                                <thead>
                                    <tr>
                                        <th>Job #</th>
                                        <th>Priority</th>
                                        <th>Job Description</th>
                                        <th>Completion Notes</th>
                                        <th>Date</th>
                                        <th>Customer_Name</th>
                                        <th>Status</th>
                                        <th>Address</th>
                                        <th>Category</th>
                                        <th>Source</th>
                                        <th>Payment Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loadedItems.slice(start, end)?.map((result) => (
                                        <tr key={uuid()}>
                                            <td className={styles.tableResult}>{result?.number}</td>
                                            <td className={styles.tableResult}>{result?.priority}</td>
                                            <td className={styles.tableResult}>{result?.description}</td>
                                            <td className={styles.tableResult}>{result?.completion_notes}</td>
                                            <td className={styles.tableResult}>{result?.date?.slice(0, 16)}</td>
                                            <td className={styles.tableResult}>{result?.customer_name}</td>
                                            <td className={styles.tableResult}>{result?.status}</td>
                                            <td className={styles.tableResult}>{result?.street ? `${result?.street}, ` : ''} {result?.city}, {result?.state} - {result?.postal_code}</td>
                                            <td className={styles.tableResult}>{result?.category}</td>
                                            <td className={styles.tableResult}>{result?.source}</td>
                                            <td className={styles.tableResult}>{result?.payment_type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <DropdownButton title={"Results per page"} className={styles.itemsPerPageDropdown}>
                    <DropdownMenu>
                        {itemsPerPageOptions.map((num) => (<DropdownItem key={`itemsPerPage${num}`} onClick={() => {changeItemsPerPageFunc(num)}}>{num}</DropdownItem>))}
                    </DropdownMenu>
                </DropdownButton>
                    </>
                ) : (
                    <>
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
                                                return buttons.category.selected ? (
                                                    <Form.Group className={styles.dropdowns} key={'job_category'}>
                                                        <Form.Label>Job category</Form.Label>
                                                        <DropdownButton title={buttons.category.string}>
                                                            <DropdownMenu className={styles.categoriesMenu}>
                                                                {job_categories.map((category) => <Dropdown.Item key={uuid()} onClick={() => {buttons.category.setString(category)}}>{category}</Dropdown.Item>)}
                                                            </DropdownMenu>
                                                        </DropdownButton>
                                                    </Form.Group>
                                                ):null
                                            case 'status':
                                                return buttons.status.selected ? (
                                                    <Form.Group className={styles.dropdowns} key={'job_status'}>
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
                                                                        <Form.Check type={'radio'} label={'exact'} name={button} inline checked={buttons[button].exact} onChange={() => {buttons[button].setExact(prev => !prev)}}/>
                                                                        <Form.Check type={'radio'} label={'similar'} name={button} inline checked={!buttons[button].exact} onChange={() => {buttons[button].setExact(prev => !prev)}}/>
                                                                    </div>
                                                                </Form.Label>
                                                                <Form.Control value={buttons[button].string} onChange={(e) => {buttons[button].setString(e.target.value)}}/>
                                                            </Form.Group>
                                                        ):null
                                                    )
                                        }
                                        case 'datetime':
                                            // useEffect(() => {setDateButtonSelected(1)}, [])
                                            return buttons.date.selected ? (
                                            <Form.Group key={'datetime'} className={styles.dates}>
                                                <Form.Label>Date</Form.Label>
                                                <div className={styles.datetimeButtons}>
                                                    <Button variant={dateButtonSelected === 1 ? 'light': 'dark'} onClick={() => {setDateButtonSelected(1)}}>Specific Date</Button>
                                                    <Button variant={dateButtonSelected === 2 ? 'light': 'dark'} onClick={() => {setDateButtonSelected(2)}}>Between Two Dates</Button>
                                                </div>
                                                <div className={styles.dates}>
                                                    {dateButtonSelected === 1 ? (
                                                        <>
                                                            <Calendar onChange={buttons.date.setDate} value={buttons.date.date} />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className={styles.multiCalendars}>

                                                            <Calendar className={styles.smallerCalendar} tileClassName={styles.smallerCalendarItem} onChange={buttons.date.setDate} value={buttons.date.date} />
                                                            <Calendar className={styles.smallerCalendar} tileClassName={styles.smallerCalendarItem} onChange={setSecondDate} value={secondDate} />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </Form.Group>):null
                                }
                            })}
                            {[...fields].length > 0 ? <Button onClick={() => {searchHandler()}} className={styles.searchButton}>Search</Button>:null}
                            </Alert>
                        </Form>
                    </div>
                    </>
                )}
                </Alert>
                
        </>
    );
}
 
export default JobSearch;