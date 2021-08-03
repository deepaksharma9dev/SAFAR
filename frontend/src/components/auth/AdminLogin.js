import React, {Fragment,useState} from 'react';
import { Link ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {adminlogin} from '../../actions/auth';
import { getAdminDetails } from '../../actions/bus';
import propTypes from  'prop-types';

const AdminLogin = ({adminlogin,isAuthenticated,loading}) => {

            const [formData,setFormData] = useState({
                email: '',
                password: ''
            });

        const  {email,password} = formData;

        const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
        const onSubmit=async(e)=>{    
        e.preventDefault();
            adminlogin({email,password});
          
        }

        if(isAuthenticated && !loading){
            return <Redirect to="/admin-dashboard"/>
        }
    return (
        <Fragment>
        <div className="body col-12">
        <div className="login-box p-5">
        <h2 className="text-center">Login</h2>
        <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className="user-box">
                <input type="email" name="email" value={email} onChange={e=>onChange(e)} required=""/>
                <label>Email Address</label>
            </div>
            <div className="user-box">
                <input type="password" name="password" value={password} onChange={e=>onChange(e)} required=""/>
                <label>Password</label>
            </div>
            <input type="submit" className="btn  btn-primary" value="login" />
     </form>
     <Link to="/signup-admin" className="mt-4">
       Don't Have Account ?
     </Link>
    </div>
    </div>
    </Fragment>
    )
}


AdminLogin.propTypes = {
    adminlogin: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired,
    loading:propTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.admin.loading
})

export  default connect(mapStateToProps,{adminlogin})(AdminLogin);
