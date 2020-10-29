import React from 'react';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import UserLogin from './components/UserLogin';
import EventList from './components/EventList'
import AdminLogin from './components/AdminLogin';
import { Router, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import UpdateInfo from './components/UpdateInfo';
import history from './history'
import AdminRegister from './components/AdminRegister'
import AddEvent from './components/AddEvent';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import User from './components/User';
import Chat from './components/Chat';

class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Route path="/adminreg" component={AdminRegister} />
                    <Route path="/adminpage" component={AdminPage} />
                    <Route path="/adminlogin" component={AdminLogin} />
                    <Route path="/update" component={UpdateInfo} />
                    <Route path="/userlogin" component={UserLogin} />
                    <Route path="/userpage" component={UserPage} />
                    <Route path="/userreg" component={RegisterPage} />
                    <Route path="/events" component={EventList} />
                    <Route path="/adminlog" component={AdminLogin} />
                    <Route path="/addEvent" component={AddEvent} />
                    <Route path="/user" component={User} />
                    <Route path="/chat" component={Chat} />
                    
                </div>
            </Router>
        );
    }
}

export default App;
