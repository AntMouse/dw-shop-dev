// page/User/UserDeliveryPage.js
import React from 'react'
import Header from '../../components/js/Header'
import Delivery from '../../components/js/Delivery'
import {Userinfosubmenu} from '../../components/js/Userinfosubmenu'
import '../../components/css/Deliverypage.css'

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
