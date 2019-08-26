import React, { Component, Fragment } from 'react';
import Message from '../chat/Message';
import '../../styles/Forms.scss';
import MessageService from '../../services/message-service';
import ProfileService from '../../services/profile-service';


export default class Messages extends Component {
    _isMounted = false;
    static service = new ProfileService();
    static getReceivedMessage = new MessageService();
        
    constructor(props) {
        super(props);
        
        this.state = {
            messages: [],
            message: '',
            user: ''
        }
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        const message = this.state.message;
        if(message !== '') {
            this.setState({
                messages: [message, ...this.state.messages]
            });
        }

        console.log(this.state);
    }

    changeValue = ({target}) => {
        this.setState({
            [target.name]: target.value 
        })
    }

    async componentDidMount () {
        this._isMounted = true;
        const userId = localStorage.getItem('ds_chk_temp');
        
        if(this._isMounted) {
            const user = await Messages.service.getUserDetails(userId)
            .then((user) => {
                this.setState({user});
            })
            
            try {
                const allMessages = await Messages.getReceivedMessage
                .getMessages({
                    list: this.state.user.sentMessages
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
        const { message, messages } = this.state;
        
        return (
            <Fragment>
                <div className="chat-messages">
                    {
                        messages? messages.map((message) => (
                            <Message key={message._id} {...message} />
                        )): ''
                    }
                </div>

                <form className='form-chat'>
                    <div className="input-group input-group-sm">
                        <input type="text" onChange= {this.changeValue} name='message' value={message} className="form-control" aria-label="send message" aria-describedby="send message"/>
                        
                        <button onClick={this.onSubmit} type='submit' className='btn btn-primary btn-sm'>
                            Send
                        </button>
                    </div>
                </form>
            </Fragment>
        );
    }
}