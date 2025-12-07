import axios from 'axios'

const api = axios.create({
	// TODO: 배포 후에 변경할 것
  baseURL: 'http://localhost:8080',
  withCredentials: true,   // HttpOnly 쿠키 설정
})

export default api
