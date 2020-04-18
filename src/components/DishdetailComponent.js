import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';
import {Date} from 'prismic-reactjs';


function RenderComments({comments}){
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
function RenderDish({dish}) {
    if (dish != null)
        return(
            <div className="container">
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
                    <RenderComments comments={dish.comments} />
                </div>
            </div>
        );
    else
        return(
            <div></div>
        );
}

const DishDetail = (props) => {
    return(
        <RenderDish dish={props.dish} />
    );
}

export default DishDetail;