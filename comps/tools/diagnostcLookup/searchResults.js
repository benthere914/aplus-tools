import { useEffect, useState } from "react";
// import { DropdownButton, DropdownMenu, DropdownItem } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownMenu from 'react-bootstrap/DropdownMenu'
import DropdownItem from 'react-bootstrap/DropdownItem'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Pagination from 'react-bootstrap/Pagination'
import styles from './index.module.css'
import {v4 as uuid} from 'uuid'
import { isMobile } from "react-device-detect";
const SearchResults = ({data}) => {
    const [results, headers, dataFields] = data

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [itemsLoaded, setItemsLoaded] = useState(false)
    const [loadedItems, setLoadedItems] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [pageIndexes, setPageIndexes] = useState([1, 2, 3, 4, 5])
    useEffect(() => {
        setItemsLoaded(false)
        setPage(1)
        setStart(0)
        setEnd(itemsPerPage)
        setPageIndexes([1, 2, 3, 4, 5])
        setLoadedItems(results)
        setTotalPages(Math.ceil(results.length / itemsPerPage))
        setItemsLoaded(true)
    }, [results])
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
        
        <Alert className={`${isMobile ? (styles.mobileResultsAlert) : (styles.resultsAlert)}`}>
            {itemsLoaded? (
                <>
                <DropdownButton title={`Max Per Page - ${itemsPerPage}`}>
                <DropdownMenu>
                    <DropdownItem onClick={() => {changeItemsPerPageFunc(5)}}>5</DropdownItem>
                    <DropdownItem onClick={() => {changeItemsPerPageFunc(10)}}>10</DropdownItem>
                    <DropdownItem onClick={() => {changeItemsPerPageFunc(25)}}>25</DropdownItem>
                    <DropdownItem onClick={() => {changeItemsPerPageFunc(50)}}>50</DropdownItem>
                    <DropdownItem onClick={() => {changeItemsPerPageFunc(100)}}>100</DropdownItem>
                </DropdownMenu>
            </DropdownButton>
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
                </>
                ) : (null)}
            <Table striped bordered hover responsive variant='dark'>
                    <thead>
                        <tr>
                            {headers.map(item => <th key={item}>{item}</th>)}
                        </tr>
                    </thead>
                    
                    <tbody className={styles.yScroll}>
                        {loadedItems.slice(start, end)?.map((result) => (
                            <tr key={uuid()}>
                                {dataFields.map(field => <td>{result ? result[field] : null}</td>)}
                            </tr>
                        ))}
                    </tbody>
                </Table>
        </Alert>
        </>
    );
}
 
export default SearchResults;