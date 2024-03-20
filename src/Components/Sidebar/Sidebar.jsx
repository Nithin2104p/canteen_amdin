import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct from '../../assets/Product_Cart.svg'
import listproduct from '../../assets/Product_list_icon.svg'
import orders from '../../assets/logo.png'


const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={addproduct} alt="" />
                    <p>add product</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img src={listproduct} alt="" />
                    <p>products List</p>
                </div>
            </Link>
            <Link to={'/Orders'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <img className='orders' src={orders} alt="" />
                    <p>All Orders</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar
