import React from 'react'
import Header from '../../Components/js/Header'
import Goods from '../../Components/js/Goods'
import SearchRequest from '../../Components/js/SearchRequest'

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