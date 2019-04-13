import React, { Component, Fragment } from 'react';
import Hero from './Hero';
import Post from './Post';

class Main extends Component {
    render() {
        return (
            <Fragment>
                <Hero />
                
                <main className='main'>
                    <Post />
                </main>
            </Fragment>
        )
    }
}
export default Main;