import React, { Component } from 'react';
import ProfileService from '../services/profile-service';

export default class ProfileDetails extends Component {
    static service = new ProfileService();
    
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            phoneNumber: '',
            email: '',
            website: '',
            location: ''
        }
    }
    checkStateVale(obj){
        if (obj !== 'undefined') {
            
        }
    }
    handleChanges = ({target}) => {
        this.setState({
            [target.name] : target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state);

        const userId = sessionStorage.getItem('ds_chk_temp');
        
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
                        
                        <input type="text" onChange={this.handleChanges} name='name' value={this.state.name} placeholder={this.props.name} className="form-control" id="name"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="location">Website</label>
                        
                        <input type="text" onChange={this.handleChanges} value={this.state.website} name='website' className="form-control" id="website" placeholder={this.props.website}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        
                        <input type="email" name='email' onChange={this.handleChanges} value={this.state.email} className="form-control" id="email" placeholder={this.props.email}/>
                    </div>
                
                    <div className="form-group col-md-6">
                        <label htmlFor="location">Location</label>
                        
                        <input type="text" onChange={this.handleChanges} value={this.state.location} name='location' className="form-control" id="location" placeholder={this.props.location}/>
                    </div>
                </div>
            
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone</label>
                
                    <input type="text" name='phoneNumber' onChange={this.handleChanges} value={this.state.phoneNumber} className="form-control" id="phoneNumber" placeholder={this.props.phoneNumber}/>
                </div>
                    
                <button type="submit" className="btn btn-primary">
                    Update Profile
                </button>
            </form>
        );
    }
}