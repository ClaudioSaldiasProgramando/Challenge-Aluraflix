import { dividerClasses } from '@mui/material'
import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../componentes/Header'

function RootLayout() {
  return (
  <div className="root-layout">
        <Header/>
        <main>
            <Outlet/>
        </main>

  </div>
  )
}

export default RootLayout