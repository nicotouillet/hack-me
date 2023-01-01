export enum E_APP_ROUTES {
  INDEX = '/',
  DESKS = 'desks',
  EMPLOYEES = 'employees'
}

export type AppRoute = {
  path: E_APP_ROUTES
  label: string
}

export const appRoutes: AppRoute[] = [
  {
    path: E_APP_ROUTES.INDEX,
    label: 'Home page'
  },
  {
    path: E_APP_ROUTES.DESKS,
    label: 'Desks management'
  },
  {
    path: E_APP_ROUTES.EMPLOYEES,
    label: 'Employees management'
  }
]
