import React, {Fragment,useState} from 'react';
import { Link ,Redirect} from 'react-router-dom';
// import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import {login} from '../../actions/auth';
import propTypes from  'prop-types';


const UserLogin = ({login,isAuthenticated}) => {
        const [formData,setFormData] = useState({
                    email: '',
                    password: ''
                })

        const  {email,password} = formData;

        const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

        const onSubmit=async(e)=>{    
            e.preventDefault();
            login({email,password})
        }

    if(isAuthenticated){
        return <Redirect to="/user-profile"></Redirect>
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
                <input type="submit" className="btn btn-primary" />
         </form>
         <Link to="/signup-user" className="mt-4">
           Don't Have Account ?
         </Link>
        </div>
        </div>
        </Fragment>
    )
}

UserLogin.propTypes = {
    login: propTypes.func.isRequired,
    isAuthenticated: propTypes.bool.isRequired
}

const mapStateToProps = (state) => ({

    isAuthenticated:state.auth.isAuthenticated

})

export default connect(mapStateToProps,{login})(UserLogin);
