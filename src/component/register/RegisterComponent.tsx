import { FC, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'
import { unknownUser } from '../auth/AuthComponent'
import { UserInfo } from '../auth/AuthComponent'

const RegisterCompoennt: FC = () => {
  const initUserInfo: UserInfo[] = []
  const [userInfos, setUserinfos] = useLocalStorage('user-info', initUserInfo)

  const [, setLoginUser] = useSessionStorage('login-user', unknownUser)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const register = () => {
    const existsUser = userInfos.find((v) => {
      return v.username === username
    })

    if (existsUser) {
      alert('Username exists')
      return false
    }

    let maxId = 0
    userInfos.map((v) => {
      if (v.id > maxId) {
        maxId = v.id
      }
    })

    const newUser: UserInfo = {
      id: maxId + 1,
      username: username,
      password: password,
    }
    const newUserInfos = userInfos.concat(newUser)

    setUserinfos(newUserInfos)

    setLoginUser(newUser)

    return true
  }

  return (
    <div>
      <h1>Register</h1>
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
            register() && navigate('/note')
          }}
        >
          Register
        </button>
        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default RegisterCompoennt
