import React, { Component, Fragment } from 'react'
import jwt_decode from 'jwt-decode';
import openSocket from 'socket.io-client';
import MessageService from '../../services/message-service';
import ProfileService from '../../services/profile-service';
import '../../styles/ChatWidget.scss';
import '../../styles/Forms.scss';
import '../../styles/Message.scss';
import UserMessage from '../chat/UserMessage';
import profileImage from  '../../images/avatar.png';


const socket = openSocket('http://localhost:3200');


export default class ChatReverseAngular extends Component {
    static chatService = new MessageService();
    static profileService = new ProfileService();
    
    constructor(props) {
        super();
        
        this.state = {
            response: '',
            history: [],
            usersCollection: '',
            usersCollection2: '',
            participants: [],
            email: '',
            message: '',
            toId: '',
            toUserId: '',
            userIdSocket: '',
            fromUserId: ''
        }
    }
    
    componentDidMount() { 
        const toUserId = this.props.match.params.id;

        const token = jwt_decode(localStorage.getItem('token'));
        
        if (token) {
            this.setState({
                email: token.email,
                toUserId: toUserId,
                fromUserId: token.userId
            })
        }
        
        const { userIdSocket } = this.state;
        const { email, userId } = token;
        
        this.initializeSocketListeners();

        socket.emit('join', {
            userName: email,
            userId: userId,
            userSocketId: userIdSocket
        });

        setTimeout( () => {
            console.log(this.state);    
        },3000);
    }
    
    sendMessage = (event) => {
        event.preventDefault();
        
        const { fromUserId, toUserId, history, toId, userIdSocket, message } = this.state;

        if(message !== undefined && message !== '') {
            const userMessage = {
                from: fromUserId,
                to: toUserId,
                message: message,
                timestamp: new Date()
            }
            
            this.setState({
                history: [...history, userMessage]
            })

            if(toId) {
                const toIdUserMessage = {
                    fromId: userIdSocket,
                    fromUserId: fromUserId,
                    message: message,
                    toId: toId,
                    toUserId: toUserId,
                    dataSent: new Date()
                }
                socket.emit('sendMessage', toIdUserMessage);
            }
            console.log({
                from: fromUserId,
                toId: toUserId,
                message: message,
            });
            ChatReverseAngular.chatService.sendMessage({
                fromId: fromUserId,
                toId: toUserId,
                message: message,
            }).then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
        }
    }


    initializeSocketListeners = () => {        
        socket.on('generatedUserId', (userId) => {
            this.setState({
                userIdSocket: userId
            });

            socket.emit('giveMeOnlineUsersList', userId);
            
            this.getParticipants();
            this.getChatHistory();
        })

        socket.on('messageReceived', (message) => {
            console.log('message received = ', message);
            
            if(message.message.toUserId === this.state.fromUserId){
                const receivedMessage = {
                    fromId: message.message.fromUserId,
                    toId: message.message.toUserId,
                    message: message.message.message,
                    createdAt: message.message.dateSent
                };

                this.setState({
                    history: this.state.history.concat([receivedMessage])
                });

                console.log(this.state.history);
            }
        });

        socket.on('friendsListChanged', (usersCollectionRes) => {
            this.setState({
                usersCollection: usersCollectionRes
            });
        });

        socket.on('friendsListChanged2', (usersCollectionRes2) => {
            this.setState({
                usersCollection2: usersCollectionRes2
            });
            
            console.log('usersCollectionRes2= ', usersCollectionRes2);
            
            if(Object.keys(usersCollectionRes2).length) {
                for (const a of Object.keys(usersCollectionRes2)) {
                    console.log('a = ', usersCollectionRes2[a]);
                    if (usersCollectionRes2[a].fromUserId && usersCollectionRes2[a].fromUserId === this.props.match.params.id) {
                        
                        this.setState({
                            toId: a
                        });
                        
                        break;
                    }
                }
            }
        });

    }

    getParticipants = () => {
        const { fromUserId, participants } = this.state;
        ChatReverseAngular.chatService
            .getParticipants(fromUserId)
            .then((user) => {
                console.log('User getParticipants = ', user);
                user.users.map((userId) => {
                    ChatReverseAngular.profileService.getUserDetails(userId)
                    .then((res) => {
                        console.log('User profile response = ', res);

                        const participantDetails = {
                            userName: res.name,
                            userId: userId,
                            image: res.image,
                            newNotification: ''
                        }

                        this.setState({
                            participants: [...participants, participantDetails]
                        })
                    }).catch((error) => {
                        console.log(error);
                    });
                });
                console.log('User response = ', user);
            }).catch((error) => {
                console.log(error);
            })
    }

    getValue = ({target}) => {
        this.setState({
            [target.name] : target.value
        });        
    }

    getChatHistory = () => {
        // To do more research on this function

        const { fromUserId, toUserId } = this.state; 

        ChatReverseAngular.chatService
        .getChatHistory(fromUserId, toUserId)
        .then((res) => {
            this.setState({
                history: this.state.history.concat(res.chatHistories)
            })

            console.log('Chat History Response = ', res);
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        const {
            history,
            message,
            participants,
            toUserId,
            fromUserId
        } = this.state;
        
        
        return (
            <Fragment>
                <div className="container">
                    <div className="messaging ">
                        <div className="inbox_msg">
                            <div className="inbox_people">
                                <div className="inbox_chat">
                                    <div className='chat_list'>
                                        <ul className='list-user-message'>
                                            {
                                                participants? participants.map((participant) => (
                                                    <li onClick={this.changeUser} key={participant.userId}>
                                                        <UserMessage 
                                                            {...participant}
                                                        />
                                                    </li>
                                                )) : ''
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="messages">
                                <div className="message_history">
                                    {
                                        history? history.map((message, id) => {
                                            if (message.fromId === fromUserId) {
                                                return (
                                                    <div key={id} className={`${message.fromId === toUserId?  'message incoming_msg' : 'message outgoing_msg'}`}>
                                                        <div className="message__content">
                                                            <div className="message__inner">
                                                                <div className="message__entry">                                                                    
                                                                    <div className="message__description">
                                                                        { message.message}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="message__time">
                                                                    { (new Date(message.createdAt)).toLocaleDateString('en-US', 'short') }
                                                                </div>
                                                            </div>

                                                            <div className="message__image">
                                                                <img src={profileImage} alt=""/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            return (
                                                <div key={id} className={`${message.fromId === toUserId?  'message incoming_msg' : 'message outgoing_msg'}`}>
                                                    <div className="message__content">
                                                            <div className="message__inner">
                                                                <div className="message__entry">                                                                    
                                                                    <div className="message__description">
                                                                        { message.message}
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="message__time">
                                                                    { (new Date(message.createdAt)).toLocaleDateString('en-US', 'short') }
                                                                </div>
                                                            </div>

                                                            <div className="message__image">
                                                                <img src={profileImage} alt=""/>
                                                            </div>
                                                        </div>
                                                </div>
                                            ) 
                                        }) : ''
                                    }
                                </div>
                                
                                <div className="type_msg">
                                    <form className="form-message form-chat">
                                        <div className="input-group input-group-sm">
                                            <input type="text" className="form-control" onChange={this.getValue} value={ message || ''} name='message' id="message" placeholder="Type a message"  aria-describedby="send message"/>
                                        
                                            <button onClick={this.sendMessage} className="btn btn-primary btn-sm" type="submit">
                                                Send
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
