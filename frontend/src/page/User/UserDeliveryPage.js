import React from 'react'
import Header from '../../Components/js/Header'
import Delivery from '../../Components/js/Delivery'
import {Userinfosubmenu} from '../../Components/js/Userinfosubmenu'
import '../../Components/css/Deliverypage.css'

export const UserDeliveryPage = () => {
    return (
            <div className='Delivery-page'>
                <div className='user-info-section1'>
                    <Header />
                </div>
                <div className='Delivery-section2'>
                    <Userinfosubmenu />
                    <Delivery />
                </div>

            </div>
    )
}
