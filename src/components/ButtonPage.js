import React, { useEffect, useState } from 'react'
import '../css/ButtonPage.css'

function ButtonPage({top, handlePage}) {

    const [disabledPrevious, setDisabledPrevious] = useState(false)
    const [disabledNext, setDisabledNext] = useState(false)
    const [page, setPage] = useState(0)


    useEffect(() => {
        handlePage(page)

        if(page === 0){
            setDisabledPrevious(true)
        } else {
            setDisabledPrevious(false)
        }

        if(page=== top-1){
            setDisabledNext(true)
        } else {
            setDisabledNext(false)
        }
    },[page,top,handlePage])

    return (
        <div className="ButtonPage">   
            <button className="Previous" disabled={disabledPrevious} onClick={()=>{
                setPage(page - 1)
            }}>
                Previous
            </button>

            <div className="Page">
            <b>- {page+1} -</b>
            </div>
            
            <button className="Next" disabled={disabledNext} onClick={()=>{
                setPage(page + 1)
            }}>
                Next
            </button>
        </div>
    )
}

export default ButtonPage
