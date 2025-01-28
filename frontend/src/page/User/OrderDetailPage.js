import React from 'react'
import Header from '../../Components/js/Header'
import OrderDetail from '../../Components/js/Order-detail'
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
