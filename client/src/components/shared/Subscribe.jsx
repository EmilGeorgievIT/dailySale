import React, { Component } from 'react';

class Subscribe extends Component {
    render() {
        return(
            <form>
                <div className="row">
                    <div className="col">
                        <input type="email" className="form-control" placeholder="Email"/>
                    </div>

                    <div className="col">
                        <button className='btn btn-primary' type='submit'>
                            Subscribe
                        </button>
                    </div>
                </div>
            </form>
        ); 
    }
}

export default Subscribe;