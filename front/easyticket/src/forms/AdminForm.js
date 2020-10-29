import React from 'react';
import { Field, reduxForm } from 'redux-form';



let AdminForm = props => {
    const { handleSubmit } = props;
    return (
        <div class="row justify-content-center">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <Field name="firstName" component="input" type="text" placeholder="First Name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <Field name="lastName" component="input" type="text" placeholder="Last Name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <Field name="email" component="input" type="text" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <Field name="username" component="input" type="text" placeholder="Username" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <Field name="password" component="input" type="password" placeholder="Password" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Organization</label>
                    <Field name="organization" component="input" type="text" placeholder="Organization" className="form-control" />
                </div>
                <button type="submit" className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>);
}

AdminForm = reduxForm({
    form: 'login'
})(AdminForm)

export default AdminForm;