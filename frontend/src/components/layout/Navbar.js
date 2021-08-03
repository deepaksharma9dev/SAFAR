import React,{ Fragment } from 'react';
import {Link,useHistory} from  'react-router-dom';
import { connect } from 'react-redux';
import {logOut} from '../../actions/auth';


const Navbar = ({isAuthenticated,logOut}) => {
    let history = useHistory()

    const logout = function(){
        logOut()
        history.push('/')
        window.location.reload(false)        
    }
   

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
            {
            (isAuthenticated)? 
            <Fragment>
                    <button className="btn btn-danger" data-toggle="modal" data-target=".bs-example-modal-sm">Logout</button>
                        <div className="modal bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                            <div className="modal-header"><h4>Logout <i className="fa fa-lock"></i></h4></div>
                            <div className="modal-body"><i className="fa fa-question-circle"></i> Are you sure you want to log-off?</div>
                            <div className="modal-footer">
                                <button className="btn btn-danger btn-block" onClick={()=>logout()}>Logout</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </Fragment>: <Fragment>
            </Fragment>
            }
            </nav>
        </Fragment> 
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps,{logOut})(Navbar);
