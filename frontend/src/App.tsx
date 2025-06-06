import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [apiStatus, setApiStatus] = useState<string>('')

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setApiStatus(data.message))
      .catch(() => setApiStatus('Error connecting to API'))
  }, [])

  return (
    <>
      <div>
        <h1>AdonisJS + React + Vite</h1>
        <div className="card">
          <h2>API Status:</h2>
          <p>{apiStatus || 'Loading...'}</p>
        </div>
      </div>
    </>
  )
}

export default App
