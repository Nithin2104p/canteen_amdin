import React, { useEffect, useState } from 'react';
import './Orders.css';
import cross_icon from '../../assets/cross_icon.png';

const Orders = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/fetchorders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const remove_product = async (_id) => {
    try {
      const response = await fetch('http://localhost:4000/removeorder', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: _id }) // Pass _id instead of id
      });
      if (!response.ok) {
        throw new Error('Failed to remove product');
      }
      await fetchInfo();
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>Today's  Orders</h1>
      <div className="listproducts-format-main  nithin">
        <p>S.no</p>
        <p>RollNo</p>
        <p>User</p>
        <p>Phone</p>
        <p>Item</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="nivi listproduct-format">
              <p>{index + 1} </p>
              <p><strong><i>{product.roll_number}</i></strong></p>
              <p style={{ color: "red", fontWeight: "700" }}>{product.name}</p>
              <p>{product.phone}</p>
              <p><strong>{product.product_name}</strong></p>
              <p className='quant'><strong>{product.quantity}</strong></p>
              <p><strong>₹{product.product_price * product.quantity}</strong></p>
              <p>{product.payment_method}</p>
              <img src={cross_icon} onClick={() => { remove_product(product._id) }} className='listproduct-remove-icon' alt="" />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Orders;
