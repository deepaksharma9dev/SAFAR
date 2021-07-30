import React, {Fragment,useState} from 'react'
import propTypes from 'prop-types'
import { add_Agency } from '../../actions/admin';
import { connect } from 'react-redux';

const AddAgency = ({add_Agency}) => {
    const [formData,setFormData] = useState({
        phone: 0,
        agencyName: "",
        headOfficeLocation: ""
    })
    
    const onSubmit=(e)=>{    
        e.preventDefault();
        console.log("called")
        add_Agency({phone,agencyName,headOfficeLocation})
        
       
    }

const {phone,agencyName,headOfficeLocation} = formData

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    return (
        <Fragment>
                <div className="container mt-4">
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className="form-group row justify-content-around">
                            <label className="col-2">Phone No</label>
                            <input type="number" className="form-control w-50 col" name="phone" value={phone} onChange={(e)=>onChange(e)}placeholder="Enter the Name"/>
                        </div>
                        <div className="form-group row justify-content-around">
                            <label className="col-2">Agency Name</label>
                            <input type="text" className="form-control w-50 col" name="agencyName" value={agencyName} onChange={(e)=>onChange(e)} placeholder="Enter phone No"/>
                        </div>
                        <div className="form-group row justify-content-around">
                            <label className="col-2">head Office Location</label>
                            <input type="text" className="form-control w-50 col" name="headOfficeLocation" value={headOfficeLocation} onChange={(e)=>onChange(e)} placeholder="Enter phone No"/>
                        </div>
                        <button type="submit" class="btn btn-outline-success">Add Agency</button>
                    </form>
                    
                </div>
        </Fragment>
    )
}

AddAgency.propTypes = {
    add_Agency: propTypes.func.isRequired
}

export default connect(null,{add_Agency})(AddAgency)
