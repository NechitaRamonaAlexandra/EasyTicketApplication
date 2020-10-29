import React from 'react';
import { Button } from 'react-bootstrap'
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@aspnet/signalr';
import { currentUser } from '../actions/userActions';

const chatUrl = 'https://localhost:44398/chat'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            message: '',
            messages: [],
            hubConnection: null,
        };
    }

    componentDidMount = () => {
        const nick = JSON.parse(localStorage.getItem('currentUser')).firstName;
        const hubConnection = new HubConnectionBuilder()
            .withUrl(chatUrl, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            })
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection, nick }, () => {
            this.state.hubConnection.start().then(() => console.log('Connection Started!'))
                .catch(error => console.log(error));

            this.state.hubConnection.on('Send', (nick, receivedMessage) => {
                const text = `${nick}: ${receivedMessage}`;
                const messages = this.state.messages.concat([text]);
                this.setState({ messages });
            });
        });
    }

    sendMessage = () => {
        this.state.hubConnection.invoke('Send', this.state.nick, this.state.message)
            .catch(error => console.log(error));

        this.setState({ message: '' });
    }

    render() {
        return (
            <div className="form-group">
                <br />
                <label htmlFor="formGroupExampleInput">Name </label>
                <input
                    className='form-control'
                    type="text"
                    value={this.state.nick}
                    onChange={e => this.setState({ nick: e.target.value })}
                />
                <label htmlFor="formGroupExampleInput">Message </label>
                <input
                    className = 'form-control'
                    type="text"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />

                <Button onClick={this.sendMessage}>Send</Button>

                <div>
                    {this.state.messages.map((message, index) => (
                        <span style={{ display: 'block' }} key={index}> {message} </span>
                    ))}
                </div>
            </div>
        );
    }
}

export default Chat;