import React,{Fragment,useState} from 'react';
import propTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { isBooked } from '../../actions/tickets';
import {book_Tickets} from '../../actions/tickets';

const ViewSeats = ({buses,isBooked,book_Tickets}) => {

    let {id} = useParams();
    // isBooked({id})
    
    const [show, setShow] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([])
    const [disable, setDisabled] = useState(false);
    const [passengerNames,setPassengerNames] = useState([]);
    const [passengerAge,setPassengerAge] = useState([]);
    const [passengerGender,setPassengerGender] = useState([]);
    const [contactNumber,setContactNumber] = useState(0);
    const [journeyDate,setJourneyDate] = useState('');

    // console.log(selectedSeats,passengerNames,passengerAge,passengerGender,contactNumber,journeyDate)
    //getting Seat Number
// console.log(selectedSeats, "seats")
    const getSeatNumber = (e)=>{
        const newSeat = e.target.id;
        // console.log(e.target.id)
        e.target.disabled= true;
        setSelectedSeats([...selectedSeats,newSeat]);  
    }

    //for getting Passegner's names

    const getPassengerName = function(e){
        // console.log(Boolean(e.target.value))
        if(!passengerNames.includes(e.target.value) && e.target.value){
            setPassengerNames([...passengerNames,e.target.value])
        }
       
    }
//for getting passengerAge
    const getPassengerAge =  function(e){
        if(!passengerAge.includes(e.target.value) && e.target.value){
            setPassengerAge([...passengerAge,e.target.value])
        }
    }

//for getting passengergender
    const getPassengerGender = function(e){
        if(!passengerGender.includes(e.target.value) && e.target.value){
            setPassengerGender([...passengerGender, e.target.value])
        }
    }

    //for getting journey date
    const getJourneyDate = function(e){
            if(e.target.value){
                setJourneyDate(e.target.value)
            }
    }

    //for getting contact number
    const getContactInfo = function(e){
        if(e.target.value){
            setContactNumber(e.target.value)
        }
    }

 //for booking ticket
    const bookTicket = function(){
        console.log(contactNumber, "no");
        book_Tickets({selectedSeats,passengerNames,passengerGender,passengerAge,contactNumber,journeyDate,id})
    }
    return (<Fragment>
                <div className="col-12 mt-3 d-flex" id="seats">
                    <div className="col-6">
                        { buses.map(bus=>{ 
                                if(bus._id === id){
                                    return bus.seats.map(row=>(
                                        <div className="row text-center">
                                            <div className="col-3 mb-3">
                                                <button className="btn" type="button"  data-toggle="tooltip" data-placement="top" title={row[0]} id={row[0]} role="button" onClick={(e)=>{
                                                    setShow(true)
                                                    getSeatNumber(e)    
                                                }} disabled={disable} ><i className="fas fa-couch"></i></button>
                                                {/* <div >{row[0]}</div> */}
                                            </div>
                                            <div className="col-3">
                                                <button className="btn" data-toggle="tooltip" data-placement="top" title={row[1]}  id={row[1]} role="button" onClick={(e)=>{
                                                    setShow(true)
                                                    getSeatNumber(e)    
                                                }} disabled={disable}><i className="fas fa-couch"></i></button>
                                                {/* <div>{row[1]}</div> */}
                                            </div>
                                            <div className="col-3">
                                                <button className="btn" data-toggle="tooltip" data-placement="top" title={row[2]} id={row[2]} role="button"  onClick={(e)=>{
                                                    setShow(true)
                                                    getSeatNumber(e)    
                                                }} disabled={disable}><i className="fas fa-couch"></i></button>
                                               
                                            </div>
                                            <div className="col-3">
                                                <button className="btn" data-toggle="tooltip" data-placement="top" title={row[3]} id={row[3]} role="button" onClick={(e)=>{
                                                    setShow(true)
                                                    getSeatNumber(e)    
                                                }} disabled={disable}><i className="fas fa-couch"></i></button>

                                            </div>
                                        </div>
                                        )
                                    )
                                }   
                            })}
                        
                    </div>
                    {
                        (show)? (<Fragment>
                            <div className="col-6">
                                <div className="overflow-auto forms_sec border">
                                        {selectedSeats.map(Seats=>(
                                            <Fragment>
                                            <form key={Seats} className="passenger_info_sec border p-2 mt-2">
                                            <div className="form-group">
                                                <label>Seat No</label>
                                                <input type="text" className="form-control Seat_no" defaultValue={Seats} placeholder="Enter Seat Number"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input type="text" className="form-control Passenger_Name"  onMouseLeave={(e)=>getPassengerName(e)}placeholder="Enter Your Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Age</label>
                                                <input type="number" className="form-control Passenger_Age"  onMouseLeave={(e)=>getPassengerAge(e)} placeholder="Enter Your Age"/>
                                            </div>
                                            <div className="form-group">
                                                    <label>Gender</label>
                                                    <input type="text" className="form-control Passenger_Age"  onMouseLeave={(e)=>getPassengerGender(e)} placeholder="Enter Your Gender"/>
                                                    
                                            </div>
                                        </form>
                                        
                                            </Fragment>
                                        ))}
                                    <form>
                                    <div className="form-group">
                                                <label>Journey Date</label>
                                                <input type="date" className="form-control"  onMouseLeave={(e)=>getJourneyDate(e)} placeholder="Enter Your Name"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Contact Number</label>
                                                <input type="number" className="form-control Passenger_Age"  onMouseLeave={(e)=>getContactInfo(e)} placeholder="Enter Your Age"/>
                                            </div>
                                    </form>
                                    <div className="text-center">
                                            <button className="btn btn-primary mt-3" type="submit" onClick={(e)=>bookTicket()}>Book tickets</button>
                                        </div>
                                </div>
                            </div>
                            </Fragment>) : (<div></div>)
                    }
                </div>
                <div className="container d-flex justify-content-between mt-3">
                    <div className="confirm_seats_btn col-6 d-flex justify-content-around">
                        <button className="btn btn-primary mt-3 " onClick={()=>setDisabled(true)} disabled={disable}>
                            confirm seats  
                        </button>
                        <button className="btn btn-primary mt-3 " onClick={()=>setDisabled(false)} disabled={!disable}>
                           Again Select  
                        </button>
                    </div>
                    <div className="ticket_btn col-6 d-flex justify-content-around">
                        <button className="btn btn-danger mt-3" onClick={()=>setShow(false)}>
                            Cancel Booking 
                        </button>
                    </div>
                </div>
        </Fragment>
        )
    }

ViewSeats.propTypes = {
    buses: propTypes.array.isRequired,
    isBooked: propTypes.func.isRequired,
    book_Tickets: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    buses: state.bus.buses
})

export default connect(mapStateToProps,{isBooked,book_Tickets})(ViewSeats);
