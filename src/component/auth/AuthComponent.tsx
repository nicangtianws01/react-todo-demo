import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSessionStorage } from "usehooks-ts"

export interface UserInfo {
  id: number
  username: string
  password: string
}

export const guestUser: UserInfo = {
  id: 1,
  username: 'guest',
  password: 'guest',
}

export const unknownUser: UserInfo = {
  id: -1,
  username: 'unknown',
  password: 'unknown',
}

const AuthComponent: FC = () => {
  const navigate = useNavigate()

  const [loginUser,] = useSessionStorage(
    'login-user',
    unknownUser
  )

  // 用户未登录跳转登录页面
  useEffect(() => {
    if(loginUser.id < 0){
      navigate('/login')
    }
  }, [loginUser])
  return <></>
}

export default AuthComponent
