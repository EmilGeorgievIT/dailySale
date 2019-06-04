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
            category: '',
            creator: '',
            isTop: false,
            posts: [],
            rating: {
                "5" : 353,
                "4" : 153,
                "3" : 1353,
                "2" : 53,
                "1": 1,
                "id": ''
            },
            comments: [
                {
                    id: '34324',
                    date: '4/29/2019',
                    time: '15:43',
                    name: 'Pesho',
                    location: 'Ireland',
                    comment: 'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sea'
                },
                {
                    id: '34324',
                    date: '4/29/2019',
                    time: '15:43',
                    name: 'Ivan',
                    location: 'Bulgaria Plovdiv',
                    comment: 'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sea'
                },
                {
                    id: '343124',
                    date: '4/29/2019',
                    time: '11:43',
                    name: 'Pesho 2',
                    location: 'Bulgaria',
                    comment: 'Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sea'
                }
            ],
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
        const { title, image, category, price, description, date, location, phoneNumber, rating, creator, posts, comments } = this.state;
        
        const postImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
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
                <section className="section-post-view">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12">
                                <div className="section__content">
                                    <Gallery
                                        title={title}
                                        postDate={date}
                                        location={location}
                                        category={category}
                                        imageBackground={postImage}
                                        views='3'
                                        price={price}
                                        favorite='3'
                                    />
                                    <Description 
                                        description={description}
                                    />

                                    <Rating 
                                    rating={rating}
                                    />

                                    {
                                        comments.map(item => (
                                            <Comment 
                                                key={item.id}
                                                image={image}
                                                {...item}  
                                            />
                                        ))
                                    }
                                    <AddComment />
                                </div> 
                            </div>  
                           
                           <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className="section__aside">
                                    <UserProfile
                                        creator={creator} 
                                        joined='1555536805497'
                                        phone='334636' 
                                        website='www.test.com'
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
