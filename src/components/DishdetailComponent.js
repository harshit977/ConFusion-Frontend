import React, { Component } from "react";
import { Card,CardImg,CardText,CardBody,CardTitle,Modal,ModalHeader,ModalBody,Breadcrumb, BreadcrumbItem,Button,Row,Col,Label,CardImgOverlay} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import {Loading} from './LoadingComponent';
import { Link } from "react-router-dom";
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


class CommentForm extends Component {

  constructor(props) 
  {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleSubmit(values) 
  {
    this.toggleModal();
    this.props.postComment(this.props.dishId,values.rating, values.comment);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={{ size: 12 }}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
             
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows={5}
                    className="form-control"
                  />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({dish, favorite, postFavorite}) {
  console.log(favorite);
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardImgOverlay>
              <Button outline color="primary" onClick={() => favorite ? console.log('Already favorite') : postFavorite(dish._id)}>
                
                  {favorite ?
                      <span className="fa fa-heart"></span>
                      : 
                      <span className="fa fa-heart-o"></span>
                  }
              </Button>
          </CardImgOverlay>
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
        </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, dishId , postComment}) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
        <Stagger in>
          {comments.map(comment => {
            return (
              <Fade in>
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author.firstname},{" "}{comment.author.lastname} ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit"
                    }).format(new Date(Date.parse(comment.updatedAt)))}
                  </p>
                </li>
                </Fade>
            );
          })}
          </Stagger>
          </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  } else return <div />;
}

const DishDetailComponent = props => 
{
  console.log(props.favorite);
 if(props.isLoading) {
   return(
     <div className="container">
       <div className="row">
         <Loading />
       </div>
     </div>
   );
 }
 else if(props.errMess) {
  return(
    <div className="container">
      <div className="row">
        <h4>{props.errMess}</h4>
      </div>
    </div>
  );
 }
  else if (props.dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} favorite={props.favorite} postFavorite={props.postFavorite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish._id}
          />
        </div>
      </div>
    );
};

export default DishDetailComponent;