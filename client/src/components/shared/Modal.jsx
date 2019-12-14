import React, { Component } from 'react'
import PostService from '../../services/posts-service';

class Modal extends Component {
    static postService = new PostService();
    
    state = {
        removedPostId: ''
    }

    removePost = () => {
        Modal.postService.deletePost(this.props.idPost).then((data) => {
            this.props.removedPostId(this.props.idPost);
        });
    }
    
    render() {
        const {title, description, submitButton} = this.props;
        return (
            <div className="modal fade" id="removeModal" tabIndex="-1" role="dialog" aria-labelledby="removeModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="removeModal">{title}</h5>
                            
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            <p>
                                { description }
                            </p> 
                        </div>
                        
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Cancel</button>
    
                            <button type="button" onClick={this.removePost} className="btn btn-sm btn-primary">{ submitButton }</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal;