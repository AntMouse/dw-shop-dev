// page/User/OrderDetailPage.js
import React from 'react'
import Header from '../../components/js/Header'
import OrderDetail from '../../components/js/Order-detail'
export const OrderDetailPage = () => {
  return (
    <div className='App'>
        <div>
            <Header/>
        </div>
        <div>
            <OrderDetail/>
        </div>

    </div>
  )
}
