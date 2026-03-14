import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayouts = () => {
  return (
   <div className="flex flex-col min-h-screen">

      <Navbar/>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      <Footer />

    </div>
  )
}

export default MainLayouts