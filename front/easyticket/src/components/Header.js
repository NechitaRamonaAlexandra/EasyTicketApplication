import React from 'react';
import { Navbar, Form, Button, FormControl, Nav } from 'react-bootstrap';


class Header extends React.Component
{
    render()
    {
        return (
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand href="/">EasyTicket</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-dark" />
                    <Navbar.Collapse id="basic-navbar-dark">
                        <Nav className="mr-auto">
                            <Nav.Link href="events">Events</Nav.Link>
                            <Nav.Link href="/adminlogin">Organizer</Nav.Link>
                            <Nav.Link href="/user">User</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;