import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../Components/Product";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const HomeScreen = () => {
  const { products, error, isLoading } = useSelector(
    (state) => state.productList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Products</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
