import React , {Component} from 'react';
import { Card , CardImg ,CardBody , CardText , CardTitle } from 'reactstrap';

export default class DishDetail extends Component
{
    renderDish(dish)
    {
             return(
               <div className="col-12 col-md-5 m-1">
                 <Card>
                   <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                  </CardBody>
                 </Card>
                 </div>
             );
    }

    renderComments(comments)
    {
        if (comments !== null)
      return (
        <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>{comment.comment}</div>
               <p><span>-- {comment.author}</span> , 
                <span>
                {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                </span>
                </p>
              <br></br>
            </li>
          ))}
        </ul>
        </div>
      );
    else 
        return (
                  <div></div>
               );
    }


    render()
    {
      if(this.props.dish!=null)
      {
        return(
        <div className="container">
        <div className="row">
         {this.renderDish(this.props.dish)}
        {this.renderComments(this.props.dish.comments)}  
        </div>
        </div>
        );
      }
        else
         return(
           <div></div>
         );
    }
}
