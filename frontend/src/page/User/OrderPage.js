import React from 'react'
import Header from '../../Components/js/Header'
import PaymentRequest from '../../Components/js/Request'

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
