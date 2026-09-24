import React, { useEffect, useState } from 'react'
import { Home as HomeIcon, UserRound, Bookmark, LogOut } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './UserProfile.css'
import { showToast } from '../../components/Toast'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setError('')

    try {
      await axios.get('http://localhost:3000/api/auth/user/logout', {
        withCredentials: true
      })
      localStorage.removeItem('zoinsta-user-id')
      showToast('See you soon, logout!')
      navigate('/user/login')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to log out. Please try again.')
      setIsLoggingOut(false)
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem('zoinsta-user-id')

    if (!userId) {
      navigate('/user/login')
      return
    }

    axios.get(`http://localhost:3000/api/auth/user/${userId}`, {
      withCredentials: true
    }).then((response) => {
      setUser(response.data.user)
    }).catch((requestError) => {
      if (requestError.response?.status === 401) {
        navigate('/user/login')
        return
      }

      setError(requestError.response?.data?.message || 'Unable to load your profile.')
    })
  }, [navigate])

  if (error) {
    return <main className="profile-status">{error}</main>
  }

  if (!user) {
    return <main className="profile-status">Loading profile...</main>
  }

  return (
    <main className="profile-page">
      <header className="profile-header">
        <Link className="profile-brand" to="/home">
          <img className="profile-brand-mark" src="/zoinsta-logo.svg" alt="" />
          <span>Zoinsta</span>
        </Link>
        <span className="profile-header-label">Your profile</span>
      </header>

      <section className="profile-content">
        <span className="profile-eyebrow">Member profile</span>
        <div className="profile-avatar" aria-hidden="true">
          {user.fullName.charAt(0).toUpperCase()}
        </div>
        <h1>{user.fullName}</h1>
        <p className="profile-email">{user.email}</p>
        <p className="profile-copy">Your saved places and discoveries, all in one place.</p>
        <button className="profile-logout-button" type="button" onClick={handleLogout} disabled={isLoggingOut}>
          <LogOut />
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </button>
      </section>

      <nav className="profile-navigation" aria-label="Main navigation">
        <Link className="profile-nav-link" to="/home">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className="profile-nav-link is-active" to="/profile">
          <UserRound />
          <span>Profile</span>
        </Link>
        <Link className="profile-nav-link" to="/saved">
          <Bookmark />
          <span>Saved</span>
        </Link>
      </nav>
    </main>
  )
}

export default UserProfile