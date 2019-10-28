import React, { Component, Fragment } from 'react';
import UserMessage from '../chat/UserMessage';
import MessageService from '../../services/message-service';
import ProfileService from '../../services/profile-service';

export default class ListMessages extends Component {
    _isMounted = false;
    static service = new ProfileService();
    static getReceivedMessage = new MessageService();

    constructor(props) {
        super(props);
        
        this.state = {
            messages: '',
            user: ''
        }
    }
    
    changeUser = (event) => {
        event.preventDefault();
        
        console.log('clicked');
    }

    async componentDidMount () {
        this._isMounted = true;
        const userId = localStorage.getItem('ds_chk_temp');
        
        if(this._isMounted) {
            const user = await ListMessages.service.getUserDetails(userId)
            .then((user) => {
                this.setState({user});
            })
            
            try {
                const allMessages = await ListMessages.getReceivedMessage
                .getMessages({
                    list: this.state.user.receivedMessages
                });
                this.setState({
                    messages: allMessages
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render() {
        return(
            <Fragment>
                <ul className='list-user-message'>
                    {
                        this.state.messages? this.state.messages.map((user) => (
                            <li onClick={this.changeUser} key={user._id}>
                                {/* <UserMessage 
                                    {...user}
                                /> */}
                            </li>
                        )) : ''
                    }
                </ul>
            </Fragment>
        )
    }
}