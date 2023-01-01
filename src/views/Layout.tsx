import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { appRoutes } from '../routes'
import { Providers } from '../providers'

export const Layout = () => (
  <div>
    <Sidebar routes={appRoutes}></Sidebar>
    <Providers>
      <Outlet />
    </Providers>
  </div>
)
