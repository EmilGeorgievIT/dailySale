import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import banner from '../images/banner.jpg';

import { Intro } from '../components/shared/Intro'
import SearchForm from '../components/SearchForm';
import Comment from './post/Comment';
import Price from './post/Price';
import User from './post/User';
import PostsList from '../components/PostsList';

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
            phoneNumber: '',
            description: '',
            creator: '',
            isTop: false,
            posts: [],
            items: [
                { name: 'House & DIY' , icon: 'home' },
                { name: 'Animals', icon: 'pets' },
                { name: 'Electronics', icon: 'phonelink' } ,
                { name: 'Sports & Hobbies', icon: 'accessibility_new' },
                { name: 'Clothes & Lifestyle', icon: 'face'},
                { name: 'Farming', icon: 'spa'},
                { name: 'Baby & Kinds', icon: 'child_care'},
                { name: 'Cars & Motor', icon: 'drive_eta'},
                { name: 'Business', icon: 'business'},
                { name: 'Holidays & Tickets', icon: 'beach_access'},
                { name: 'Lost & Found', icon: 'sentiment_dissatisfied'},
                { name: 'Music & Education', icon: 'music_note'},
                { name: 'Other', icon: 'more'},
                { name: 'Property', icon: 'store'},
                { name: 'Work', icon: 'work'},
            ]
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
    // handleScroll = (event) => {
    //     const el = document.getElementsByClassName('footer');
    //     const elOffsetTop = el[0].offsetTop;

    //     const isTop = window.scrollY >= 165 && window.scrollY <= elOffsetTop - window.innerHeight;
        
    //     if (isTop !== this.state.isTop) {
    //         this.setState({ isTop })
    //     }
    // }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    showResults = (data) => {
        if(data.length > 0 ) {
            this.setState({
                posts: [...data]
            })
        }
    }

    render() {
        const { title, image, price, description, date, location, phoneNumber, creator, posts } = this.state;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + image + ")"
        };
        const bannerImage = {
            backgroundImage: `url(${banner})`
        }

        return (
            <Fragment>
                <Intro 
                image= {bannerImage}
                > 
                    <SearchForm items={this.state.items} results={this.showResults} location='Ireland'/>
               </Intro>
               {
                    posts.length ?
                    <div className='section-results'>
                        <div className="container">
                            <h3 className='mb-4 h3'>
                                {
                                    posts.length ? `Found ${posts.length} ads` : ''
                                }
                            </h3>
                            
                            {
                                posts ? posts.map((item) => 
                                    <PostsList key= {item._id}  {...item}/>
                                ) : ''
                            }
                        </div>
                    </div> : ''
                }
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
                                        
                                        <div className="post__head-mobile">
                                            <h3 className='post__title'>
                                                { title }
                                            </h3>

                                            <span className='post__price-mobile visible-sm-inline visible-xs-inline'>
                                                { price ? `${price}$` : '' }
                                            </span>
                                        </div>

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

                                <Comment phoneNumber={ phoneNumber }/>
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
                                        { phoneNumber? phoneNumber: '089xxxxxxx' }
                                    </span>    
                                </Link>
                                
                                <User creator={creator}/>
                            </div>
                        </div>
                    </div>
                </section>                
            
            </Fragment>
        );
    }
}
