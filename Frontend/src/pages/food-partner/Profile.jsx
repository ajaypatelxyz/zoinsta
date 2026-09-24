import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import axios from 'axios'
import { LogOut, Plus } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { showToast } from '../../components/Toast'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isDashboard = !id

  const [profile, setProfile] = useState(null)
  const [video, setVideo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const partnerId = id || localStorage.getItem('zoinsta-food-partner-id')

    if (!partnerId) {
      navigate('/food-partner/login')
      return
    }

    axios.get(`http://localhost:3000/api/food-partner/${partnerId}`, {
      withCredentials: true
    }).then(response => {
      setProfile(response.data.foodPartner)
      setVideo(response.data.foodPartner.foodItems)
    }).catch(error => {
      console.log(error)
      setError('Unable to load this food partner.')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id, navigate])

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await axios.get('http://localhost:3000/api/auth/food-partner/logout', {
        withCredentials: true
      })
      localStorage.removeItem('zoinsta-food-partner-id')
      showToast('See you soon, logout!')
      navigate('/food-partner/login')
    } catch (requestError) {
      console.log(requestError)
      setIsLoggingOut(false)
      setError('Unable to log out. Please try again.')
    }
  }

  if (isLoading) {
    return <main className="partner-status">Loading profile...</main>
  }

  if (error || !profile) {
    return <main className="partner-status">{error || 'Food partner not found.'}</main>
  }

  return (
    <main className="partner-page">
      <header className="partner-header">
        <Link className="partner-brand" to="/home">
          <img className="partner-brand-mark" src="/zoinsta-logo.svg" alt="" />
          <span>Zoinsta</span>
        </Link>
        {isDashboard && (
          <button className="partner-logout-button" type="button" onClick={handleLogout} disabled={isLoggingOut}>
            <LogOut />
            {isLoggingOut ? 'Logging out...' : 'Log out'}
          </button>
        )}
      </header>

      <section className="partner-content">
        <section className="partner-profile-card">
          <div className="partner-avatar" aria-hidden="true">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div className="partner-profile-details">
            <h1>{profile.name}</h1>
            <p className="partner-address">{profile.address}</p>
          </div>
          <div className="partner-stats">
            <div>
              <strong>{video.length}</strong>
              <span>Uploaded videos</span>
            </div>
            <div>
              <strong>{profile.email ? 'Active' : '-'}</strong>
              <span>Partner status</span>
            </div>
          </div>
        </section>

        {isDashboard && (
          <Link className="partner-upload-button" to="/create-food">
            <Plus />
            Upload food
          </Link>
        )}

        <section className="partner-meals" aria-label={`${profile.name} meals`}>
          {video.length > 0 ? video.map((item) => (
            <article className="partner-meal" key={item._id}>
              <video className="partner-meal-video" muted playsInline preload="metadata">
                <source src={item.video} type="video/mp4" />
              </video>
            </article>
          )) : (
            <p className="partner-empty">No meals have been added yet.</p>
          )}
        </section>
      </section>
    </main>
  )
}

export default Profile
