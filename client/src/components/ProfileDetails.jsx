import React, { Component } from 'react';
import ProfileService from '../services/profile-service';

export default class ProfileDetails extends Component {
    static service = new ProfileService();
    
    state = {
        name: this.props.name,
        phoneNumber: this.props.phoneNumber,
        email: this.props.email,
        website: this.props.website,
        location: this.props.location
    }

     componentDidMount () {
        console.log(this.state);
    }
    handleChanges = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }
    static getDerivedStateFromProps(props, state) {
        if (props.name !== state.name) {
          return {
            name: props.name,
            website: props.website,
            email: props.email,
            location: props.location,
            phoneNumber: props.phoneNumber
          };
        }
        return null;
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);

        const userId = localStorage.getItem('ds_chk_temp');
        
        try {
            const userInfo = await ProfileDetails.service.updateUserDetails(
                userId, 
                this.state
            );
            console.log(userInfo);
        } catch(error) {
            console.log(error);
        }
            
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        
                        <input type="text" onChange={this.handleChanges} name='name' placeholder='Name' value={this.state.name} className="form-control" id="name"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="location">Website</label>
                        
                        <input type="text" onChange={this.handleChanges} value={this.state.website} name='website' className="form-control" id="website" placeholder='Website'/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        
                        <input type="email" name='email' onChange={this.handleChanges} value={this.state.email} className="form-control" id="email" placeholder='Email'/>
                    </div>
                
                    <div className="form-group col-md-6">
                        <label htmlFor="location">Location</label>
                        
                        <input type="text" onChange={this.handleChanges} value={this.state.location} name='location' className="form-control" id="location" placeholder='Location'/>
                    </div>
                </div>
            
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone</label>
                
                    <input type="text" name='phoneNumber' onChange={this.handleChanges} value={this.state.phoneNumber} className="form-control" id="phoneNumber" placeholder='Phone number'/>
                </div>
                    
                <button type="submit" className="btn btn-primary">
                    Update Profile
                </button>
            </form>
        );
    }
}