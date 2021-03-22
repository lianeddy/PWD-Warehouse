import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { CartCard, ProcessCartCard } from "../../components/user";
import { updateCartQty, deleteCart } from "../../redux/actions";

const CartPage = (props) => {
  const { cart } = useSelector((state) => state.cartReducer);
  const { id, isLogin, isLoading, isFinished } = useSelector(
    (state) => state.authReducer
  );

  const [outOfStock, setOutOfStock] = useState(false);
  const [process, setProcess] = useState(false);

  useEffect(() => {
    cart.map((val) => {
      if (val.stock <= 0 || val.stock < val.qty) {
        return setOutOfStock(true);
      }
      setOutOfStock(false);
    });
  }, [cart]);

  if (isFinished && !isLogin) {
    return <Redirect to="/login" />;
  }

  const onClick = () => {
    if (outOfStock) {
      return alert(
        "Ada barang yang habis atau kuantitasnya lebih dari stok terbaru.\n\nSilahkan hapus terlebih dahulu."
      );
    }
    setProcess(true);
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "48px",
      }}
    >
      <div
        style={{
          flex: "1",
          // backgroundColor: "red",
          margin: "0 48px 0 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CartCard cart={cart} userId={id} />
      </div>
      <div>
        <div
          style={{
            position: "sticky",
            top: "48px",
            height: "174px",
            // backgroundColor: "purple",
            borderRadius: "12.5px",
            boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
          }}
        >
          <ProcessCartCard
            cart={cart}
            outOfStock={outOfStock}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
