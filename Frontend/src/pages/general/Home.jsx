import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const feedListRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", {
      withCredentials: true
    }).then(response => {
      setVideos(response.data.food)
    }).catch(error => {
      console.log(error)
      setError('Unable to load food videos.')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!feedListRef.current) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target

        video.pause()
        video.currentTime = 0

        if (entry.isIntersecting) {
          video.play().catch(() => {})
        }
      })
    }, {
      root: feedListRef.current,
      threshold: 0.6,
    })

    const feedVideos = feedListRef.current.querySelectorAll('.feed-video')
    feedVideos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [videos])

  const visitStore = (food) => {
    navigate(`/food-partner/${food.foodPartner}`, {
      state: {
        food
      }
    })
  }

  if (isLoading) {
    return <main className="feed-status">Loading food videos...</main>
  }

  if (error || videos.length === 0) {
    return <main className="feed-status">{error || 'No food videos available.'}</main>
  }

  return (
    <main className="feed-page">
      <header className="feed-header">
        <Link className="feed-brand" to="/">
          <span className="feed-brand-mark">z</span>
          <span>Zoinsta</span>
        </Link>
        <p className="feed-header-label">Discover nearby</p>
      </header>

      <div className="feed-list" ref={feedListRef}>
        {videos.map((item) => (
          <article className="feed-item" key={item._id}>
            <video className="feed-video" autoPlay muted loop playsInline>
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="feed-shade" />
            <div className="feed-content">
              <span className="feed-store-type">{item.name}</span>
              <p className="feed-description">{item.description}</p>
              <button className="visit-store-button" type="button" onClick={() => visitStore(item)}>
                Visit store
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </article>
        ))}
      </div>

    </main>
  )
}

export default Home
