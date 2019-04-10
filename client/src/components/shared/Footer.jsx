import React, { Component } from 'react';

class Footer extends Component {
    render() { 
        return (
            <footer>
                <p>
                    &copy; This is footer all rights are reserved { new Date().getFullYear() } 
                </p>
            </footer>
        );
    }
}
export default Footer;