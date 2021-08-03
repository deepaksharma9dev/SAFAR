import React, {Fragment,useState} from 'react';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import {getBuses} from '../../actions/bus';
import {setAlert} from '../../actions/alert';

import propTypes from 'prop-types'


const SearchBus = ({getBuses,setAlert}) => {
    const [formData,setFormData] = useState({
        to: "",
        from: "",
        date: ""
    })

    const {to,from,date} =  formData;


    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    let searchedBuses =  useHistory();

    const onSubmit=(e)=>{    
        e.preventDefault();

        if(date<new Date().toISOString().slice(0, 10)){
           return setAlert('Please enter a valid date', 'danger')
        }
        
       getBuses({to,from,date})
       .then(response=>{
        searchedBuses.push('/allBuses');
       })
    }


    return (
        <Fragment>
            <div className="col-12 mt-3">
                <form className="form row" onSubmit={e=>onSubmit(e)}>
                    <div className="col col-sm-6 col-md-4 col-lg-3">
                        <input type="text" name="from" value={from} onChange={e=>onChange(e)}/>
                    </div> 
                    <div className="col col-sm-6 col-md-4 col-lg-3">
                        <input type="text" name="to" value={to} onChange={e=>onChange(e)}/>
                    </div>
                    <div className="col col-sm-6 col-md-4 col-lg-3">
                        <input type="date" name="date" value={date} onChange={e=>onChange(e)} required/>
                    </div>
                    <div className="col col-sm-6 col-md-12 col-lg-3 flex-md-row justify-content-md-center">
                        <input type="submit" className="btn btn-primary" value="Search"/>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

SearchBus.propTypes = {
    getBuses: propTypes.func.isRequired
}

export default connect(null,{getBuses,setAlert})(SearchBus);
