import React from 'react'
import { Userinfosubmenu } from '../../Components/js/Userinfosubmenu'
import { MyPage } from '../../Components/js/MyPage'
import '../../Components/css/Info.css'
import Header from '../../Components/js/Header'
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
