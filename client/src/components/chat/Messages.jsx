import React, { Component, Fragment } from 'react';
import Message from '../chat/Message';

export default class Messages extends Component {
    message = () => (
        [ 
            {
                id: '4363634',
                message: 'This is test message',
                userImage: 'fsfsefsefes'
            },
            {
                id: '4463363634',
                message: 'This is test message 2',
                userImage: 'fsfsefsefes 2'
            }
        ]
    )
        
    constructor(props) {
        super(props);
        
        this.state = {
            messages: []
        }
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

        return (
            <Fragment>
                {
                    this.state.messages.map((message) => (
                        <Message key={message.id} {...message} />
                    ))
                }
            </Fragment>
        );
    }
}