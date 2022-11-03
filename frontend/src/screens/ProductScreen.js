import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { fetchProductDetails } from "../features/product/productDetails";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );
  const { name, price, image, rating, description, countInStock, numReviews } =
    product || {};
  useEffect(() => {
    dispatch(fetchProductDetails({ id }));
  }, [dispatch, id]);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={image} fluid alt={name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>{name}</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Rating value={rating} text={`${numReviews} reviews`} />
              </ListGroupItem>
              <ListGroupItem>Price: ${price}</ListGroupItem>
              <ListGroupItem>Description: ${description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      $<strong>{price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Staus:</Col>
                    <Col>
                      <strong>
                        {countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Button
                    className="btn-block"
                    type="button"
                    variant="dark"
                    disabled={countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
