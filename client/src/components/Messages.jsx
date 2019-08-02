import React, { Component, Fragment } from 'react';
import Message from './Message';

export default class Messages extends Component {
    message = () => (
        [ 
            {
                id: '4363634',
                name: 'Gosho',
                message: 'This is test message',
                userImage: 'fsfsefsefes'
            },
            {
                id: '4463363634',
                name: 'Pesho',
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
        const { messages } = this.state;

        return (
            <Fragment>
                {
                    messages.map((item) => 
                        <Message key={item.id} {...item} />
                    )
                }
            </Fragment>
        );
    }
}