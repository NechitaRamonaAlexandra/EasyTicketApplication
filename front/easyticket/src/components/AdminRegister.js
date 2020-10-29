import React from 'react';
import axios from 'axios';
import history from '../history';
import AdminForm from '../forms/AdminForm';

const baseUrl = "https://localhost:44398/api/admins/";

class AdminRegister extends React.Component {

    handleSubmit = (values) => {
        console.log(values);
        axios.post(baseUrl, {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            password: values.password,
            email: values.email,
            organization: values.organization
        }).then(result => {
            alert("Successfully created!");
            history.push('/adminlogin');
        });
    }

    render() {
        return (<div>
            <AdminForm onSubmit={this.handleSubmit} />
        </div>);
    }
}

export default AdminRegister;