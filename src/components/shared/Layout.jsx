import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
// import Footer from './Footer'
export default function Layout() {
  return (
    <div className="layout">
        <NavBar />
      
      <div className="content">
        <Outlet />
      </div>
        {/* <div className="footer">
  <Footer />
        </div> */}
    </div>
  )
}