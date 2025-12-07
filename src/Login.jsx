import React, { useState } from 'react'
import api from './api/axiosApi'

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        // 입력 form이 제출되었을 때 default로 페이지가 새로 고침되는 것을 방지
        e.preventDefault()

        try {
          const response = await api.post(
              '/api/auth/login', 
              new URLSearchParams({
                  username: username,
                  password: password
              }),
              {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  }
              }
          )

          //console.log(response)
          //console.log(username)
          
          if (response.status === 200) {
              console.log('로그인 성공')
              setToken(username)
              setError('')
          }
        } catch (error) {
            console.error('로그인 실패:', error)
            setError('로그인 실패: 아이디 또는 비밀번호를 확인하세요.')
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export default Login
