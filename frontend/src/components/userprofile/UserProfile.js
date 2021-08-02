import React, {Fragment,useState,useEffect} from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {getTickets} from '../../actions/tickets';
import {loadUser} from '../../actions/auth';

const UserProfile = ({user,getTickets}) => {
    getTickets()
    return (
        <Fragment>
            <div className="row mt-2 ml-2">
                    <Link to="/searchbus" type="button" className="btn btn-outline-info">Search bus</Link>
                </div>
            <div className="container text-center">
                <div className="d-flex justify-content-center greeting-icon_sec">
                    <i className="far fa-handshake"></i>
                </div>
                <div className="welcome_msg_sec text-center">
                        <h2>
                            <span><i className="fas fa-smile-beam"></i>
                            </span>Hey 
                        </h2>
                </div>
                <Link type="button" className="btn btn-outline-info mt-2" to="/my-tickets">My Bookings</Link>
            </div>
        </Fragment>
    )
}

UserProfile.propTypes = {
    user: propTypes.object,
    getTickets: propTypes.func,
    loadUser: propTypes.func
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps,{getTickets})(UserProfile)
