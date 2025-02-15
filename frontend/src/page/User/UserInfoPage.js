// page/User/UserInfoPage.js
import React from 'react'
import { Userinfosubmenu } from '../../components/js/Userinfosubmenu'
import { MyPage } from '../../components/js/MyPage'
import '../../components/css/Info.css'
import Header from '../../components/js/Header'
import './UserInfo.css' 

export const UserInfoPage = () => {
    return (
        <div className='user-info-page'>
            <div className='user-info-section1'>
                <Header />
            </div>
            <div className='user-info-section2'>
                <Userinfosubmenu />
                <MyPage />
            </div>
        </div>
    )
}
