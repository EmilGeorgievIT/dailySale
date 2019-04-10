import React, { Component } from 'react';
import Hero from './Hero';
import Post from './Post';

class Main extends Component {
    render() {
        return (
            <div className='container'>
                <Hero wellcomeMessage='Wellcome to my first React App'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, molestiae! Magni facere sint distinctio possimus dicta omnis incidunt voluptas labore atque delectus error eos sequi illum, officia necessitatibus porro placeat?   
                    </p>
                </Hero>
                <Post />
            </div>
        )
    }
}
export default Main;