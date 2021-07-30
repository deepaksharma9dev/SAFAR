import React, {Fragment,useState} from 'react'
import { Link ,Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import {register} from '../../actions/auth';
import propTypes from 'prop-types';


const UserRegister = ({setAlert,register,isAuthenticated}) => {

    const [formData,setFormData] = useState({
                            name: '',
                            email: '',
                            password: '',
                            confirm_password: ''
                        })

    const  {name,email,password,confirm_password} = formData;

    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

    const onSubmit=async(e)=>{    
        e.preventDefault();
        // console.log("working");
        if(password !== confirm_password) {
          setAlert("Your password is not matched","danger");
        }
        else{
            register({name,email,password,confirm_password})
        }
      }
    // console.log(isAuthenticated)


      if(isAuthenticated){
          return <Redirect to="/user-profile"></Redirect>
      }

    

    // console.log(formData)



    return (
        <Fragment>
            <div className="body col-12">
                <div className="login-box p-5">
                <h2 className="text-center">Sign up</h2>
                <form className="form" onSubmit={e=>onSubmit(e)}>
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
                {/* <Link type="submit" className="btn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </Link> */}
            </form>
         <Link to="/login-user" className="mt-4">
            Already Have An Account?
         </Link> 
        </div>
        </div>
        
    </Fragment>
    )
}

UserRegister.propTypes ={
    setAlert:propTypes.func.isRequired,
    register:propTypes.func.isRequired,
    isAuthenticated: propTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(UserRegister);
