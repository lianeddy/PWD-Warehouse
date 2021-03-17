import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const CardProduct = ({ name, price, description, category, stock }) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Rp{price.toLocaleString()}
          </CardSubtitle>
          <CardText>{description}</CardText>
          <CardText>category: {category}</CardText>
          <CardText>stock: {stock}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardProduct;
