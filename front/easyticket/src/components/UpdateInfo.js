import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import axios from 'axios';
import history from '../history';

const baseUrl = "https://localhost:44398/api/users/";

class UpdateInfo extends React.Component {
    handleSubmit = (values) => {

        axios.put(baseUrl + this.props.id + "/", {
            firstName: values.firstName,
            lastName: values.lastName,
            address: values.address,
            username: values.username,
            password: values.password,
            email: values.email
        }).then(result => {
            alert("Successfully updated!");
            history.push('/userlogin');
        });
    }

    render() {
        return (<div>
            <RegisterForm onSubmit={this.handleSubmit} initialValues={this.props.initial} />
        </div>);
    }
}

export default UpdateInfo;