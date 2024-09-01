import React, { useState } from 'react'

export default function Search() {
    const [carNumber, setCarNumber] = useState('')
    const [result, setResult] = useState('')

    const handleInputChange = (e) => {
        setCarNumber(e.target.value)
    }

    const handleSubmit = async () => {
        fetch('http://127.0.0.1:3001')
            .then(response => response.text())
            .then(data => setResult(data))
            .catch(err => console.error(err))
        setResult('')
    }

    return (
        <div className=' container mt-5'>
            <h1 className='text-center'>בדיקת תו נכה לרכב במאגר המתעדכן מידי יום ממשרד התחבורה</h1>
            <div className=' d-flex justify-content-center'>
                <div className=' col-md-6'>
                    <label className=' form-label fs-4'>מספר הרכב (ללא מקפים):</label>
                    <div className=' input-group'>
                        <button className=' btn btn-outline-primary rounded-end-3 rounded-start-0 col-1' type='button' aria-label='Search' onClick={handleSubmit}>הדבק</button>
                        <input className=' form-control rounded-0' type='number' inputMode='numeric' placeholder='00-000-00' value={carNumber} onChange={handleInputChange}></input>
                        <button className=' btn btn-outline-primary rounded-end-0 rounded-start-3 col-3 col-md-4' type='button' aria-label='Search' onClick={handleSubmit}>בדוק</button>
                    </div>
                </div>
            </div>
            {result === '1' && (<div>
                <h4>תוצאת חיפוש:</h4>
                <h4 className=' text-success'>'רכב {carNumber} זכאי לתו נכה על פי מאגר משרד התחבורה'</h4>
            </div>)}
            {result === '2' && (<div>
                <h4>תוצאת חיפוש:</h4>
                <h4 className=' text-danger'>'רכב {carNumber} אינו זכאי לתו נכה על פי מאגר משרד התחבורה'</h4>
            </div>)}
        </div>
    )
}
