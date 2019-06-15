import React, { Component, Fragment } from 'react';
import Post from './Post';
import PostFeature from './PostFeature';
import PostsList from './PostsList';
import '../styles/Hero.scss';
import '../styles/Sections.scss';
import SearchForm from './SearchForm';
import CategoriesList from './CategoriesList';
import { Intro } from './shared/Intro';
import homeBackground from '../images/banner.jpg';

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
                posts: [...data],
                loading: false
            })
        }
    }
    render() {
        const posts = this.state.posts;
        
        const imageBackground = {
            backgroundImage: `url(${homeBackground})`
        };

        return (
            <Fragment>
               <Intro 
                title='Sell or buy in one place for free' 
                subTitle='Sell ​​what you do not need or buy what you need in one place for free'
                image= {imageBackground}
                > 
                    <SearchForm items={this.state.items} results={this.showResults} location='Ireland'/>

                    <div className="section__body">
                        <CategoriesList items={this.state.items} />
                    </div>
                </Intro>

                <main className='main'>
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
                    
                    <Post />
                    
                    <PostFeature />
                </main>
            </Fragment>
        )
    }
}
export default Main;