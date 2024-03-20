import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
// import all_product from '../components/Assets/all_product'


export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart
}


const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart())
    useEffect(() => {
        fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMmY3NzJkZDU4MGU3ZWY1ZDRiYzFkIn0sImlhdCI6MTcxMDU5NDQ4NX0.EET02bMR02c2vSNhJ3WgJCT0YPyrZ-8RxcAhu3f_BYU`,
                'content-type': 'application/json',
            },
            body: "",
        }).then((response) => response.json())
            .then((data) => setCartItems(data))
    }, [])

    const addToCart = (itemId, name) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMmY3NzJkZDU4MGU3ZWY1ZDRiYzFkIn0sImlhdCI6MTcxMDU5NDQ4NX0.EET02bMR02c2vSNhJ3WgJCT0YPyrZ-8RxcAhu3f_BYU`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        fetch('http://localhost:4000/removefromcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmMmY3NzJkZDU4MGU3ZWY1ZDRiYzFkIn0sImlhdCI6MTcxMDU5NDQ4NX0.EET02bMR02c2vSNhJ3WgJCT0YPyrZ-8RxcAhu3f_BYU`,
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))

    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount
    }
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = { getTotalCartItems, all_product, getTotalCartAmount, cartItems, addToCart, removeFromCart };
    return (

        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;