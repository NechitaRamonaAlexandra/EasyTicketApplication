import React from 'react';
import LoginForm from '../forms/LoginForm';
import axios from 'axios';
import UserPage from './UserPage';
import { Button, Alert } from 'react-bootstrap';
import history from '../history';
import { connect } from 'react-redux';
import { SET_USER } from '../actions/actionNames';

class UserLogin extends React.Component
{
    constructor() {
        super();
        this.state = {
            loggedIn: 0,
            wrongPass: false
        }
    }

    submit = values => {
        
        axios.get('https://localhost:44398/api/users/').then(result => {
            for (var i = 0; i < result.data.length; i++){
                if (values.username === result.data[i].username) {
                    if (values.password === result.data[i].password) {
                        this.setState({ loggedIn: result.data[i].id, wrongPass: false });
                        localStorage.setItem('currentUser', JSON.stringify(result.data[i]));
                        console.log(JSON.parse(localStorage.getItem('currentUser')));
                        history.push("/user");
                    }
                    else {
                        alert("Wrong Password!");
                        this.setState({ wrongPass: true });
                    }
                }
            }

        }).catch(error => {
            console.log(error);
        });
        
    }

    registerUser = () => {
        history.push("/userreg")
    }

    render() {
        return (
            <div>
                 <LoginForm onSubmit={this.submit} /> 
                <div className="row justify-content-center">
                    {(this.state.wrongPass === true) ? <div><Alert variant="danger">
                        <Alert.Heading> Wrong password, try again </Alert.Heading>
                    </Alert>
                    </div> : <p> </p>}
                </div>
                <hr />
                <div className="row justify-content-center">
                {(this.state.loggedIn === 0) ?<div> <p>Don't have an account? Register here:</p>
                        <Button variant="primary" onClick={this.registerUser}>Register</Button></div> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrent: (theUser) => dispatch({ type: SET_USER, payload: theUser})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);