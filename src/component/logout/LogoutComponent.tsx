import { useSessionStorage } from 'usehooks-ts'
import { unknownUser } from '../auth/AuthComponent'

const LogoutComponent = () => {
  const [, setLoginUser] = useSessionStorage('login-user', unknownUser)
  return (
    <>
      <button
        onClick={() => {
          setLoginUser(unknownUser)
        }}
      >
        Logout
      </button>
    </>
  )
}

export default LogoutComponent
