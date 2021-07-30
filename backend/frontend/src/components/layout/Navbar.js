import React,{ Fragment } from 'react';
import {Link} from  'react-router-dom';
const Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-sm navbar-light border-bottom header_sec">
            <Link className="navbar-brand w-50 safar_logo" to="/">{' '}
            <span><i className="fas fa-bus"></i>{' '}</span>
            <span className="safar_text">Safar</span> {' '}<span className="travels_text">Travels</span></Link>
            <button className="navbar-toggler nav-button border" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto about_sec">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">About</Link>
                    </li>
                </ul>
            </div>
            </nav>
        </Fragment> 
    )
}

export default Navbar;
