import React, {Fragment,useState,useEffect} from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {getAdminDetails} from '../../actions/admin';

const AdminDashboard = ({dashboard: {details, loading},user,getAdminDetails }) => {

    useEffect(()=>{
        getAdminDetails()
    },[getAdminDetails])

    const [busMoreDetails,setBusMoreDetails] = useState(false)
    const [staffsMoreDetails,setStaffMoreDetails] = useState(false)
    const [agencyMoreDetails,setAgencyMoreDetails] = useState(false)
    const [currentBusId,setCurrentBusId] = useState("No_Id")
    const [currentStaffId,setCurrentStaffId] = useState("No_Id")
    const days = [" Sunday", " Monday", " Tuesday", " Wednesday", " Thursday", " Friday", " Saturday"]

    //showing bus's more details

    const showBusMoreDetails = function (e){
        setCurrentBusId(e.target.id)
        return setBusMoreDetails(true)
    }

    //for going back to bus column

    const backToBusColumn = function(){
        setCurrentBusId("No_id")
        return setBusMoreDetails(false)
    }

    //showing staffs more details

    const showStaffMoreDetails = function (e){
        setCurrentStaffId(e.target.id)
        return setStaffMoreDetails(true)
    }

    //for going back to the staffs column

    const backToStaffColumn = function(e){
        setCurrentStaffId("No_Id")
        return setStaffMoreDetails(false)
    }

    if(!loading){
        const adminDetails = {
            buses: [],
            agencies: [],
            staffs: []
        }
    }
  
    return (
       
        <Fragment>
            {(!loading)?<Fragment>
                    <div className="container mt-3">
                        <div className="row justify-content-between">
                        <Link to="/user-profile" type="button" class="btn btn-outline-info mt-2">Your Profile</Link>
                        <Link class="btn btn-outline-info mt-2" to="/add-location">Add location</Link>
                        </div>
                    
                        <h3>Admin Dashboard</h3>
                        <div className="admin-details-sec row">
                            <div className="col-auto">
                                <div className="admin-name-sec">
                                    
                                    Name
                                </div>
                                <div className="admin-email-sec">
                                Email
                                  {/* {email} */}
                                </div>
                            </div>
                            <div className="col-auto">
                                <div className="admin-name">
                                    {user.name}
                                </div>
                                <div className="admin-email">
                                     {user.email}
                                </div>
                            </div>
                        </div>

                        <h3 className="mt-3">Other details</h3>
                        <div className="other-details-sec row mt-2">
                            
                            <div className="col-4 card">
                                <div className="card-body">
                                    {
                                        (busMoreDetails)? 
                                        <Fragment>
                                          {
                                                details.adminDashboard.buses.map(bus=>(
                                                        <Fragment>
                                                            {(bus._id === currentBusId )? 
                                                            <Fragment>
                                                                <h5 className="card-title mt-3 pb-2">
                                                                    {bus.busName}
                                                            </h5>

                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                        Vehicle No :
                                                                </div>
                                                                <div className="col-6 pl-0 pr-0">
                                                                        {bus.vehicleNo}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                    Seat Type:
                                                                </div>
                                                                <div className="col-6">
                                                                        {bus.seatCategory}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                    Bus Type
                                                                </div>
                                                                <div className="col-6">
                                                                       {bus.busType}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                        Travelling Days:
                                                                </div>
                                                                <div className="col-6">
                                                                        {bus.schedule.map(e=>days[e])}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                        Total Seats
                                                                </div>
                                                                <div className="col-6">
                                                                        {bus.seats.length*4}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                    Agency Name: 
                                                                </div>
                                                                <div className="col-6">
                                                                       {bus.busName}
                                                                </div>
                                                            </div>
                                                            <div className="col d-flex pl-0">
                                                                <div className="col-6 pl-0">
                                                                        Added At :
                                                                </div>
                                                                <div className="col-6">
                                                                       {bus.createdAt.slice(0,10)}
                                                                </div>
                                                            </div>
                                                            <div className="btn btn-info mr-2 mt-2" onClick={()=>backToBusColumn()}>
                                                                    Go Back
                                                            </div>
                                                            </Fragment>
                                                            :
                                                            <Fragment>

                                                            </Fragment>}
                                                            
                                                        </Fragment>
                                                ))
                                          }

                                          
                                        </Fragment>: 
                                        <Fragment>
                                            <h5 className="card-title border-bottom pb-2">
                                                Buses
                                            </h5>
                                            {
                                                details.adminDashboard.buses.map(bus=>(
                                                    <div className="mt-3">
                                                        <div className="bus-name">
                                                        {bus.busName}
                                                        </div>
                                                        <div className="bus-number-sec">
                                                        {bus.vehicleNo}
                                                        </div>
                                                        <div className="btn btn-info mt-2" id={bus._id}onClick={(e)=>showBusMoreDetails(e)}>
                                                            More Details
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </Fragment>
                                    }
                                <Link class="btn btn-outline-info mt-2" to="/add-bus">Add Bus</Link>
                                </div>
                            </div>
                            <div className="col-4 card">
                                <div className="card-body">
                                    <h5 className="card-title pb-2">
                                        staffs
                                    </h5>
                                         {
                                          details.adminDashboard.staffs.map(staffs=>(
                                                <Fragment>
                                                    <div className="mt-3">
                                                        <div className="staff-name">
                                                            {staffs.name}
                                                        </div>
                                                        <div className="staff-role">
                                                            {(staffs.isDriver)? "Driver": "Conductor"}
                                                        </div>
                                                        <button className="btn btn-info mt-2">
                                                            More Details
                                                        </button>
                                                    </div>   
                                                </Fragment>
                                    ))}
                                <Link class="btn btn-outline-info mt-2" to="/add-staff"> Add Staff</Link>
                                </div>
                            </div>
                            <div className="col-4 card ">
                                <div className="card-body">
                                    <h5 className="card-title pb-2">
                                        Agencies
                                    </h5>
                                    {details.adminDashboard.agencies.map(agency=>(
                                            <Fragment>
                                                <div className= "mt-3">
                                                    <div className="agency-name">
                                                       {agency.agencyName}
                                                    </div>
                                                    <div className="headOffice">
                                                       {agency.headOfficeLocation}
                                                    </div>
                                                        <button className="btn btn-info mt-2">
                                                            More Details
                                                        </button>
                                                </div>
                                            </Fragment>
                                    ))}
                                <Link className="btn btn-outline-info mt-2" to="/add-agency">Add Agency</Link>
                                </div>
                            </div>      
                        </div>
                    </div>
            </Fragment>: <Fragment>
            </Fragment>};
           
        </Fragment>
    )
}

AdminDashboard.propTypes = {
    dashboard : propTypes.object,
    user: propTypes.object,
    getAdminDetails:propTypes.func,
}

const mapStateToProps = (state) => ({
    dashboard : state.admin,
    user: state.auth.user
})
export default connect(mapStateToProps,{getAdminDetails})(AdminDashboard)
