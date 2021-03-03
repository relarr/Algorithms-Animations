import React from 'react';
import { NavLink } from 'react-router-dom';

import './Link.css';

const Link = () => {
    return (
        <ul className='link'>
            <li>
                <NavLink to='/searching-algorithms'>SEARCHING ALGORITHMS</NavLink>
            </li>
            <li>
                <NavLink to='/sorting-algorithms'>SORTING ALGORITHMS</NavLink>
            </li>
        </ul>
    );
};

export default Link;