// page/User/OrderPage.js
import React from 'react'
import Header from '../../components/js/Header'
import PaymentRequest from '../../components/js/Request'

export const OrderPage = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            <div className='main-section1'>
                <PaymentRequest />
            </div>
        </div>
    )
}
