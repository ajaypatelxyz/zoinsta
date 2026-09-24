import React, { useEffect, useState } from 'react'
import { Bookmark, Home as HomeIcon, Trash2, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Saved.css'
import axios from 'axios'

const Saved = () => {
  const [savedVideos, setSavedVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/save", {
      withCredentials: true
    }).then(response => {
      const savedFood = response.data.savedFood.map((item) => item.food).filter(Boolean)
      setSavedVideos(savedFood)
    }).catch(error => {
      if (error.response?.status !== 404) {
        console.log(error)
        setError('Unable to load saved food.')
      }
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const removeSaved = async (foodId) => {
    try {
      await axios.post("http://localhost:3000/api/food/save", {
        foodId
      }, {
        withCredentials: true
      })

      setSavedVideos((currentVideos) => currentVideos.filter((food) => food._id !== foodId))
    } catch (error) {
      console.log(error)
      setError('Unable to remove saved food.')
    }
  }

  if (isLoading) {
    return <main className="saved-status">Loading saved food...</main>
  }

  if (error) {
    return <main className="saved-status">{error}</main>
  }

  return (
    <main className="saved-page">
      <header className="saved-header">
        <Link className="saved-brand" to="/home">
          <img className="saved-brand-mark" src="/zoinsta-logo.svg" alt="" />
          <span>Zoinsta</span>
        </Link>
        <span className="saved-count">{savedVideos.length} saved</span>
      </header>

      <section className="saved-content">
        <span className="saved-eyebrow">Your collection</span>
        <h1>Saved food</h1>
        <p className="saved-intro">The places and dishes you want to come back to.</p>

        {savedVideos.length > 0 ? (
          <div className="saved-grid">
            {savedVideos.map((food) => (
              <article className="saved-card" key={food._id}>
                <video className="saved-card-video" muted playsInline preload="metadata">
                  <source src={food.video} type="video/mp4" />
                </video>
                <div className="saved-card-content">
                  <span>{food.name}</span>
                  <p>{food.description}</p>
                  <button type="button" onClick={() => removeSaved(food._id)} aria-label={`Remove ${food.name} from saved`}>
                    <Trash2 />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="saved-empty">
            <Bookmark />
            <strong>No saved food yet</strong>
            <p>Tap the bookmark on a reel to keep it here.</p>
            <Link to="/home">Explore reels</Link>
          </div>
        )}
      </section>

      <nav className="saved-navigation" aria-label="Main navigation">
        <Link className="saved-nav-link" to="/home">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className="saved-nav-link" to="/profile">
          <UserRound />
          <span>Profile</span>
        </Link>
        <Link className="saved-nav-link is-active" to="/saved">
          <Bookmark />
          <span>Saved</span>
        </Link>
      </nav>
    </main>
  )
}

export default Saved
