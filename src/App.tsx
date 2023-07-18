import './App.css'
import TodoComponent from './component/todo'
import { useRoutes, RouteObject } from 'react-router-dom'
import LoginComponent from './component/login'
import RegisterCompoennt from './component/register'
import AuthComponent from './component/auth'
import LogoutComponent from './component/logout'

function App() {

  const routers: RouteObject[] = [
    {
      path: '/',
      element: <LoginComponent />,
    },
    { path: 'login', element: <LoginComponent /> },
    {
      path: 'note',
      element: (
        <>
          <AuthComponent />
          <TodoComponent />
          <LogoutComponent />
        </>
      ),
    },
    {
      path: 'register',
      element: <RegisterCompoennt />,
    },
  ]

  const routing = useRoutes(routers)

  return <>{routing}</>
}

export default App
