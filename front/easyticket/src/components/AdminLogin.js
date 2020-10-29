import React from 'react';
import AdminPage from './AdminPage';
import axios from 'axios';
import LoginForm from '../forms/LoginForm';
import history from '../history';
import { Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { SET_ADMIN } from '../actions/actionNames';

class AdminLogin extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: 0,
            wrongPass: false,
            noAcc: false
        }
    }

    submit = values => {
        axios.get('https://localhost:44398/api/admins/').then(result => {
            for (var i = 0; i < result.data.length; i++) {
                if (values.username === result.data[i].username) {
                    if (values.password === result.data[i].password) {
                        this.props.logAdmin(result.data[i]);
                        localStorage.setItem('currentAdmin', JSON.stringify(result.data[i]));
                        console.log(JSON.parse(localStorage.getItem('currentAdmin')));
                        this.setState({ loggedIn: result.data[i].id, wrongPass: false, noAcc: false });
                        history.push("/admin");
                    }
                    else {
                        this.setState({ wrongPass: true });
                    }
                }
                
            }

        }).catch(error => {
            console.log(error);
        });


    }

    registerAdmin = () => {
        history.push("/adminreg");
    }

    render() {
        return (
            <div>
                <p>

                </p>
                 <LoginForm onSubmit={this.submit} />

                <div className="row justify-content-center">
                    {(this.state.wrongPass === true) ? <div><Alert variant="danger">
                        <Alert.Heading> Wrong password, try again </Alert.Heading>
                    </Alert>
                    </div> : <p> </p>}
                    </div>
                <div className="row justify-content-center">
                {(this.state.loggedIn === 0) ? <div> <p>Don't have an account? Register here:</p>
                        <Button variant="primary" onClick={this.registerAdmin}>Register</Button></div> : null}
                </div>

            </div>);
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin
    };
}

const mapDispatchToProps = dispatch => {
    return {
        logAdmin: (theAdmin) => dispatch({ type: SET_ADMIN, payload: theAdmin })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);