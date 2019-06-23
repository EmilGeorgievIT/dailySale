import React, { Component, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../../styles/Comment.scss';
import CommentService from '../../services/comment-service';

const addCommentSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    comment: Yup.string()
      .min(10, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required')
});

class AddComment extends Component  {
    static service = new CommentService();

    constructor(props) {
        super(props);
        
        this.state = {
            title: '',
            comment: '',
            email: '',
            userId: localStorage.getItem('ds_chk_temp') || '',
            postId: props.postId,
            submitted: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.postId!==prevState.postId){
          return {postId : nextProps.postId};
        }
        else return null;
    }
    sendComment(comment) {
        this.props.handleComment(comment);
    }
    render() {
        return (
            <Fragment>
                <div className='comment-create card'>
                    <div className="comment__head card-header">
                        <h3 className="comment__title card-title">
                            Leave a reply 
                        </h3>
                    </div>
                    
                    <div className="comment__body card-body">
                        <Formik
                             initialValues={{
                                title: '',
                                comment: '',
                                email: '',
                                userId: localStorage.getItem('ds_chk_temp') || '',
                                postId: this.props.postId
                            }}
                            validationSchema={addCommentSchema}

                            onSubmit={(values, { resetForm}) => {
                                const { 
                                    title,
                                    comment,
                                    email,
                                } = values;
                                
                                
                                try {
                                    let res = AddComment.service.addComment(
                                        {
                                            title,
                                            comment,
                                            email,
                                            userId: this.state.userId,
                                            postId: this.state.postId
                                        }
                                    )
                                    res
                                        .then(data => {
                                            this.setState({
                                                submitted: true
                                            })
                                            this.sendComment({
                                                    title,
                                                    comment,
                                                    email,
                                                    userId: this.state.userId,
                                                    postId: this.state.postId
                                            });
                                            resetForm();
                                            console.log(data);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                        })
                                        
                                } catch(error) {
                                    console.log(error);
                                }
                            }}
                        >
                         {({ errors, touched }) => (
                            <Form className='comment'>
                                <div className="from-group">
                                    <Field className="form-control" id="title" placeholder="Your Title" name="title" required/>

                                    {errors.title && touched.title ? (
                                        <div className="invalid-feedback">{errors.title}</div>
                                    ) : null}
                                </div>

                                <div className="from-group">
                                    <Field type="email" name="email" placeholder='Email address' id="email" className='form-control' />
                                        {errors.email && touched.email ? (
                                            <div className='invalid-feedback'>{errors.email}</div>
                                        ) : null}
                                </div>

                                <div className="form-group">
                                    <Field component='textarea' className="form-control" id="comment" name='comment' placeholder='Comment' rows="3" required />
                                        {errors.description && touched.description ? (
                                            <div className='invalid-feedback'>{errors.description}</div>
                                        ) : null}
                                </div>

                                <button type="submit" disabled={Object.keys(errors).length} className="btn btn-primary btn-sm">Send Reply</button>
                            </Form>                             
                         )}
                        </Formik>
                    </div> 
                </div>
            </Fragment>
        );
    }
}
export default AddComment;