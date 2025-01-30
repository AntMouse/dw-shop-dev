import React from 'react'
import Slide from '../../components/js/Slide';
import Header from '../../components/js/Header'



function MainPage() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div className='main-section1'>
        <Slide />
      </div>

    </div>
  );
}

export default MainPage;