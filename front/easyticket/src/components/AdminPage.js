import React from 'react';
import { Card, Alert, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BsFillTrashFill} from 'react-icons/bs';
import axios from 'axios';
import AdminUpdate from './AdminUpdate';
import history from '../history';
import { connect } from 'react-redux';

let baseUrl = "https://localhost:44398/api/admins/";

let eventUrl = "https://localhost:44398/api/event/"

class AdminPage extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            username: '',
            firstName: '',
            lastName: '',
            events: [],
            update: false

        };
    }


    componentDidMount() {
        this.setState({
            id: JSON.parse(localStorage.getItem('currentAdmin')).id,
            username: JSON.parse(localStorage.getItem('currentAdmin')).username,
            firstName: JSON.parse(localStorage.getItem('currentAdmin')).firstName,
            lastName: JSON.parse(localStorage.getItem('currentAdmin')).lastName,
            events: []
        });
        
    }

    deleteAccount = () => {
        axios.delete(baseUrl + "?id=" + this.props.admin.id).then(result => {

            alert("Successfully deleted!");
            history.push('/adminlogin');
        });
    }

    updateInfo = () => {
        this.setState({ update: true });
    }

    seeEvents = () => {
        axios.get(eventUrl + JSON.parse(localStorage.getItem('currentAdmin')).id).then(result => {
            this.setState({ events: result.data });
        });
    }

    deleteEvent = id => {
        axios.delete(eventUrl + "?id=" + id).then(result => {
            alert("Successfuly Deleted!");
            history.push("/adminpage");
        });
    }

    addEvent = () => {
        history.push("/addEvent");
    }

    render() {
        return (<div>
            <Alert variant="info">
                <Alert.Heading >Welcome, {this.state.firstName} {this.state.lastName}! </Alert.Heading>
                <hr />
                <p>This is your personal profile. It shows the tickets you have and some other personal info. </p>

            </Alert>
            <Card>
                <Card.Body>
                    <Card.Title>Manage Your Events </Card.Title>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem></ListGroupItem>
                        <ListGroupItem><Button onClick={this.deleteAccount}><BsFillTrashFill /> </Button> Delete your account</ListGroupItem>
                        <ListGroupItem><Button onClick={this.updateInfo}>Update Personal Info</Button></ListGroupItem>
                        <ListGroupItem><Button onClick={this.seeEvents} >See Events</Button>
                            <p>    </p>
                            <Button onClick={this.addEvent}> Add a new Event </Button>
                        </ListGroupItem>

                    </ListGroup>

                    {this.state.update ? <AdminUpdate id={this.props.id} initial={this.state} /> : null}
                </Card.Body>
            </Card>
            <ListGroup>
                {this.state.events.map(event => <ListGroupItem>{event.name}
                    <Button onClick={() => this.deleteEvent(event.id) } > <BsFillTrashFill /> </Button>
                </ListGroupItem>)}
            </ListGroup>

        </div>);
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin
    };


}


export default connect(mapStateToProps)(AdminPage);