import { Footer, Navbar } from '@/constants'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <main>
        <Navbar />
        {children}
        <Footer />
    </main>
  )
}

export default Layout