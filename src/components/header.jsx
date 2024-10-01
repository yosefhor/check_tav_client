import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const navbarCollapseRef = useRef(null);

    const handleLinkClick = () => {
        if (navbarCollapseRef.current) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    return (
        <header className=' sticky-top bg-white'>
            <Link to='/' className=' d-flex align-items-center justify-content-center text-decoration-none' style={{ height: 'calc(50px + 3vw)' }}>
                <h1 id='main_logo'>Tav4you</h1>
            </Link>
            <hr className=' rounded border-4 my-0 text-success-emphasis' />
            <div className="navbar navbar-expand-md bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div ref={navbarCollapseRef} className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-3">
                                <Link className="nav-link active text-blue" aria-current="page" to='/' onClick={handleLinkClick}>בית</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link text-blue" to='/info' onClick={handleLinkClick}>מידע</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link text-blue" to='/faq' onClick={handleLinkClick}>שאלות נפוצות</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
