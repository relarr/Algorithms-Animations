import { Fragment } from 'react';

import Header from './Header';
import Link from './Link';

import './Navigation.css';

const Navigation = props => {
    return (
        <Fragment>
            <Header>
                <nav className='navigation'>
                    <Link />
                </nav>
            </Header>
        </Fragment>
    );
};

export default Navigation;