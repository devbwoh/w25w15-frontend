import React, { useState, useEffect } from 'react'
import api from './api/axiosApi'

const DataList = () => {
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
              const response = await api.get('/api/data')
              console.log(response)
              setDataList(response.data)
          } catch (error) {
              console.error('데이터를 불러오는 중 오류 발생:', error)
          } 
        }

        fetchData()
    }, [])

    return (
        <div>
            <h2>데이터 목록</h2>
            <ul>
                {dataList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default DataList