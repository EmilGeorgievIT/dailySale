import React , { Component, Fragment } from 'react';
import '../../styles/Rating.scss';

class Rating extends Component {

    render() {
        return(
            <Fragment>
                <div className="card rating">
                    <div className="rating__head card-header">
                        <h3 className='card-title'>
                            Rating And Reviews 
                        </h3>
                    </div>
                    
                    <div className="card-body rating__body">
                        <ul className="list-rating">
                            <li>
                                <p className='star'>
                                    <strong>
                                        5
                                    </strong>

                                    <i className="material-icons">star_rate</i>
                                </p>

                                <div className="progress">
                                    <div className="progress-bar bg-success" style={{ width : this.props.rating['5'] + 'px'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {
                                            this.props.rating['5']
                                        }
                                    </div>
                                </div>
                            </li>

                            <li>
                                <p className='star'>
                                    <strong>
                                        4
                                    </strong>

                                    <i className="material-icons">star_rate</i>
                                </p>

                                <div className="progress">
                                    <div className="progress-bar bg-info" style={{ width : this.props.rating['4'] + 'px'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {
                                            this.props.rating['4']
                                        }
                                    </div>
                                </div>
                            </li>

                            <li>
                                <p className='star'>
                                    <strong>
                                        3
                                    </strong>

                                    <i className="material-icons">star_rate</i>
                                </p>

                                <div className="progress">
                                    <div className="progress-bar bg-warning" style={{ width : this.props.rating['3'] + 'px'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {
                                            this.props.rating['3']
                                        }
                                    </div>
                                </div>
                            </li>

                            <li>
                                <p className='star'>
                                    <strong>
                                        2
                                    </strong>

                                    <i className="material-icons">star_rate</i>
                                </p>

                                <div className="progress">
                                    <div className="progress-bar bg-danger" style={{ width : this.props.rating['2'] + 'px'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {
                                            this.props.rating['2']
                                        }
                                    </div>
                                </div>
                            </li>

                            <li>
                                <p className='star'>
                                    <strong>
                                        1
                                    </strong>

                                    <i className="material-icons">star_rate</i>
                                </p>

                                <div className="progress">
                                    <div className="progress-bar bg-danger" style={{ width : this.props.rating['1'] + 'px'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                        {
                                            this.props.rating['1']
                                        }
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Rating;
