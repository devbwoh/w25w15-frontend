import React, { useState, useEffect } from 'react'
import api from './api/axiosApi'

import Login from './Login'
import Signup from './Signup'
import DataList from './DataList'

const App = () => {
    const [username, setUsername] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        const fetchUserStatus = async () => {
          try {
              const response = await api.get('/api/auth/status')
              
              // { username: "gdhong" }
              if (response.status === 200 && response.data.username) {
                  setUsername(response.data.username);
                  setIsAuthenticated(true);
              }
          } catch (error) {
              // 401 Unauthorized
              setIsAuthenticated(false);
              setUsername('');
          } finally {
              setLoading(false);
          }
        }

        fetchUserStatus()
    }, [])

    const handleAuthSuccess = (newUsername) => {
        setUsername(newUsername)
        setIsAuthenticated(true)
        setIsSignup(false)
    }

    const toggleSignup = () => {
        setIsSignup(!isSignup)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div>
        {isAuthenticated ? (
          <div>
            <h1>{username}님, 반갑습니다.</h1>
            <DataList />
          </div>
        ) : (
          <div>
            <button onClick={toggleSignup}>
                {isSignup ? '이미 가입했다면 로그인' : '가입하지 않았다면 회원 가입'}
            </button>
            
            {isSignup ? (
                <Signup setToken={handleAuthSuccess} />
            ) : (
                <Login setToken={handleAuthSuccess} />
            )}
          </div>
        )}
      </div>
    )
}

export default App