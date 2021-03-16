import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardProduct } from '../../components';
import { getProductsAction } from '../../redux/actions/productActions';
import { Input } from 'reactstrap';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);

  useEffect(() => {
    let query;
    if (minimum !== '') query = `min=${minimum}`;
    if (maximum !== '') query = `max=${maximum}`;
    if (maximum !== '' && minimum !== '') query = `min=${minimum}&max=${maximum}`;
    dispatch(getProductsAction(query));
  }, [minimum, maximum]);

  const renderCard = () => {
    return products.map((value) => {
      return (
        <div>
          <div key={value.id}>
            <CardProduct
              name={value.name}
              price={value.price}
              description={value.description}
              category={value.category}
              stock={value.inventory}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="my-5">
        <div style={{ display: 'flex' }} className="align-items-center">
          <div className="col-1">min price:</div>
          <Input placeholder="min" type="number" onChange={(e) => setMinimum(e.target.value)} />
        </div>
        <div style={{ display: 'flex' }} className="align-items-center">
          <div className="col-1">max price:</div>
          <Input placeholder="max" type="number" onChange={(e) => setMaximum(e.target.value)} />
        </div>
      </div>
      <div>{renderCard()}</div>
    </div>
  );
};

export default ProductPage;
