import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../Components/Rating";
import { fetchProductDetails } from "../features/product/productDetails";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const ProductScreen = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector(
    (state) => state.productDetails
  );
  const { name, price, image, rating, description, countInStock, numReviews } =
    product || {};
  useEffect(() => {
    dispatch(fetchProductDetails({ id }));
  }, [dispatch, id]);

  let navigate = useNavigate();
  const addToCartHandler = () => navigate(`/cart/${id}?qty=${qty}`);
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
                {countInStock && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    onClick={addToCartHandler}
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
