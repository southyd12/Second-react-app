import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Container from '@mui/material/Container';

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          <Outlet />
        </Container>
      </main>
    </>
  )
}

export default Layout