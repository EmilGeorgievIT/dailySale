import React, { Fragment } from 'react';
import '../../styles/Card.scss';
import '../../styles/Description.scss';

const Description = ({description}) => (
    <Fragment>
        <div className="card description">
            <div className="card-header">
                <h3 className='card-title'>
                    Description
                </h3>
            </div>

            <div className="card-body">
                { description }
            </div>
            
            <div className="card-footer">
                <ul className="d-flex list-links">
                    <li>
                        <a href="#" className="btn btn-success">
                            <i className="material-icons">share</i>
                            
                            <span>
                                Shared ad
                            </span>
                        </a>
                    </li>

                    <li>
                        <a href="#" className="btn btn-warning">
                            <i className="material-icons">warning</i>
                            
                            <span>
                                Report Abuse
                            </span>
                        </a>
                    </li>

                    <li>
                        <button href="#" className="btn btn-secondary">
                            <i className="material-icons">favorite</i>
                            
                            <span>
                                4353
                            </span>
                        </button>
                    </li>

                    <li>
                        <button href="#" className="btn btn-primary">
                            <i className="material-icons">print</i>
                            
                            <span>
                                Print
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </Fragment>
);

export default Description;