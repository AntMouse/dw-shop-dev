// page/User/SearchPage.js
import React from 'react'
import Header from '../../components/js/Header'
import Goods from '../../components/js/Goods'

const SearchPage = () => {
    return (
        <div className='App'>
            <div className='searchpage-header'>
                <Header />
            </div>
            <div className='searchpage-main'>
                <Goods />
            </div>
        </div>
    )
}

export default SearchPage
