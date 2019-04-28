import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfileService from '../../services/profile-service';
import '../../styles/Boxes.scss';

export default class User extends Component {
    static service = new ProfileService();

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            creator: props.creator
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.creator !== this.state.creator) {
          this.setState({
              creator: prevProps.creator
          });
        }
      }
      
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.creator!==prevState.creator){
          return {creator : nextProps.creator};
        }
        else return null;
    }
    
    componentDidMount() {
        try {
            setTimeout(async() => {
                const user = await User.service.getUserDetails(this.state.creator)
                .then((user) => {
                    this.setState({user});
                })
            }, 300);
        } catch(error) {
                console.log(error);
        };
    }

    render() {
        const { location, name, image } = this.state.user; 
        const styleImage = {
            width: "100%",
            backgroundPosition: 'center center',
            backgroundRepaet: 'no-repeat',
            position: 'absolute',
            borderRadius: '50%',
            left: 0,
            top: 0,
            backgroundSize: 'cover',
            height: "100%",
            backgroundImage: "url(" + `data:image/jpeg;base64,${image}` + ")"
        };


        return(
            <div className='box-user'>
                <div className="box__head">
                    <div className="box__location">
                        <i className="material-icons ico-location">location_on</i>
                        
                        <span>
                            { location? location: 'No location'  }
                        </span>
                    </div>
                </div>
                
                <div className="box__body"> 
                    <div className="box__image">
                        <div style={styleImage}>

                        </div>
                    </div>
                    
                    <div className="box__content">
                        { name }
                    </div>

                    <div className="box__actions">
                        <Link to={`/user/ads/${this.state.creator}`} className='btn btn-outline-primary btn-block'>
                            Ads on user
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}