import React from 'react'
import Header from '../../Components/js/Header'
import Goods from '../../Components/js/Goods'

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