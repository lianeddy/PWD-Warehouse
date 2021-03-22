import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { updateCartQty, deleteCart } from "../../redux/actions";

const CartPage = (props) => {
  const { cart } = useSelector((state) => state.cartReducer);
  const { id, isLogin, isLoading, isFinished } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();

  if (isFinished && !isLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "48px",
      }}
    >
      {cart.map((val) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              margin: "0 0 24px 0",
              display: "flex",
              padding: "24px",
              boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
            }}
          >
            <div>
              <img
                style={{
                  width: "192px",
                  border: "#61b15a solid 0.5px",
                }}
                src={`http://localhost:2000/${val.imagepath}`}
                alt={val.name}
              ></img>
            </div>
            <div
              style={{
                width: "224px",
                // backgroundColor: "red",
                margin: "0 24px 0 24px",
              }}
            >
              <div>{val.category}</div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "-4px 0 0 0",
                }}
              >
                {val.name}
              </div>
              <div
                style={{
                  margin: "8px 0 0 0",
                }}
              >
                {val.description}
              </div>
              <div style={{ margin: "12px 0 0 0" }}>Quantity:</div>
              <div style={{ margin: "0 0 0 0" }}>
                <div
                  style={{
                    display: "flex",
                    margin: "5px 0 0 0",
                  }}
                >
                  <button
                    style={{
                      margin: "0 0 0 0",
                      width: "48px",
                      height: "36px",
                    }}
                    onClick={() =>
                      dispatch(
                        updateCartQty({
                          userId: id,
                          cartId: val.id,
                          qty: val.qty - 1,
                        })
                      )
                    }
                    disabled={val.qty <= 1}
                  >
                    -
                  </button>
                  <div
                    style={{
                      width: "48px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {val.qty}
                  </div>
                  <button
                    style={{
                      margin: "0 12px 0 0",
                      width: "48px",
                      height: "36px",
                    }}
                    onClick={() =>
                      dispatch(
                        updateCartQty({
                          userId: id,
                          cartId: val.id,
                          qty: val.qty + 1,
                        })
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    style={{
                      margin: "0 0 0 0",
                      width: "48px",
                      height: "36px",
                      backgroundColor: "red",
                    }}
                    onClick={() =>
                      dispatch(
                        deleteCart({
                          userId: id,
                          cartId: val.id,
                        })
                      )
                    }
                  >
                    <i
                      className="bi bi-trash-fill"
                      style={{ fontSize: "16px", color: "white" }}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "24px",
                  margin: "15px 0 0 0",
                }}
              >
                Rp{(val.qty * val.price).toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
      <button>Checkout</button>
    </div>
  );
};

export default CartPage;
