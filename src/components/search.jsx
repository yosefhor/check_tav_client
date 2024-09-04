import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search() {
    const [carNumber, setCarNumber] = useState('');
    const [isFound, setIsFound] = useState(false);
    const [result, setResult] = useState('');

    const handleInputChange = (e) => {
        setCarNumber(e.target.value)
    }

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            setCarNumber(text.replace(/\D/g, '')); // מסנן כל תו שהוא לא מספר
        } catch (err) {
            console.error('Failed to read clipboard contents: ', err);
        }
    };

    const handleClear = () => {
        setCarNumber('');
        setIsFound(false);
    };

    const handleClearInput = () => {
        setCarNumber('');
    };

    const handleSubmit = () => {
        if (carNumber.length < 5) {
            toast.error('מספר הרכב אינו יכול להיות קצר מחמש ספרות!');
            return;
        } else if (carNumber.length > 8) {
            toast.error('מספר הרכב אינו יכול להיות ארוך משמונה ספרות!');
            return;
        };
        setResult('');
        setIsFound(false);
        const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=';
        fetch(`${url}${carNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setIsFound(true);
                setResult(data);
                console.log(data);
            }).catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className=' container mt-5'>
            <h1 className='text-center'>בדיקת תו נכה לרכב במאגר משרד התחבורה</h1>
            <div className=' d-flex justify-content-center'>
                <div className=' col-md-6'>
                    <label className=' form-label fs-4'>מספר הרכב (ללא מקפים):</label>
                    <div className=' input-group'>
                        <button className=' btn btn-outline-primary rounded-end-3 rounded-start-0' type='button' aria-label='Search' onClick={handlePaste}><i className="bi bi-clipboard-check"></i></button>
                        <input className=' form-control rounded-0 border-end-0 border-start-0 border-primary shadow-none' type='number' inputMode='numeric' placeholder='00-000-00' value={carNumber} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                        <button className=' btn border-primary border-end-0 ' type='button' aria-label='Search' onClick={handleClearInput}><i class="bi bi-x-circle-fill col-1"></i></button>
                        <button className=' btn btn-outline-primary rounded-end-0 rounded-start-3 col-3 col-md-4' type='button' aria-label='Search' onClick={handleSubmit}>בדוק</button>
                    </div>
                    <div className='d-flex justify-content-center mt-2'>
                        <button className=' btn btn-sm btn-outline-secondary' type='button' aria-label='Search' onClick={handleClear}>חיפוש חדש</button>
                    </div>
                </div>
            </div>
            {isFound && (<div>
                <h4>תוצאת חיפוש:</h4>
                <h4 className={`text-${result.result.total === 1 ? 'success' : 'danger'}`}>{`הרכב שמספרו ${result.result.q} ${`${result.result.total === 0 ? 'אינו' : ''}`} זכאי לתו נכה על פי מאגר משרד התחבורה`}</h4>
            </div>)}
            <ToastContainer position="bottom-center" rtl theme="colored"/>
        </div>
    )
}