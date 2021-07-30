import React,{Fragment,useState} from 'react'
import { connect } from 'react-redux';
import {Link,Redirect,useHistory} from 'react-router-dom';
import ViewSeats from './ViewSeats';
import propTypes from 'prop-types'
import {setAlert} from '../../actions/alert';

const GetBuses = ({buses}) => {
    // console.log("err");
    
   const history = useHistory();
    return (
        <Fragment>
            {buses.length === 0 ? (<Fragment>
            <div>
                not found
            </div>
            </Fragment>) : (<Fragment>
                {
                buses.map(bus=>
                    (<div className="row mt-3">
                        <div className="col-12">
                                <div className="card w-100">
                                    <div className="card-body d-flex">
                                        <div className="col-2">
                                            <div className="busname">
                                                {bus.busName}
                                            </div>
                                            <div className="bustype">
                                                {bus.busType}
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="fromcity">
                                                {bus.from.city}
                                            </div>
                                            <div className="departure-time">
                                                {bus.departureTime}
                                            </div>
                                        </div>
                                        <div className="col-2">to</div>
                                        <div className="col-2">
                                            <div className="tocity">
                                                {bus.to.city}
                                            </div>
                                            <div className="arrivaltime">
                                                {bus.arrivalTime}
                                            </div>
                                        </div>
                                        <div className="col-2">Fare {' '} 500<br/>
                                            Fix price hai bhai..
                                        </div>
                                        <div className="col-2">Total Seats {' '}
                                            {bus.seats.length*4}
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex">
                                            <div className="col-2">
                                                Date
                                            </div>
                                            <div className="col-2">
                                            <div className="dropdown show">
                                                    <button className="btn btn-secondary" type="submit" onClick={()=>history.push(`/view-seats/${bus._id}`)}>
                                                        View Seats
                                                    </button>
                                            </div>
                                            </div>
                                        <div className="col-2">
                                            <div className="dropdown show">
                                                <Link className="btn btn-secondary dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Images
                                                </Link>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <Link className="dropdown-item" href="#">Action</Link>
                                                    <Link className="dropdown-item" href="#">Another action</Link>
                                                    <Link className="dropdown-item" href="#">Something else here</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className="dropdown show">
                                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Bus Staff
                                                    </a>
                                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                        <Link className="dropdown-item" to="#">Action</Link>
                                                        <Link className="dropdown-item" to="#">Another action</Link>
                                                        <Link className="dropdown-item" to="#">Something else here</Link>
                                                    </div>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <button type="button" className="btn btn-info">Policy</button>
                                        </div>
                                        <div className="col-2">
                                        <button type="button" className="btn btn-info">Reviews</button>
                                        </div>
                                    </div>
                                </div>
                            </div>        
                    </div>)

                )} 
                </Fragment>)
            }
        </Fragment>
    )
}

GetBuses.propTypes = {
    buses: propTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    buses: state.bus.buses
})

export default connect(mapStateToProps)(GetBuses)
