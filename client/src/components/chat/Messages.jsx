import React, { Component, Fragment } from 'react';
import Message from '../chat/Message';
import '../../styles/Forms.scss';

export default class Messages extends Component {
    message = () => (
        [ 
            {
                _id: '4363634',
                message: 'This is test message',
                userImage: 'fsfsefsefes'
            },
            {
                _id: '4463363634',
                message: 'This is test message 2',
                userImage: 'fsfsefsefes 2'
            }
        ]
    )
        
    constructor(props) {
        super(props);
        
        this.state = {
            messages: [],
            message: ''
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

    componentDidMount () {
        Promise.resolve(this.message())
        .then((messages) => {
            this.setState({
                messages
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    
    render() {
        const { message, messages } = this.state;
        
        return (
            <Fragment>
                <div className="chat-messages">
                    {
                        messages.map((message) => (
                            <Message key={message._id} {...message} />
                        ))
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