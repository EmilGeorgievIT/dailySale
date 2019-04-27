import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Comment from '../components/Comment';
import Price from '../components/shared/Price';
import User from '../components/shared/User';

import PostService from '../services/posts-service';
import '../styles/Sections.scss';
import '../styles/helpers.scss';
import '../styles/Buttons.scss';

export default class PostDetails extends Component {
    static service = new PostService();

    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            image: '',
            location: '',
            date: '',
            price: '',
            phone: '',
            description: '',
            creator: '',
            isTop: false
        }
    }
    async componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);

        try {
            let postId = this.props.match.params.id;
            const post = await PostDetails.service.getPostById(postId);
            
            this.setState({ ...post })
        } catch(error) {
            console.log(error);
        }
    }
    handleScroll = (event) => {
        const el = document.getElementsByClassName('footer');
        const elOffsetTop = el[0].offsetTop;

        const isTop = window.scrollY >= 165 && window.scrollY <= elOffsetTop - window.innerHeight;
        
        if (isTop !== this.state.isTop) {
            this.setState({ isTop })
        }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        const { title, image, price, description, date, location, phone, creator } = this.state;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + `data:image/jpeg;base64,${image}` + ")"
        };

        return (
            <section className="section-post-details">
                <div className="container">
                    <div className="section__inner">
                        <div className="section__content">
                            <div className='post-details'>
                                <div className="post__head">
                                    <div className="post__image">
                                        <div style={postImage} >
                                        </div>
                                    </div>
                                    
                                    <h3 className='post__title'>
                                        { title }
                                    </h3>

                                    <div className="post__meta">
                                        <div className='post__location'>
                                            <strong>
                                                Location:
                                            </strong>
                                            <span>
                                                { location }
                                            </span>
                                        </div>

                                        <div className="post__date">
                                            <strong>
                                                Added:
                                            </strong>

                                            {
                                                <span> 
                                                    { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                                </span> 
                                            }                                        
                                        </div>
                                    </div>
                                </div>

                                <div className="post__body">
                                    <div className="post__content">
                                        <p>
                                            { description }    
                                        </p>
                                    </div>
                                </div>                                
                            </div>

                            <Comment phone={ phone }/>
                        </div>
                        
                        <div className={this.state.isTop ? 'section__aside fixed' : 'section__aside'}>
                            <Price price={price}/>
                            
                            <Link to='/message' className='btn-wide bg-blue mb-2'>
                                <i className="material-icons">send</i>
                                
                                <span className='btn-text'>
                                    Send message
                                </span>    
                            </Link>
                                        
                            <Link to='/message' className='btn-wide bg-blue'>
                                <i className="material-icons">phone</i>
                                
                                <span className='btn-text'>
                                    { phone? phone: '089xxxxxxx' }
                                </span>    
                            </Link>
                            
                            <User creator={creator}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
