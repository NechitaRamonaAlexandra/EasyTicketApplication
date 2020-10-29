import React from 'react';
import history from '../history';
import AdminLogin from './AdminLogin';
import AdminPage from './AdminPage';


class Admin extends React.Component {

    toDisplay = () => {
        if (localStorage.getItem('currentAdmin') === null || localStorage.getItem('currentAdmin') === undefined) {
            return <AdminLogin />
        }

        return <AdminPage />
    }

    render() {
        return (<div>
            {this.toDisplay()}
        </div>);
    }
}

export default Admin;