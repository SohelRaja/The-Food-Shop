import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {Date} from 'prismic-reactjs';

class DishDetail extends Component{
    renderComments(comments){
        if(comments != null){
            const comment = comments.map((comment)=>{
                const date = Date(comment.date);
                const formattedDate = Intl.DateTimeFormat('en-US',{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit' 
                }).format(date);
                return(
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {formattedDate}</p>
                    </div>
                );
            });
            return(
                <div  className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {comment}
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
    renderDish(dish) {
        if (dish != null)
            return(
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    {this.renderComments(dish.comments)}
                </div>
            );
        else
            return(
                <div></div>
            );
    }
    render(){
        return(
            this.renderDish(this.props.dish)
        );
    }
}
export default DishDetail;