import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addproduct from '../../Components/Addproduct/Addproduct'
import Listproduct from '../../Components/Listproduct/Listproduct'
import Orders from '../../Components/Oders/Orders'

const Admin = () => {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/addproduct' element={<Addproduct />} />
                <Route path='/listproduct' element={<Listproduct />} />
                <Route path='/orders' element={<Orders />} />
            </Routes>
        </div>
    )
}

export default Admin
