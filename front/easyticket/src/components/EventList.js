import React from 'react';
import {Card, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import axios from 'axios';
import Pic from '../img/k.png';
import history from '../history';

const baseUrl = "https://localhost:44398/api/event/";

const ticketUrl = "https://localhost:44398/api/tickets/";

const uticketUrl = "https://localhost:44398/api/usertoticket"


class EventList extends React.Component {
    constructor() {
        super();
        this.state = {
            events: [],
            newlyCreated: {}
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get(baseUrl).then(result => {
            this.setState({ events: result.data });

        });
    }

    deleteEvent = event => {
        axios.delete(baseUrl + "?id=" + event.id).then(() => {
            alert("Succesfully Deleted!!");
            this.fetchData();
        });
    }

    buyTicket = event => {
        if (localStorage.getItem('currentUser') === null) {
            alert("You have to sign in first!");
            history.push("/userlogin");
        }
        axios.post(ticketUrl, {
            eventId: event.id,
            price: event.ticketPrice
        }).then(result => console.log("this is from post",result));

        axios.get(ticketUrl).then(result => {
            console.log(result.data[result.data.length - 1]);
            this.setState({ newlyCreated: result.data[result.data.length - 1] });
        });

        console.log(JSON.parse(localStorage.getItem('currentUser')).id);
        axios.post(uticketUrl + "?ticketId=" + this.state.newlyCreated.id + "&userId="
            + JSON.parse(localStorage.getItem('currentUser')).id).then(result => console.log("from second post", result));
        //history.push("/events");
    }


    render() {
        return (<div>
            {(this.state.events.length === 0) ? <p>No events yet!</p> :
                this.state.events.map(event => (
                    <Card style={{ width: '100rem' }} key={event.id} >
                        <Card.Img variant='top' src={Pic} width='100%' height='100vh' />
                        <Card.Body>
                            <Card.Title>{event.name}</Card.Title>
                            <Card.Text> </Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>{event.venue}</ListGroupItem>
                                <ListGroupItem>{event.startTime} - {event.stopTime}</ListGroupItem>
                            </ListGroup>
                            <Button variant="primary" onClick={() => this.buyTicket(event)} > Buy Tickets </Button>
                        </Card.Body>
                                </Card>
                    ))}
        </div>);
    }
}

export default EventList;