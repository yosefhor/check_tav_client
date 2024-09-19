import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.webp';
import writtenLogo from '../writtenLogo.png';

export default function Header() {
    return (
        <header className=' sticky-top'>
            <div className=' d-flex justify-content-end bg-white' style={{ height: '110px' }}>
                <Link to='/' className=' d-flex align-items-center' >
                    <img src={writtenLogo} alt='writtenLogo' id='top_center_element' className=' p-4 img-fluid position-absolute' style={{ width: '350px' }}/>
                </Link>
                <Link to='/'>
                    <img src={logo} alt='logo' className=' h-100 img-fluid img-thumbnail d-none d-md-block' />
                </Link>
            </div>
            <hr className=' rounded border-4 mt-0' />
        </header>
    )
}
