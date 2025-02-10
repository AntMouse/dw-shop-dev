// page/Admin/AdminMain.js
import React from 'react'

// 2. 외부 라이브러리
import { Link } from 'react-router-dom'

// 4. 사용자가 만든 내부 컴포넌트 & 유틸리티
import { useAuth } from '../../hooks/auth/useAuth';

// 5. CSS 또는 스타일 파일
import '../../styles/admin/AdminMain.css';



export const AdminMain = () => {

  const { handleLogout } = useAuth();

  return (
    <div className='admin-main-container'>

      <Link to={'/admin/member/list'}>
      <div className='admin-main-item'>
        회원 관리
      </div>
      </Link>

      <Link to={'/admin/order/list'}>
      <div className='admin-main-item'>
        주문 관리
      </div>
      </Link>

      <Link to={'/admin/product/list'}>
        <div className='admin-main-item'>
          상품 관리
        </div>
      </Link>

      <div className='admin-main-item' onClick={handleLogout}>
        로그아웃
      </div>

    </div>  
  )
}
