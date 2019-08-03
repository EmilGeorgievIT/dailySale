import React, { Component, Fragment } from 'react';
import profileImage from  '../../images/avatar.png';
import UserMessage from '../chat/UserMessage';


export default class ListMessages extends Component {
    message = () => (
        [ 
            {
                _id: '4363634',
                name: 'Fes Facv',
                time: '19:43',
                message: 'This is test message',
                image: profileImage
            },
            {
                _id: '4463363634',
                name: 'Res Fadr',
                time: '09:43',
                message: 'This is test message 2',
                image: profileImage
            },
            {
                _id: '464634',
                name: 'Res Fadr 2',
                time: '09:43',
                message: 'This is test message 3',
                image: profileImage
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
        return(
            <Fragment>
                <ul className='list-user-message'>
                    {
                        this.state.messages.map((user) => (
                            <li>
                                <UserMessage 
                                    key={user._id}
                                    {...user}
                                />
                            </li>
                        ))
                    }
                </ul>
            </Fragment>
        )
    }
}