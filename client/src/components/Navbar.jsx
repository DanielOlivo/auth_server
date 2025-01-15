import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../auth/useAuth'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const Navbar = () => {
    const navigate = useNavigate()
    const {logout, isAuthenticated} = useAuth()

    const handleLogout = async() => {
        try {
            await axios.get(`${apiBaseUrl}/api/user/logout`, {})
            logout()
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <nav style={{display:'flex', gap:'10px'}}>
            <div style={{display:'flex', gap:"10px"}}>
                <Link to={'/'} >Home</Link>

                {!isAuthenticated &&(
                <>
                <Link to={'/login'} >Login</Link>
                <Link to={'/register'} >Register</Link> 
                </>)}

                {isAuthenticated && (
                <>
                    <Link to={'/dashboard'} >Dashboard</Link>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogout()
                        }} 
                    >Log out</button>
                </>)}
            </div>
        </nav>
    )
}

export default Navbar