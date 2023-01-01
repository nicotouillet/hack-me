import { Link } from 'react-router-dom'
import { AppRoute } from '../../routes'

export type SidebarProps = {
  routes: AppRoute[]
}
export const Sidebar = ({ routes }: SidebarProps) => {
  return (
    <aside className="w-64">
      <ul className="py-4 px-3 bg-gray-50 rounded">
        {routes.map((route) => (
          <li>
            <Link className="p-2 text-gray-900 rounded-lg hover:bg-gray-100" to={route.path}>
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
