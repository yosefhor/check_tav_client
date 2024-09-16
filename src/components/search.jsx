import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Search() {
    const [carNumber, setCarNumber] = useState('');
    const [isFound, setIsFound] = useState(false);
    const [result, setResult] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 8) {
            setCarNumber(text.replace(/\D/g, ''));
        };
    };

    const handlePaste = async (e) => {
        e.preventDefault();
        try {
            const text = await navigator.clipboard.readText();
            const numOnly = text.replace(/\D/g, '');
            if (numOnly.length <= 8) {
                setCarNumber(numOnly);
            };
        } catch (error) {
            console.error('Error reading clipboard:', error);
        }
    };

    const handleClear = (clearAll = false) => {
        setCarNumber('');
        if (clearAll) {
            setIsFound(false);
            setResult('');
        };
        inputRef.current?.focus();
    };

    const handleSubmit = () => {
        if (carNumber.length < 5) {
            toast.error('מספר הרכב אינו יכול להיות קצר מחמש ספרות!');
            return;
        }
        checkCar();
    };

    const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=';

    const checkCar = () => {
        setResult('');
        setIsFound(false);
        fetch(`${url}${carNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setIsFound(true);
                console.log(data.result);
                setResult(data.result);
                if (data.result.records[0]) {
                    const stringDate = data.result.records[0]['TAARICH HAFAKAT TAG'].toString()
                    if (stringDate.length === 8) {
                        setFormattedDate(`${stringDate.slice(6)}/${stringDate.slice(4, 6)}/${stringDate.slice(0, 4)}`);
                    }
                }
            })
            .catch(error => {
                const message = error.message === 'Network response was not ok'
                    ? 'שגיאה בשרת הנתונים, נסה שוב מאוחר יותר.'
                    : 'שגיאה בלתי צפויה, בדוק את החיבור או נסה שוב.';
                toast.error(message);
                console.error('Fetch error:', error);
            })
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className=' container mt-5'>
            <h1 className='text-center'>בדיקת תו נכה לרכב במאגר משרד התחבורה</h1>
            <div className=' d-flex justify-content-center'>
                <div className=' col-md-6'>
                    <label className=' form-label fs-4'>מספר הרכב (ללא מקפים):</label>
                    <div className=' input-group'>
                        <button className=' btn btn-outline-purple rounded-end-3 rounded-start-0 purple-border' type='button' aria-label='Search' onClick={handlePaste}><i className="bi bi-clipboard-check"></i></button>
                        <input ref={inputRef} className=' form-control rounded-0 border-end-0 border-start-0 border-primary shadow-none purple-border' type='text' inputMode='numeric' placeholder='00-000-00' value={carNumber} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                        <button className=' btn border-primary border-end-0 shadow-none purple-border' type='button' aria-label='Search' onClick={() => { handleClear() }}><i className="bi bi-x-circle-fill col-1"></i></button>
                        <button className=' btn btn-outline-purple rounded-end-0 rounded-start-3 col-3 col-md-4 shadow-none purple-border' type='button' aria-label='Search' onClick={handleSubmit}>בדוק</button>
                    </div>
                </div>
            </div>
            {isFound &&
                <>
                    <div className=' d-flex justify-content-center'>
                        {result.records[0] ?
                            <i class="bi bi-check-circle-fill text-success result-icon"></i> : <i class="bi bi-x-circle-fill fs-1 text-danger result-icon"></i>
                        }
                    </div>
                    <h3 className={` mb-3 text-${result.records[0] ? 'success' : 'danger'}`}>{`הרכב שמספרו ${result.q} ${`${result.records[0] ? '' : 'אינו'}`} זכאי לתו נכה על פי נתוני משרד התחבורה`}</h3>
                    {result.records[0] &&
                        <h4 className=' text-success-emphasis'>
                            <p>
                                <i class="bi bi-info-circle ms-3"></i>
                                מידע נוסף על הזכאות:
                            </p>
                            <p>
                                <i class="bi bi-calendar2-date  ms-3"></i>
                                מועד תחילת הזכאות: {formattedDate}
                            </p>
                            <p>
                                <i class="bi bi-arrow-left-circle ms-3"></i>
                                תו מסוג: {result.records[0]['SUG TAV'] === 1 ? 'תג נכה רגיל (עם משולש ירוק)' : 'תג נכה על כיסא גלגלים (עם מלבן כחול)'}
                            </p>
                        </h4>
                    }
                    <div className='d-flex justify-content-center'>
                        <button className=' btn btn-outline-secondary mt-3' type='button' aria-label='Search' onClick={() => { handleClear(true) }}>חיפוש חדש</button>
                    </div>
                </>}
            <ToastContainer position="bottom-center" rtl newestOnTop theme="colored" role="alert" pauseOnFocusLoss={false}/>
        </div>
    )
}