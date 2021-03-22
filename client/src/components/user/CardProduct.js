import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, Button } from "reactstrap";
import { accentColor, surfaceColor } from "../../helpers";

const CardProduct = ({ id, name, price, stock }) => {
  return (
    <Card
      style={{
        height: 300,
        maxHeight: 300,
        borderWidth: 0,
        boxShadow: "0 0 12px 2px rgba(0,0,0,0.1)",
      }}
    >
      <CardImg
        style={{ backgroundColor: accentColor }}
        top
        width="100%"
        height="175"
        src="/assets/318x180.svg"
        alt="Card image cap"
      />
      <div
        style={{
          height: "100%",
          paddingInline: 10,
          paddingBlock: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div>{name}</div>
          <div tag="h6" className="mb-2 text-muted">
            Rp{price.toLocaleString()}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {stock === 0 ? null : (
            <Button style={{ borderWidth: 0, backgroundColor: surfaceColor }}>
              <i class="bi bi-cart-plus" style={{ color: "white" }}></i>
            </Button>
          )}
          <Button
            style={{
              borderWidth: 0,
              backgroundColor: accentColor,
              marginLeft: 5,
            }}
          >
            <div style={{ color: "black" }}>
              <Link to={`/detail?id=${id}`}>Details</Link>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardProduct;
