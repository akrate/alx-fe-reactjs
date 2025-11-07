import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import UserProfile from './components/UserProfile'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import Counter from './components/Counter'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Header />
        <UserProfile name="oussama akrate" age={23} bio="I love traveling and discovering new cities." />
        <Counter />
        <MainContent />
        <Footer />
      </div>
    </>
  )
}

export default App
