import React from 'react';
import history from '../history';
import UserLogin from './UserLogin';
import UserPage from './UserPage';


class User extends React.Component {

    toDisplay = () => {
        if (localStorage.getItem('currentUser') === null || localStorage.getItem('currentUser') === undefined) {
            return <UserLogin />
        }

        return <UserPage />
    }

    render() {
        return (<div>
            {this.toDisplay()}
        </div>);
    }
}

export default User;