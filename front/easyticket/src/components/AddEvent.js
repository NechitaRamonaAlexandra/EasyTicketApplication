import React from 'react';
import EventForm from '../forms/EventForm';
import axios from 'axios';
import history from '../history';
import { connect } from 'react-redux';
import { currentAdmin } from '../actions/adminActions';

const baseUrl = "https://localhost:44398/api/event/";

class AddEvent extends React.Component {

    componentDidMount = () => {
    }

    handleSubmit = (values) => {
        axios.post(baseUrl, {
            name: values.eventName,
            adminId: JSON.parse(localStorage.getItem('currentAdmin')).id,
            venue: values.venue,
            startTime: values.startingTime,
            stopTime: values.endingTime,
            ticketNo: values.tickets,
            ticketPrice: values.price
        }).then(result => {
            alert("Successfully created!");
            console.log(result);
            history.push('/adminpage');
        }).catch(error => console.log(error));
    }

    render() {
        return <EventForm onSubmit={this.handleSubmit} />
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin
    };
}


export default connect(mapStateToProps, { currentAdmin })(AddEvent);
