import React, { Component, Fragment } from 'react';
import Messages from '../chat/Messages';
import ListMessages from '../chat/ListMessages';
import  '../../styles/Sections.scss';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            messages: []
        }
    }
    render() {
        return (
            <Fragment>
                <section className="section-message">
                    <div className="section__body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="section__aside">
                                    <ListMessages/>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="section__content">
                                    <Messages />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
}