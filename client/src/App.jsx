import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/Dashboard'
import Register from './components/Register'
import UserProfile from './components/UserProfile'

function App() {

  return (
    <>
      <div className='app'>
        <Navbar />
        <UserProfile />
        <main className='container'>
          <Routes>
            <Route path='/'element={<h2>welcome to our app</h2>}/>
            <Route path='/login'element={<Login />}/>
            <Route path='/register'element={<Register />}/>
            <Route 
              path='/dashboard'
              element={
                <ProtectedRoute><Dashboard/></ProtectedRoute>
              }
            />
            <Route path='/profile'element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
              }/>
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
