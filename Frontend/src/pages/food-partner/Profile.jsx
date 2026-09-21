import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()

  const [profile, setProfile] = useState(null)
  const [video, setVideo] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, {
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
  }, [id])

  if (isLoading) {
    return <main className="partner-status">Loading profile...</main>
  }

  if (error || !profile) {
    return <main className="partner-status">{error || 'Food partner not found.'}</main>
  }

  return (
    <main className="partner-page">
      <header className="partner-header">
        <Link className="partner-brand" to="/">
          <span className="partner-brand-mark">z</span>
          <span>Zoinsta</span>
        </Link>
        <Link className="partner-back-link" to="/">Back to feed</Link>
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
              <span>Total meals</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Customer served</span>
            </div>
          </div>
        </section>

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
