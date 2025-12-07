import React, { useState } from 'react'
import api from './api/axiosApi'

const Signup = ({ setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignup = async (e) => {
        // 입력 form이 제출되었을 때 default로 페이지가 새로 고침되는 것을 방지
        e.preventDefault()

        if (password !== confirmPassword) {
            setError('입력한 패스워드가 일치하지 않습니다.')
            return
        }

        try {
          const response = await api.post(
              '/api/auth/register', 
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
              console.log('회원 가입 및 로그인 성공')
              setToken(username)
              setError('')
          }
        } catch (error) {
            console.error('회원 가입 실패:', error)
            setError('회원 가입 실패')
        }
    }

    return (
        <form onSubmit={handleSignup}>
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
            <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            <button type="submit">Sign Up</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}

export default Signup
