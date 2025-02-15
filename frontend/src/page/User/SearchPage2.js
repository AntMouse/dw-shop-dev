// page/User/SearchPage2.js
import React from 'react'
import Header from '../../components/js/Header'
import Goods from '../../components/js/Goods'
import SearchRequest from '../../components/js/SearchRequest'

const SearchPage2 = () => {
    return (
        <div className='App'>
            <div className='searchpage-header'>
                <Header />
            </div>
            <div className='searchpage-main'>
                <SearchRequest />
            </div>
        </div>
    )
}

export default SearchPage2
