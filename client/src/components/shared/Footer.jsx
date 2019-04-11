import React, { Component } from 'react';
import '../../styles/Footer.scss';

class Footer extends Component {
    render() { 
        return (
            <footer className='footer'>
                <div className="container">
                    <p>
                        &copy; This is footer all rights are reserved { new Date().getFullYear() } 
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;