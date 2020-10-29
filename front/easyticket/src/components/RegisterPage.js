import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import axios from 'axios';

const baseUrl = "https://localhost:44398/api/users/";

class RegisterPage extends React.Component {
    
    handleSubmit = (values) => {
        
        axios.post(baseUrl, {
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            username: values.username,
            password: values.password,
            email: values.email }).then(result => {
                alert("Successfully created!");
                this.props.history.push('/userlogin');
        });
    }

    render() {
        return(<div>
            <RegisterForm onSubmit={this.handleSubmit} />
        </div>);
    }
}

export default RegisterPage;