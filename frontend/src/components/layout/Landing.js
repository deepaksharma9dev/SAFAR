import React, { Fragment } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Bus1 from '../../assets/img/bus1.png';
import Bus2 from '../../assets/img/bus2.png';
import Bus3 from '../../assets/img/bus3.png';
import propTypes from  'prop-types';

const Landing = ({auth:{isAuthenticated}}) => {
    // console.log(isAuthenticated)    
    if(isAuthenticated){

       return <Redirect to="/user-profile"/>
    }

    return (
    <Fragment>
        <div className="Landing_sec col-12 text-center w-100">
            <div id="carouselExampleIndicators" className="carousel slide carousel_sec d-inline-block" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
            <div className="carousel-inner w-50 text-center carousel_sec d-inline-block">
                <div className="carousel-item active">
                    <img className="w-100 img-fluid" src={Bus1} alt="First slide"/>
                </div>
                <div className="carousel-item">
                    <img className="w-100 img-fluid" src={Bus2} alt="Second slide"/>
                </div>
                <div className="carousel-item">
                    <img className="w-100 img-fluid" src={Bus3} alt="Third slide"/>
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
            <div className="row flex-column justify-content-center align-items-center h-60">
                <p className="about_app_sec w-100">
                    Create Your Own Account To get Our Services
                </p>
                <div className="row w-100 justify-content-center mt-3">   
                <Link className="btn btn-danger mr-3" to="/signup-user">Sign Up {' '}<span className="badge badge-secondary">As {' '}User</span></Link>{' '}
                <Link className="btn btn-light border" to="/login-user">Login{' '}<span className="badge badge-secondary">As{' '} User</span></Link>
                </div>
                <div className="row w-100 justify-content-center mt-3">
                <Link className="btn btn-danger mr-3" to="/signup-admin">Sign Up{' '}<span className="badge badge-secondary">As {' '}Admin</span></Link>{' '}
                <Link className="btn btn-light border" to="/login-admin">Login{' '}<span className="badge badge-secondary">As{' '} Admin</span></Link>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

Landing.propTypes = {
    auth: propTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

// export default Landing;
export default connect(mapStateToProps)(Landing);
