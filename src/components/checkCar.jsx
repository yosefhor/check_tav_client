import React from 'react';
import {addDash} from './addDash';
import { toast } from 'react-toastify';

export default function CheckCar({ setIsFetching, carNumber, setResultCarNumber, setIsFound, setResult, setFormattedDate }) {
    const urlAPI = 'https://data.gov.il/api/3/action/datastore_search?resource_id=c8b9f9c8-4612-4068-934f-d4acd2e3c06e&q=';

    const checkCar = async () => {
        try {
            setIsFetching(true);
            const response = await fetch(`${urlAPI}${carNumber}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            handleData(data);
        } catch (error) {
            handleError(error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleData = (data) => {
        const modifiedQueryNum = {addDash}(data.result.q);
        setResultCarNumber(modifiedQueryNum);
        setIsFound(true);
        setResult(data.result);
        if (data.result.records[0]) {
            const stringDate = data.result.records[0]['TAARICH HAFAKAT TAG'].toString();
            if (stringDate.length === 8) {
                setFormattedDate(`${stringDate.slice(6)}/${stringDate.slice(4, 6)}/${stringDate.slice(0, 4)}`);
            }
        }
    };

    const handleError = (error) => {
        const message = error.message === 'Network response was not ok'
            ? 'שגיאה בשרת הנתונים, נסה שוב מאוחר יותר.'
            : 'שגיאה בלתי צפויה, בדוק את החיבור או נסה שוב.';
        toast.error(message);
        console.error('Fetch error:', error);
    };

    return (
        <div>
            <button onClick={checkCar}>בדוק רכב</button>
        </div>
    );
}
