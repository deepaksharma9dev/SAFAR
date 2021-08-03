import './App.css';
import React ,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import UserRegister from './components/auth/UserRegister';
import UserLogin from './components/auth/UserLogin';
import AdminRegister from './components/auth/AdminRegister';
import AdminLogin from './components/auth/AdminLogin';
import SearchBus from './components/bus/SearchBus';
import GetBuses from './components/bus/GetBuses';
import ViewSeats from './components/bus/ViewSeats';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AddBus from './components/bus/AddBus';
import AddAgency from './components/bus/AddAgency';
import AddBusStaff from './components/bus/AddBusStaff';
import AddLocation from './components/bus/AddLocation';
import UserProfile from './components/userprofile/UserProfile';
import Tickets from './components/tickets/Tickets';
import Alert from './components/layout/Alert'
import store from './store';
import setAuthToken  from './utils/setAuthToken';
import {loadUser} from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import{getAdminDetails} from './actions/admin';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(()=>{
    
   store.dispatch(loadUser())
  //  store.dispatch(getAdminDetails())
   
    },[]);

    return ( 
      <Provider store={store}>
          <Router>
            <Fragment>
              <Navbar/>
                <Route exact path="/" component={Landing}/>
                <section>
                  <Alert/>
                  <Switch>
                    <Route exact path="/signup-user" component={UserRegister}/>
                    <Route exact path="/login-user" component={UserLogin}/>
                    <Route exact path="/signup-admin" component={AdminRegister}/>
                    <Route exact path="/login-admin" component={AdminLogin}/>
                    <Route exact path="/searchbus" component={SearchBus}/>
                    <Route exact path="/allBuses" component={GetBuses}/>
                    <Route exact path="/view-seats/:id" component={ViewSeats}/>
                    <Route exact path="/admin-dashboard" component={AdminDashboard}/>
                    <Route exact path="/add-bus" component={AddBus}/>
                    <Route exact path="/add-agency" component={AddAgency}/>
                    <Route exact path="/add-staff" component={AddBusStaff}/>
                    <Route exact path="/add-location" component={AddLocation}/>
                    <Route exact path="/user-profile" component={UserProfile}/>
                    <Route exact path="/my-tickets" component={Tickets}/>
                    {/* <PrivateRoute exact="/searchbus" component={SearchBus}/> */}
                  </Switch>
                </section>
            </Fragment>
          </Router>
      </Provider>
      
    );
}

export default App;