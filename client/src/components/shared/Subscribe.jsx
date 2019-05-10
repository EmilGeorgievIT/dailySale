import React, { Component } from 'react';
import '../../styles/Forms.scss';

class Subscribe extends Component {
    render() {
        return(
            <form className='form-subscribe'>
                <div className="form__control">
                    <input type="email" className="form-control" placeholder="Email"/>
                    
                    <button className='btn btn-primary' type='submit'>
                        Subscribe
                    </button>
                </div>
            </form>
        ); 
    }
}

export default Subscribe;