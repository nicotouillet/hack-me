import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { appRoutes } from '../routes'

export const Layout = () => (
  <div>
    <Sidebar routes={appRoutes}></Sidebar>
    <Outlet />
  </div>
)
