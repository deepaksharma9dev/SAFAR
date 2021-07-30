import React, {Fragment,useState} from 'react'
import {setAlert} from '../../actions/alert';
import propTypes from 'prop-types'
import { connect } from 'react-redux';

import {addBus} from '../../actions/admin';

const AddBus = ({addBus,setAlert}) => {

const [formData,setFormData] = useState({
    busName: "",
    vehicleNo: "",
    seats: 0,
    busType: "",
    seatCategory: "",
    policy: "",
    image: "",
    from: "",
    to:"",
    arrivalTime: "",
    departureTime: ""
})

    const {
        busName,
        vehicleNo,
        seats,
        busType,
        seatCategory,
        policy,
        from,
        to,
        arrivalTime,
        departureTime
    } = formData

    const [image,setImages] = useState([]);
    const [staffs,setStaffs] = useState([]);
    const [schedule,setSchedule] = useState([]);
  

    const pushDays = function (e){

        if(!schedule.includes(e.target.value)){
            setSchedule([...schedule,e.target.value])
        }           
    }
    // console.log(schedule)

    const onSubmit=(e)=>{    
        e.preventDefault();
        
        if(to === from) {
        setAlert("Your cannot enter same starting and destination city","danger");
            }
        else{
            addBus({
                busName,
                vehicleNo,
                seats,
                busType,
                seatCategory,
                policy,
                from,
                to,
                arrivalTime,
                departureTime,
                image,
                staffs,
                schedule
            })
        }
    }

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
            <div className="container mt-4">
            <form onSubmit={(e)=>onSubmit(e)}>
                <div className="form-group row justify-content-around">
                    <label className="col-2">Bus Name</label>
                    <input type="text" className="form-control w-50 col" name="busName" value={busName} onChange={(e)=>onChange(e)} placeholder="Enter Bus Name"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">vehicle No</label>
                    <input type="text" className="form-control w-50 col" name="vehicleNo" value={vehicleNo} onChange={(e)=>onChange(e)} placeholder="Enter Vehicle No"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">seats</label>
                    <input type="number" className="form-control w-50 col" name="seats" value={seats} onChange={(e)=>onChange(e)} placeholder="Enter Numbers of Rows"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">busType</label>
                    <input type="text" className="form-control w-50 col" name="busType" value={busType} onChange={(e)=>onChange(e)} placeholder="Enter Ac or NonAc"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">seatCategory</label>
                    <input type="text" className="form-control w-50 col" name="seatCategory" value={seatCategory} onChange={(e)=>onChange(e)} placeholder="Enter sleeper or semi sleeper"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">policy</label>
                    <input type="text" className="form-control w-50 col" name="policy" value={policy} onChange={(e)=>onChange(e)} placeholder="Enter the policy"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">image</label>
                    <input type="text" className="form-control w-50 col" name="image" onChange={(e)=>setImages(e.target.value)} placeholder="Enter the link of the image"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2" >Staff_Number</label>
                    
                    <input type="number" className="form-control w-50 col" name="Staff_Number" onChange={(e)=>setStaffs(e.target.value)} placeholder="Enter The valid staff number"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">from</label>
                    <input type="text" className="form-control w-50 col" name="from" value={from} onChange={(e)=>onChange(e)} placeholder="Enter the city name"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">to</label>
                    <input type="text" className="form-control w-50 col" name="to" value={to} onChange={(e)=>onChange(e)} placeholder="Enter the city name"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">arrivalTime</label>
                    <input type="text" className="form-control w-50 col" name="arrivalTime" value={arrivalTime} onChange={(e)=>onChange(e)}placeholder="Enter the arrivalTime"/>
                </div>
                <div className="form-group row justify-content-around">
                    <label className="col-2">departureTime</label>
                    <input type="text" className="form-control w-50 col" name="departureTime" value={departureTime} onChange={(e)=>onChange(e)} placeholder="Enter the departureTime"/>
                </div>
                <div className="schedule_sec">
                Schedule {' '}
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Sunday</label>
                        <input className="form-check-input" type="checkbox" value="Sunday" onChange={(e)=>pushDays(e)}/>
                    </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Monday</label>
                        <input className="form-check-input" type="checkbox" value="Monday"onChange={(e)=>pushDays(e)}/>
                        </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Tuesday</label>{' '}
                        <input className="form-check-input" type="checkbox" value="Tuesday" onChange={(e)=>pushDays(e)}/>
                    </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Wednesday</label>
                        <input className="form-check-input" type="checkbox" value="Wednesday" onChange={(e)=>pushDays(e)}/>
                    </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Thurday</label>
                        <input className="form-check-input" type="checkbox" value="Thurday" onChange={(e)=>pushDays(e)}/>
                    </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Friday</label>
                        <input className="form-check-input" type="checkbox" value="Friday" onChange={(e)=>pushDays(e)}/>
                    </div>
                    <div className="form-check form-check-inline mr-0">
                        <label className="form-check-label">Saturday</label>
                        <input className="form-check-input" type="checkbox" value="Saturday" onChange={(e)=>pushDays(e)}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            </div>
            
        </Fragment>
    )
}

AddBus.propTypes = {
    addBus: propTypes.func.isRequired,
    setAlert: propTypes.func.isRequired
}

export default connect(null,{addBus,setAlert})(AddBus)

