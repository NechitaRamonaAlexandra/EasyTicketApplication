import React from 'react';
import axios from 'axios';
import { Alert, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsFillTrashFill } from 'react-icons/bs';
import UpdateInfo from './UpdateInfo';
import history from '../history';
import { connect } from 'react-redux';

const baseUrl = "https://localhost:44398/api/users/";

const uticketUrl = "https://localhost:44398/api/usertoticket";

const ticketUrl = "https://localhost:44398/api/tickets";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: JSON.parse(localStorage.getItem('currentUser')).id,
            username: JSON.parse(localStorage.getItem('currentUser')).username,
            firstName: JSON.parse(localStorage.getItem('currentUser')).firstName,
            lastName: JSON.parse(localStorage.getItem('currentUser')).lastName,
            email: JSON.parse(localStorage.getItem('currentUser')).email,
            address: JSON.parse(localStorage.getItem('currentUser')).address,
            tickets: [],
            update: false,
            ticketIds: [],
            showTickets: false

        };
    }

    componentDidMount() {
        axios.get(uticketUrl + "/" + this.state.id).then(result => {
            this.setState({ ticketIds: result.data });
            console.log(this.state.ticketIds);
        }).catch(error => console.log(error));

        for (var i = 0; i < this.state.ticketIds.length; i++) {
            axios.get(ticketUrl + "/" + this.state.ticketIds[i].ticketId).then(result => {
                this.setState({ tickets: [...this.state.tickets, result.data] });
            }).catch(error => console.log(error));
        }
        
    }

    deleteAccount = () => {
        axios.delete(baseUrl + "?id=" + this.state.id).then(result => {

            alert("Successfully deleted!");
            history.push('/userlogin');
        });
    }

    updateInfo = () => {
        this.setState({ update: true });
    }

    seeTickets = () => {
        this.setState({ showTickets: true });
    }

    deleteTicket = id => {
        axios.delete(ticketUrl + "?id=" + this.state.id).then(result => {
            alert("Ticket Deleted!");
            history.push("/userpage");
        })
    }

    closeTickets = () => {
        this.setState({ showTickets: false });
    }

    logOut = () => {
        localStorage.removeItem('currentUser');
        history.push('/userlogin');
    }

    render() {
        return (<div>
            <Alert variant="info">
                <Alert.Heading >Welcome, {this.state.firstName} {this.state.lastName}! </Alert.Heading>
                <hr/>
                <p>This is your personal profile. It shows the tickets you have and some other personal info. </p>
                <div className="d-flex justify-content-end">
                    <Button onClick={this.logOut} variant="outline-danger">Log Out</Button>
                </div>
            </Alert>
            <Button variant="danger" onClick={this.deleteAccount}>Delete your account</Button>
            <Button variant="secondary" onClick={this.updateInfo}>Update Personal Info</Button>
            <br />
            <br />
            {this.state.showTickets ? <Alert variant="success">
                <Alert.Heading> Your Tickets </Alert.Heading>
                <ListGroup className="list-group-flush">
                    {this.state.tickets.map(ticket => <ListGroupItem key={ticket.id}> The ticket {ticket.id}, at {ticket.price}
                        <Button onClick={() => this.deleteTicket(ticket.id)} > Give up ticket <BsFillTrashFill /> </Button>
                    </ListGroupItem>)}
                    <Button onClick={this.closeTickets} variant="outline-success" >Close</Button>
                </ListGroup></Alert> :
                <Button variant="primary" onClick={this.seeTickets} > See Tickets </Button>}
            {this.state.update ? <UpdateInfo id={this.props.id} initial={this.state} /> : null}

        </div>);
            }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(UserPage);