import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import banner from '../images/banner.jpg';

import { Intro } from '../components/shared/Intro'
import SearchForm from '../components/SearchForm';
import PostsList from '../components/PostsList';
import Gallery from '../components/post/Gallery';
import Description from '../components/post/Description';
import Rating from '../components/post/Rating';
import AddComment from '../components/post/AddComment';
import UserProfile from '../components/post/UserProfile';
import LatestProducts from '../components/post/LatestProducts';
import Comment from '../components/post/Comment';

import PostService from '../services/posts-service';
import '../styles/Sections.scss';
import '../styles/helpers.scss';
import '../styles/Buttons.scss';
import CommentService from '../services/comment-service';

export default class PostDetails extends Component {
    static service = new PostService();
    static serviceComment = new CommentService();
    _isMounted = false;

    constructor(props) {
        super(props)
        
        this.state = {
            title: '',
            image: '',
            location: '',
            date: '',
            price: '',
            noResults: false,
            phoneNumber: '',
            description: '',
            viewCount: '',
            category: '',
            creator: '',
            posts: [],
            rating: {
                "5" : 353,
                "4" : 153,
                "3" : 1353,
                "2" : 53,
                "1": 1,
                "id": ''
            },
            comments: [],
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
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            try {
                let postId = this.props.match.params.id;
                const post = await PostDetails.service.getPostById(postId);
                const headerEl = document.getElementsByClassName('navigation');
                const navOffsetTop = headerEl[0].offsetHeight;
                const el = document.getElementsByClassName('section-post-view');
                const elOffsetTop = el[0].offsetTop;
                
                this.setState({ ...post })
                
                window.scrollTo({
                    top: elOffsetTop - navOffsetTop,
                    behavior: 'smooth'
                });
            } catch(error) {
                console.log(error);
            }
        }
    }
    
    async componentDidMount() {
        this._isMounted = true;

        try {
            if(this._isMounted) {
                let postId = this.props.match.params.id;
                const post = await PostDetails.service.getPostById(postId);
                const comments = await PostDetails.serviceComment.getComments(postId)
                this.setState({ ...post, ...comments })
            }
        } catch(error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    showResults = (data) => {
        if(data.length > 0 ) {
            this.setState({
                posts: [...data],
                noResults: false,
            })
        } else {
            this.setState({
                noResults: true,
                posts: []
            })
        }
    }
    
    addCommentFromChild = (comment) => {
        this.setState({ comments: [...this.state.comments, comment] })
    }

    render() {
        const { title, image, category, price, description, date, location, rating, creator, posts, comments, viewCount } = this.state;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: "431px",
            height: '100%',
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
                    <SearchForm items={this.state.items} results={this.showResults || ''} location='Ireland'/>
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
                {
                    this.state.noResults || '' ?
                    <div className='section-results'>
                        <div className="container">
                            <h3 className='mb-4 h3'>
                                {
                                    `Found ${posts.length} ads`
                                }
                            </h3>
                        </div>
                    </div> : ''
                }
                <section className="section-post-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12">
                                <div className="section__content">
                                    <Gallery
                                        title={title || ''}
                                        postDate={date || ''}
                                        location={location || ''}
                                        category={category || ''}
                                        imageBackground={postImage || ''}
                                        viewCount={viewCount || ''}
                                        price={price || ''}
                                        favorite='3'
                                    />
                                    <Description 
                                        description={description || ''}
                                    />

                                    <Rating 
                                    rating={rating || ''}
                                    />

                                    {
                                        comments.map(item => (
                                            <Comment 
                                                key={item._id}
                                                {...item}  
                                            />
                                        ))
                                    }
                                    <AddComment handleComment={this.addCommentFromChild} postId={this.props.match.params.id} />
                                </div> 
                            </div>  
                           
                           <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className="section__aside">
                                    <UserProfile
                                        creator={creator || ''} 
                                        joined='1555536805497'
                                    />

                                    <LatestProducts />
                                </div>
                           </div>
                        </div>
                    </div>
                </section>            
            </Fragment>
        );
    }
}
