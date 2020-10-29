import React from 'react';
import { Field, reduxForm } from 'redux-form';

let EventForm = props => {
    const { handleSubmit } = props;
    return (
        <div className="wrapper">
                <div className="row justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Event Name</label>
                    <Field name="eventName" component="input" type="text" placeholder="Event Name" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Venue</label>
                    <Field name="venue" component="input" type="text" placeholder="Venue" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Starting Time</label>
                    <Field name="startingTime" component="input" type="text" placeholder="Starting Time" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Ending Time</label>
                    <Field name="endingTime" component="input" type="text" placeholder="Ending Time" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Available Tickets</label>
                    <Field name="tickets" component="input" type="text" placeholder="Available Tickets" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Standard Price</label>
                        <Field name="price" component="input" type="text" placeholder="Standard Price" className="form-control" />
                    </div>
                <button type="submit" className="btn btn-success btn-block">Add</button>
                </form>
                </div>
        </div>);
}

EventForm = reduxForm({
    form: 'login'
})(EventForm)

export default EventForm;