import { useState, useContext } from "react";
import  Button  from "react-bootstrap/Button"
import { UseFields } from "../../pages/tools/job-search";
const AddFormButton = ({data}) => {
    const [key, setItemsCount, dispatchFields] = data
    const [selected, setSelected] = useState(false)
    const clickHandler = () => {
        const type = selected ? 'DELETE' : 'ADD'
        dispatchFields({type, 'payload': key})
        setSelected(prev => !prev)
        setItemsCount(prev => type === "ADD" ? prev + 1 : prev - 1)
    }
    return (  
        <Button variant={selected ? 'light': 'dark'} onClick={() => {clickHandler()}} style={{margin: '10px 2px'}}>{key}</Button>
    );
}
 
export default AddFormButton;