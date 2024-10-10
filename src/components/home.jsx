import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import FadeLoader from "react-spinners/FadeLoader";
import { Link } from 'react-router-dom';
import {CheckCar} from './checkCar';
import { addDash } from './addDash';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [carNumber, setCarNumber] = useState('');
    const [fixedCarNumber, setFixedCarNumber] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isFound, setIsFound] = useState(false);
    const [result, setResult] = useState('');
    const [resultCarNumber, setResultCarNumber] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const inputRef = useRef(null);
    const additionalInfo = useRef(null);
    const { checkCar } = CheckCar({ setIsFetching, carNumber, setResultCarNumber, setIsFound, setResult, setFormattedDate });

    const handleInputChange = (e) => {
        const text = e.target.value;
        if (text.length <= 10) {
            const numOnly = text.replace(/\D/g, '');
            setCarNumber(numOnly);
            const formattedNumber = addDash(numOnly);
            setFixedCarNumber(formattedNumber);
        };
    };

    const handlePaste = async (e) => {
        e.preventDefault();
        try {
            const text = await navigator.clipboard.readText();
            const numOnly = text.replace(/\D/g, '');
            if (numOnly.length <= 8) {
                setCarNumber(numOnly);
                const formattedNumber = addDash(numOnly);
                setFixedCarNumber(formattedNumber);
            };
        } catch (error) {
            console.error('Error reading clipboard:', error);
        }
    };

    const handleClear = (clearAll = false) => {
        setCarNumber('');
        setFixedCarNumber('');
        if (clearAll) {
            setIsFound(false);
            setResult('');
        };
        inputRef.current?.focus();
    };

    const handleSubmit = () => {
        if (!carNumber) {
            inputRef.current?.focus();
            return;
        }
        if (carNumber.length < 5) {
            toast.error('מספר הרכב אינו יכול להיות קצר מחמש ספרות!');
            inputRef.current?.focus();
            return;
        }
        setResult('');
        setIsFound(false);
        saveToHistory(carNumber);
        inputRef.current?.blur();
        checkCar();
    };

    const saveToHistory = (newSearch) => {
        const alreadyExist = searchHistory.find(num => num === newSearch);
        if (!alreadyExist) {
            const updatedHistory = [newSearch, ...searchHistory].slice(0, 10);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
            setSearchHistory(updatedHistory);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    useEffect(() => {
        const storedHistory = localStorage.getItem('searchHistory');
        storedHistory && setSearchHistory(JSON.parse(storedHistory));
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (showInfo) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showInfo]);

    const handleClickOutside = (event) => {
        if (additionalInfo.current && !additionalInfo.current.contains(event.target)) {
            setShowInfo(false);
        }
    };

    return (
        <div className=' container mt-5'>
            <h1 className='mt-5 mb-4 text-purple text-center'>בדיקת תו נכה לרכב במאגר משרד התחבורה</h1>
            <div className=' d-flex justify-content-center'>
                <div className=' col-md-6'>
                    <label className=' form-label fs-4 text-purple'>מספר הרכב:</label>
                    <div className=' input-group'>
                        <button className=' btn btn-outline-purple rounded-end-3 rounded-start-0 purple-border' type='button' aria-label='Paste' onClick={handlePaste}>
                            <i className="bi bi-clipboard-check"></i>
                        </button>
                        <input list="carNumbers" ref={inputRef} aria-label='הזן מספר רכב לחיפוש' aria-controls="carNumbers" className=' form-control rounded-0 border-end-0 border-start-0 border-primary shadow-none purple-border' type='text' inputMode='numeric' placeholder='5 עד 8 ספרות, ללא מקפים' value={fixedCarNumber} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
                        <datalist id='carNumbers'>
                            {searchHistory.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
                        </datalist>
                        <button aria-label='נקה את השדה' className=' btn btn-clear border-end-0 shadow-none purple-border' type='button' onClick={() => { handleClear() }}>
                            <i className="bi bi-x-circle-fill col-1"></i>
                        </button>
                        <button className=' btn btn-purple rounded-end-0 rounded-start-3 col-3 col-md-4 shadow-none purple-border' type='button' aria-label='בצע חיפוש' onClick={handleSubmit}>בדוק</button>
                    </div>
                </div>
            </div>
            {isFetching &&
                <div className=' d-flex justify-content-center mt-5'>
                    <FadeLoader color='purple' aria-label="Spinner טוען נתונים" />
                </div>
            }
            {isFound &&
                <>
                    <div className=' d-flex justify-content-center'>
                        {result.records[0] ?
                            <i className="bi bi-check-circle-fill text-success result-icon"></i> : <i className="bi bi-x-circle-fill text-danger result-icon"></i>
                        }
                    </div>
                    <h3 className={` mb-3 text-${result.records[0] ? 'success-emphasis' : 'danger-custom'}`}>רכב מספר <span className=' px-1 text-black bg-warning bg-opacity-75 rounded' style={{ whiteSpace: 'nowrap' }}>{resultCarNumber}</span> {`${result.records[0] ? '' : 'אינו'}`} זכאי לתו נכה על פי נתוני משרד התחבורה</h3>
                    {result.records[0] &&
                        <div className=' text-success-emphasis fs-5 bg-body-tertiary p-1 rounded'>
                            <h4 className=' mb-4 text-decoration-underline'>
                                <i className="bi bi-info-circle ms-3"></i>
                                מידע נוסף על הזכאות:
                            </h4>
                            <p>
                                <i className="bi bi-calendar2-date ms-3"></i>
                                מועד תחילת הזכאות: {formattedDate}
                            </p>
                            <div>
                                <i className="bi bi-arrow-left-circle ms-3"></i>
                                תו מסוג: {result.records[0]['SUG TAV'] === 1 ? 'תג נכה רגיל (עם משולש ירוק)' : 'תג נכה על כיסא גלגלים (עם מלבן כחול)'}
                                <span style={{ whiteSpace: 'nowrap' }}>
                                    {' '}
                                    <Button className='info-btn pe-1' /*don't delete the 'variant' attribute*/ variant='' ref={additionalInfo} onClick={() => { setShowInfo(!showInfo) }}>
                                        <i className="bi bi-info-circle fs-6"></i>
                                    </Button>
                                </span>
                                <Overlay target={additionalInfo} show={showInfo}>
                                    <Tooltip aria-live="polite">
                                        {result.records[0]['SUG TAV'] === 1 ? 'לא ' : ''}
                                        כולל זכאות לנסיעה בנת"צ<br />למידע נוסף ראה{' '}
                                        <Link to='/faq#headingFive'>כאן</Link>
                                    </Tooltip>
                                </Overlay>
                            </div>
                        </div>
                    }
                    <div className='d-flex justify-content-center'>
                        <button className=' btn btn-outline-secondary mt-3' type='button' aria-label='ClearAll' onClick={() => { handleClear(true) }}>חיפוש חדש</button>
                    </div>
                </>}
            <ToastContainer position="bottom-center" rtl newestOnTop theme="colored" role="alert" pauseOnFocusLoss={false} />
        </div>
    )
}