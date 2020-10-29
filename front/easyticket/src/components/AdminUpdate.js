import React from 'react';
import AdminForm from '../forms/AdminForm';
import axios from 'axios';
import history from '../history';

const baseUrl = "https://localhost:44398/api/admins/";

class AdminUpdate extends React.Component {
    handleSubmit = (values) => {

        axios.put(baseUrl + this.props.id + "/", {
            firstName: values.firstName,
            lastName: values.lastName,
            organization: values.organization,
            username: values.username,
            password: values.password,
            email: values.email
        }).then(result => {
            alert("Successfully updated!");
            history.push('/adminlogin');
        });
    }

    render() {
        return (<div>
            <AdminForm onSubmit={this.handleSubmit} />
        </div>);
    }
}

export default AdminUpdate;