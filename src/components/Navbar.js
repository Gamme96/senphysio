import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline'; // Import Heroicons

function Navbar({ isBlurred }) {  // Accept isBlurred prop
    const [click, setClick] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    const handleClick = () => {
        console.log('Menu icon clicked'); // Debug log
        setClick(!click); 
    };

    const closeMobileMenu = () => setClick(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener('resize', handleResize);

        // Clean up listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className={`navbar-unique ${isBlurred ? 'blurred' : ''}`}> {/* Add blurred class */}
            <div className='navbar-container-unique'>
                <Link to="/" className='navbar-logo-unique' onClick={closeMobileMenu}>
                    <img src={`${process.env.PUBLIC_URL}/base_logo_transparent_background.png`} alt="Logo" />
                </Link>

                {/* Mobile Menu Icon */}
                {isMobile && (
                    <div className='menu-icon-unique' onClick={handleClick}>
                        {click ? <XIcon className='menu-icon' /> : <MenuIcon className='menu-icon' />}
                    </div>
                )}

                {/* Menu Items */}
                <ul className={isMobile ? (click ? 'nav-menu-unique mobile active' : 'nav-menu-unique mobile') : 'nav-menu-unique'}>
                    <li className='nav-item-unique'>
                        <Link to='/' className='nav-links-unique' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item-unique'>
                        <Link to='/ueber-uns' className='nav-links-unique' onClick={closeMobileMenu}>
                            Über uns
                        </Link>
                    </li>
                    <li className='nav-item-unique'>
                        <Link to='/galerie' className='nav-links-unique' onClick={closeMobileMenu}>
                            Galerie
                        </Link>
                    </li>
                    <li className='nav-item-unique'>
                        <Link to='/kontakt' className='nav-links-unique' onClick={closeMobileMenu}>
                            Kontakt
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
