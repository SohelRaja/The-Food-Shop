import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Label, Modal, ModalBody, ModalHeader, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false
        };
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show='touched'
                                    messages={{
                                        required: 'Required '
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show='touched'
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"
                                    validators={{
                                        required
                                    }} 
                                />
                                <Errors
                                    className="text-danger"
                                    model=".comment"
                                    show='touched'
                                    messages={{
                                        required: 'Required '
                                    }}
                                />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        );
    }
}

function RenderComments({comments, postComment, dishId}){
    if(comments != null){
        const comment = comments.map((comment)=>{
            const date = comment.date;
            const stringDate = new Date(date);
            const formattedDate = Intl.DateTimeFormat('en-US',{
                year: 'numeric',
                month: 'short',
                day: '2-digit' 
            }).format(stringDate);
            return(
                <Fade in>
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {formattedDate}</p>
                    </div>
                </Fade>
            );
        });
        return(
            <div  className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {comment}
                    <CommentForm 
                        dishId={dishId}
                        postComment={postComment}
                    />
                </Stagger>
            </div>
        );
    }else{
        return(
            <div></div>
        );
    }
}
function RenderDish({dish,isLoading, errMess, comments, postComment}) {
    if(isLoading){
        return(
            <div className="container">
                <div className="row">
                    < Loading /> 
                </div>
            </div>
        );
    }else if (errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{errMess}</h4>
                </div>
            </div>
        );
    }
    else if (dish != null)
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card>
                                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                                <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                    <RenderComments 
                        comments={comments} 
                        postComment={postComment}
                        dishId={dish.id}
                    />
                </div>
            </div>
        );
    else{
        return(
            <div></div>
        );
    }
}

const DishDetail = (props) => {
    return(
        <RenderDish 
            dish={props.dish} 
            isLoading={props.isLoading}
            errMess={props.errMess} 
            comments={props.comments}
            postComment={props.postComment}
        />
    );
}

export default DishDetail;