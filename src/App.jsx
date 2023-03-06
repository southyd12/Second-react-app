import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';

import List from './pages/List';
import Add from './pages/Add';
import Update from './pages/Update';
import NotFound from './pages/NotFound';


function App() {

  return (
    <Router>
    {/* <CssBaseline />
    <ThemeProvider theme={theme}>
      <UIProvider>
        <CarsProvider> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<List />}/>
              <Route path="/add" element={<Add />}/>
              <Route path="/update/:id" element={<Update />}/>
              <Route path="*" element={<NotFound />}/>
            </Route>
          </Routes>        
        {/* </CarsProvider>
      </UIProvider>
    </ThemeProvider> */}
      
    </Router>
  )
}

export default App
