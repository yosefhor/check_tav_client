import React, { useState } from 'react';

export default function Search() {
    const [carNumber, setCarNumber] = useState('');
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

    const handleSubmit = async () => {
        setResult('');
        const url = 'https://data.gov.il/api/3/action/datastore_search';
        try {
            const response = await fetch(`${url}?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=${carNumber}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
            console.log(result);
            // console.log(result.result.records[0]);
            setCarNumber('')
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    }

    return (
        <div className=' container mt-5'>
            <h1 className='text-center'>בדיקת תו נכה לרכב במאגר משרד התחבורה</h1>
            <div className=' d-flex justify-content-center'>
                <div className=' col-md-6'>
                    <label className=' form-label fs-4'>מספר הרכב (ללא מקפים):</label>
                    <div className=' input-group'>
                        <button className=' btn btn-outline-primary rounded-end-3 rounded-start-0' type='button' aria-label='Search' onClick={handlePaste}><i className="bi bi-clipboard-check"></i></button>
                        <input className=' form-control rounded-0' type='number' inputMode='numeric' placeholder='00-000-00' value={carNumber} onChange={handleInputChange}></input>
                        <button className=' btn btn-outline-primary rounded-end-0 rounded-start-3 col-3 col-md-4' type='button' aria-label='Search' onClick={handleSubmit}>בדוק</button>
                    </div>
                </div>
            </div>
            {result === 'found' && (<div>
                <h4>תוצאת חיפוש:</h4>
                <h4 className=' text-success'>'רכב {result.result.records[0]} זכאי לתו נכה על פי מאגר משרד התחבורה'</h4>
            </div>)}
            {result === 'notFound' && (<div>
                <h4>תוצאת חיפוש:</h4>
                <h4 className=' text-danger'>'רכב {result.result.records[0]} אינו זכאי לתו נכה על פי מאגר משרד התחבורה'</h4>
            </div>)}
        </div>
    )
}



// fetch('https://check-tav-server.onrender.com')
// if (carNumber.length < 5) {
//     alert('too short');
//     return;
// } else if (carNumber.length > 8) {
//     alert('too long');
//     return;
// }
// setOriginalCarNumber(carNumber);
// let fixedCarNumber = carNumber

// switch (true) {
//     case (carNumber.length === 5):
//         fixedCarNumber = '000' + carNumber;
//         break;
//     case (carNumber.length === 6):
//         fixedCarNumber = '00' + carNumber;
//         break;
//     case (carNumber.length === 7):
//         fixedCarNumber = '0' + carNumber;
//         break;
//     default:
//         break;
// }
// fetch('http://127.0.0.1:3001', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ carNumber: fixedCarNumber })
// })
// .then(response => response.json())
// .then(data => setResult(data.message))
// .catch(err => console.error(err))