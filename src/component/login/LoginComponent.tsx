import { FC, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'
import { UserInfo } from '../auth/AuthComponent'

const LoginComponent: FC = () => {
  const initUserInfo: UserInfo[] = []
  const [userInfos] = useLocalStorage('user-info', initUserInfo)
  const initLoginUser: UserInfo = {
    id: -1,
    username: 'unknown',
    password: 'unknown',
  }
  const [loginUser, setLoginUser] = useSessionStorage(
    'login-user',
    initLoginUser
  )

  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const login = () => {
    if (
      username == null ||
      password == null ||
      username.trim() == '' ||
      password.trim() == ''
    ) {
      alert('Please enter a username and password')
      return false
    }

    const userinfo = userInfos.find((v) => {
      return v.username === username && v.password === password
    })

    if (!userinfo) {
      alert('Wrong username or password')
      return false
    }

    setLoginUser(userinfo)

    return true
  }

  // 用户已登录
  useEffect(() => {
    if (loginUser.id > 0) {
      navigate('/note')
    }
  })

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type={'text'}
          placeholder={'Username'}
          ref={usernameRef}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
      </div>
      <div>
        <input
          type={'password'}
          placeholder={'Password'}
          ref={passwordRef}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            login() && navigate('/note')
          }}
        >
          Login
        </button>
        {'  '}
        <Link to={'/register'}>Register</Link>
        {'  '}
        <Link
          onClick={() => {
            const guestLoginUser: UserInfo = {
              id: 1,
              username: 'guest',
              password: 'guest',
            }
            setLoginUser(guestLoginUser)
          }}
          to={'/note'}
        >
          Guest
        </Link>
      </div>
    </div>
  )
}

export default LoginComponent
