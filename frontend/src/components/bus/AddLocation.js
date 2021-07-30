import React, {Fragment,useState} from 'react'
import propTypes from 'prop-types'
import { add_Location } from '../../actions/admin';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
// import {setAlert} from '../../actions/alert';

const AddLocation = ({add_Location}) => {
    const [formData,setFormData] = useState({
        city: "",
        state: ""
    })
    


    const onSubmit=(e)=>{    
        e.preventDefault(); 
        add_Location({city,state})
    }

    const {city,state} = formData

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
                <div className="container mt-4">
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="form-group row justify-content-around">
                            <label className="col-2">city</label>
                            <input type="text" className="form-control w-50 col" name="city" value={city} onChange={e=>onChange(e)} placeholder="Enter the Name"/>
                        </div>
                        <div className="form-group row justify-content-around">
                            <label className="col-2">State</label>
                            <input type="text" className="form-control w-50 col" name="state" value={state} onChange={e=>onChange(e)} placeholder="Enter phone No"/>
                        </div>
                        <button className="btn btn-info"> Add location</button>
                    </form>
                </div>
        </Fragment>
    )
}

AddLocation.propTypes = {
    add_Location: propTypes.func.isRequired
}

export default connect(null,{add_Location})(AddLocation);
