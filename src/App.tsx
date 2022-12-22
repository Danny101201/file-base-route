import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Routes as RoutesSetting } from './routes'
function App() {
  const [count, setCount] = useState(0)
  return (
    <Routes>
      <RoutesSetting />
    </Routes>
  )
}

export default App
