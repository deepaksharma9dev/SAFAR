import React, {Fragment,useState} from 'react';
import {Link,Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import {adminregister} from '../../actions/auth';

import { connect } from 'react-redux';
import propTypes from 'prop-types';



const AdminRegister = ({setAlert,adminregister,isAuthenticated}) => {
    
    const [formData,setFormData] = useState({
        admin_email: '',
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    const  {admin_email,name,email,password,confirm_password} = formData;

    const onSubmit=async(e)=>{    
        e.preventDefault();
        console.log("working");
        if(password !== confirm_password) {
        setAlert("Your password is not matched","danger");
            }
        else{
            adminregister({admin_email,name,email,password,confirm_password});
          
        }
    }

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    if(isAuthenticated){
        return <Redirect to="/admin-dashboard"/>
        }
    
    return (
    <Fragment>
    <div className="body col-12">
        <div className="login-box p-5">
        <h2 className="text-center">Sign up</h2>
        <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className="user-box">
                <input type="email" name="admin_email" value={admin_email} onChange={e=>onChange(e)} required=""/>
                <label>Admin Email</label>
            </div>
            <div className="user-box">
                <input type="text" name="name" value={name} onChange={e=>onChange(e)} required=""/>
                <label>Name</label>
            </div>
            <div className="user-box">
                <input type="email" name="email" value={email} onChange={e=>onChange(e)} required=""/>
                <label>Email Address</label>
            </div>
                <div className="user-box">
                <input type="password" name="password" value={password} onChange={e=>onChange(e)} required=""/>
                <label>Password</label>
            </div>
                <div className="user-box">
                <input type="password" name="confirm_password" value={confirm_password} onChange={e=>onChange(e)} required=""/>
                <label>Confirm Password</label>
            </div>
            <input type="submit" className="btn  btn-primary" value="Register" />

     </form>
     <Link to="/login-admin" className="mt-4">
        Already Have An Account?
     </Link>
    </div>
    </div>
    
</Fragment>
    )
}

AdminRegister.propTypes ={
    setAlert:propTypes.func.isRequired,
    adminregister:propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired
}

const mapStateToProps = (state) => ({

    isAuthenticated:state.auth.isAuthenticated

})

export default connect(mapStateToProps, {setAlert,adminregister})(AdminRegister);
