import React, { Component, Fragment } from 'react';
import Post from './Post';
import PostFeature from './PostFeature';
import PostsList from './PostsList';
import '../styles/Hero.scss';
import '../styles/Sections.scss';
import SearchForm from './SearchForm';
import CategoriesList from './CategoriesList';
import Typed from 'react-typed';

class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
    showResults = (data) => {
        if(data.length > 0 ) {
            this.setState({
                posts: [...data]
            })
        }
    }
    render() {
        const posts = this.state.posts;

        return (
            <Fragment>
                <div className='section-hero'>
                    <div className="container">
                        <div className="section__head">
                            <Typed  className='section__title'
                                strings={[
                                    'Search for ads',
                                    'Post your ads',
                                    'Find all you need']}
                                typeSpeed={100}
                                backSpeed={70} 
                                loop >
                            </Typed>

                            <p>
                                Sell ​​what you do not need or buy what you need in one place for free
                            </p>

                            <SearchForm items={this.state.items} results={this.showResults} location='Ireland'/>
                        </div>
                        
                        <div className="section__body">
                            <CategoriesList items={this.state.items} />
                        </div>
                    </div>
                </div>
                
                <main className='main'>
                    <Post />
                    <PostFeature />

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
                    </div>
                </main>
            </Fragment>
        )
    }
}
export default Main;