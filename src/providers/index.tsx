import { DesksProvider } from './desks'
import { EmployeesProvider } from './employees'
import { FC } from 'react'

export const Providers: FC = ({ children }) => (
  <DesksProvider>
    <EmployeesProvider>{children}</EmployeesProvider>
  </DesksProvider>
)
