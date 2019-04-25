import React, { Component } from 'react';
import ProfileService from '../../services/profile-service';

export default class User extends Component {
    static service = new ProfileService();

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            creator: props.creator
        }
    }
    componentWillMount() {
        this.setState({
            creator: this.props.creator
        })
    }
    
    async componentDidMount() {
        try {
            const user = await User.service.getUserDetails(this.state.creator)
            .then((user) => {
                this.setState({user});
            })
            console.log(this.props);
        } catch(error) {
                console.log(error);
        };
    }
    render() {

        return(
            <div className='box-user'>
                <p>
                    {this.state.creator}
                </p>
            </div>

        );
    }
}