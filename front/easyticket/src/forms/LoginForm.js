import React from 'react';
import { Field, reduxForm } from 'redux-form';

let LoginForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="wrapper">
            <div className="row justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <Field name="username" component="input" type="text" placeholder="Username" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Field name="password" component="input" type="password" placeholder="Password" className="form-control" />
                    </div>
                        <button type="submit" className="btn btn-success btn-block">LOGIN</button>
                </form>
            </div>
        </div>);
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginForm;