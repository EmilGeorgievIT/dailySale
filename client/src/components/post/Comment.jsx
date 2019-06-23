import React, { Component, Fragment} from 'react';
import ProfileService from '../../services/profile-service';

export default class Comment extends Component {
    static service = new ProfileService();

    constructor(props) {
        super(props);

        this.state = {
            userId: props.userId,
            image: ''
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.userId!==prevState.userId){
          return {userId : nextProps.userId};
        }
        else return null;
    }
    async componentDidMount() {
        const userId = this.props.userId;
        const image = await Comment.service.getUserImage(userId);
        this.setState(image);
    }
    render() {
        const { title, date, comment } = this.props;
        const { image } = this.state;

        return (
            <Fragment>
                <div className='card comment'>
                    <div className="card-body comment__body">
                        <div className="comment__aside">
                            <div className="comment__image">
                                <img src={image} alt="avatar"/>
                            </div>
                        </div>

                        <div className="comment__content">
                            <div className="comment__meta">
                                <h5 className='comment__title'>
                                    {title}
                                </h5>
                                
                                <ul className="list-meta">
                                    <li>
                                        <i className="material-icons">calendar_today</i>
                                        
                                        {
                                            <span> 
                                                { (new Date(date)).toLocaleDateString('en-US', 'short') }
                                            </span> 
                                        }
                                    </li>

                                    <li>
                                        <i className="material-icons">access_time</i>
                                        
                                        {
                                            <span> 
                                                { (new Date(date)).toLocaleTimeString('en-US', 'short') }
                                            </span> 
                                        }
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="comment__description">
                                {comment}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
};
