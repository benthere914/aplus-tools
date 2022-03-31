import Form from 'react-bootstrap/Form'
import DatePicker from 'react-datepicker'

import { useState, useEffect } from 'react'
export const BasicFormGroup = ({data}) => {
    const [label, type, setData] = data
    switch (type) {
        case 'string':
            const [exact, setExact] = useState(true)
            const [similar, setSimilar] = useState(false)
            const [string, setString] = useState('')
            return (  
                <>
                    <Form.Group>
                        <Form.Label style={{'display': 'flex', 'alignItems': 'center', 'marginTop': '10px'}}>
                            {label}
                            <div style={{'marginLeft': '10px'}}>
                                <Form.Check type={'radio'} label={'exact'} name={label} inline checked={exact} onChange={() => {setExact(prev => !prev)}}/>
                                <Form.Check type={'radio'} label={'similar'} name={label} inline checked={similar} onChange={() => {setSimilar(prev => !prev)}}/>
                            </div>
                        </Form.Label>
                        <Form.Control value={string} onChange={(e) => {setString(e.target.value)}}/>
                    </Form.Group>
                </>
            );
        
        case 'boolean':
            const [yes, setYes] = useState(true)
            const [no, setNo] = useState(false)
            return (
                <>
                    <Form.Group>
                        <Form.Label>
                            {label}{' '}
                        </Form.Label>
                            <Form.Check type={'radio'} label={'exact'} name={label} checked={yes} onChange={() => {setYes(prev => !prev)}}/>
                            <Form.Check type={'radio'} label={'similar'} name={label} inline checked={no} onChange={() => {setNo(prev => !prev)}}/>
                    </Form.Group>
                </>
            )
        
        case 'datetime':
            const [startDate, setStartDate] = useState(new Date());
            return (
                <>
                    <Form.Group>
                        <Form.Label>{label} </Form.Label>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Form.Group>
                </>
            )
    }
}
 
export default BasicFormGroup;