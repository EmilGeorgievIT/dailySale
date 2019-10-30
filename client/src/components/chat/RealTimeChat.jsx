import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import jwt_decode from 'jwt-decode';
import openSocket from 'socket.io-client';
import MessageService from '../../services/message-service';
import ProfileService from '../../services/profile-service';
import '../../styles/RealTimeChat.scss';
import '../../styles/Forms.scss';
import '../../styles/Message.scss';
import UserMessage from './UserMessage';
const API_SERVER = `${process.env.REACT_APP_API_SERVER}`;


const socket = openSocket(API_SERVER);


export default class RealTimeChat extends Component {
    static chatService = new MessageService();
    static profileService = new ProfileService();
    
    
    constructor(props) {
        super();
        
        this.state = {
            history: [],
            usersCollection: '',
            usersCollection2: '',
            participants: [],
            email: '',
            fromUserImage: '',
            toUserImage: '',
            message: '',
            toId: '',
            toUserId: '',
            toggleMessages: false,
            userIdSocket: '',
            fromUserId: ''
        }
    }
    
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    componentWillMount() {
        this.props.history.listen((location) => {
            if(location.pathname) {
                const id = location.pathname.replace('/chat/', '');
                
                this.setState({
                    toUserId: id,
                    history: [],
                    toggleMessages: true
                });

                setTimeout(() => {
                    this.getChatHistory();
                    this.getUserImage(this.state.toUserId, 'toUserImage');
                },500);
            }
        });
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
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

            this.getUserImage(toUserId, 'toUserImage');
            this.getUserImage(token.userId, 'fromUserImage');
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

        this.scrollToBottom();
    }

    getUserImage = (userId, type) => {
        const el = type;

        RealTimeChat.profileService.getUserImage(userId)
        .then((image) => {
            this.setState({
                [el]: image.image
            });
        }).catch((error) => {
            console.log(error);
        });
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
            RealTimeChat.chatService.sendMessage({
                fromId: fromUserId,
                toId: toUserId,
                message: message,
            }).then((res) => {
                this.setState({
                    message: ''
                });
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
                    createdAt: message.message.dataSent
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
    
    triggerList = (event) => {
        event.preventDefault();
        
        this.setState({
            toggleMessages: false
        });
    }

    getParticipants = () => {
        const { fromUserId } = this.state;
        RealTimeChat.chatService
            .getParticipants(fromUserId)
            .then((user) => {
                console.log('User getParticipants = ', user);
                user.users.map((userId) => {
                    RealTimeChat.profileService.getUserDetails(userId)
                    .then((res) => {
                        console.log('User profile response = ', res);

                        const participantDetails = {
                            userName: res.name,
                            userId: userId,
                            image: res.image,
                            newNotification: ''
                        }

                        this.setState({
                            participants: this.state.participants.concat([participantDetails])
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

        RealTimeChat.chatService
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
            toggleMessages,
            participants,
            fromUserImage,
            toUserId,
            toUserImage,
            fromUserId
        } = this.state;
        
        return (
            <Fragment>
                <div className="container">
                    <div className="messaging">
                        <div className="messaging__body">
                            <div className={toggleMessages ? 'inactive-list inbox_people' : 'inbox_people'}>
                                <div className="inbox_chat">
                                    <div className='chat_list'>
                                        <ul className='list-user-message'>
                                            {
                                                participants? participants.map((participant) => (
                                                    <li className={`${participant.userId === toUserId? 'active' : ''}`} key={participant.userId}>
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
                            
                            <div className={toggleMessages ? 'active-messages messages' : 'messages'}>
                                <div className="message__actions">
                                    <button onClick={this.triggerList} className='btn btn-primary btn-sm'>
                                        <i className="material-icons">
                                            keyboard_arrow_left
                                        </i>
                                    </button>
                                </div>

                                <div ref={(el) => { this.messagesContainer = el; }} className="message_history">
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
                                                                        { (new Date(message.createdAt || message.timestamp)).toLocaleDateString('en-US', 'short') }
                                                                    </div>
                                                                </div>

                                                                <div className="message__image">
                                                                    <img src={`${message.fromId === toUserId? toUserImage:  fromUserImage}`} alt=""/>
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
                                                                    { (new Date(message.createdAt || message.timestamp)).toLocaleDateString('en-US', 'short') }
                                                                </div>
                                                            </div>

                                                            <div className="message__image">
                                                                <img src={`${message.fromId === toUserId? toUserImage:  fromUserImage}`} alt=""/>
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
                                            <input type="text" className="form-control" onChange={this.getValue} value={ message || ''} name='message' id="message" placeholder="Write a message.."  aria-describedby="send message"/>
                                        
                                            <button onClick={this.sendMessage} className="btn btn-primary btn-md" type="submit">
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
