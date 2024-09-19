import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className=' containern mt-5 text-center'>
            <h2>404 - אופס, הדף שאתה מחפש עדיין לא קיים ;)  </h2>
            <h3>בינתיים, תוכל לחזור לדף הבית על ידי לחיצה</h3>
            <Link to="/">
                <button className="btn btn-lg btn-outline-purple purple-border col-4">כאן</button>
            </Link>
        </div>
    )
}
