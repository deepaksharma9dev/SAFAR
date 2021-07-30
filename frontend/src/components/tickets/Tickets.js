import React, {Fragment} from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {cancelTicket} from '../../actions/tickets';
const Tickets = ({tickets,cancelTicket}) => {
    let counter=0;
        return (!tickets)? (<Fragment>
                                    <div className="container text-center">
                                        <div className="no-tickets-icon">
                                            <i className="far fa-frown"></i>
                                        </div>
                                        <h2>
                                            Oops.. You Do not booked any ticket please Book:)
                                        </h2>
                                        <Link to="/searchbus" type="button" class="btn btn-outline-info">Search bus</Link>
                                    </div>
                            
                        </Fragment>):(
                                <Fragment>
                                <div className="container-fluid">
                                    <div className="ticket-info text-center mt-2">
                                            <h3>Your Tickets</h3>
                                            <div className="card">
                                            {tickets.map(ticket=>(
                                                <Fragment>
                                                        <div className="card-body d-flex" key={ticket}>
                                                            <div className="col-auto">
                                                                {counter+=1}
                                                            </div>
                                                            <div className="col d-flex">
                                                                {ticket.passengers.map(passenger=>(
                                                                    <Fragment>
                                                                        <div className="col-auto seat_no_sec d-flex" key={passenger}>
                                                                            <div className="seat_no">
                                                                                Seat No:
                                                                            </div>
                                                                            <div className="seat_no">
                                                                                {passenger.seat_no}
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        <div className="col-auto passenger_name_sec  d-flex">
                                                                            <div className="passenger_name">
                                                                                Passenger Name:
                                                                            </div>
                                                                            <div className="passenger_name">
                                                                                {passenger.name}
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        
                                                                    </Fragment>
                                                                ))}
                                                                <div className="col-auto d-flex">
                                                                        <div className="journey_date">
                                                                            journeyDate :
                                                                        </div>
                                                                        <div>   
                                                                                {ticket.journeyDate.slice(0,10)}
                                                                        </div>
                                                                </div>
                                                                <div className="col-auto d-flex">
                                                                    <div>
                                                                        Booked At :
                                                                    </div>
                                                                    <div>
                                                                        {ticket.createdAt.slice(0,10)}
                                                                    </div>
                                                                </div>
                                                                <div className="col">
                                                                    <button type="button" class="btn btn-outline-danger" id={ticket._id} onClick={(e)=>cancelTicket(e.target.id)}>Cancel Ticket</button>
                                                                </div>
                                                            
                                                            </div>
                                                        </div>
                                                </Fragment>
                                            ))}
                                                
                                            </div>
                                        
                                    </div>
                                    

                                </div>
                                </Fragment>
                            )
}

Tickets.propTypes = {  
    tickets: propTypes.array,
    cancelTicket: propTypes.func
}

const mapStateToProps = (state) => ({
    tickets: state.tickets.tickets.tickets
})
export default connect(mapStateToProps,{cancelTicket})(Tickets)
