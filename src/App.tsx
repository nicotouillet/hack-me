import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { E_APP_ROUTES } from './routes'

import { Layout } from './views/Layout'
import { Desks, Employees, Home } from './views'

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path={E_APP_ROUTES.INDEX} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={E_APP_ROUTES.DESKS} element={<Desks />} />
          <Route path={E_APP_ROUTES.EMPLOYEES} element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
