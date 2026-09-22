import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bookmark, Home as HomeIcon, Heart, MessageCircle, Send } from 'lucide-react'
import './Home.css'
import axios from 'axios'

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [likedVideos, setLikedVideos] = useState(() => JSON.parse(localStorage.getItem('zoinsta-liked-food') || '[]'));
  const [savedVideos, setSavedVideos] = useState(() => JSON.parse(localStorage.getItem('zoinsta-saved-food') || '[]'));
  const navigate = useNavigate();
  const feedListRef = useRef(null);
  const activeFoodIdRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/food", {
      withCredentials: true
    }).then(response => {
      setVideos(response.data.food)
      const likedFoodIds = response.data.food
        .filter((item) => item.isLiked)
        .map((item) => item._id)
      setLikedVideos(likedFoodIds)
      localStorage.setItem('zoinsta-liked-food', JSON.stringify(likedFoodIds))

      const savedFood = response.data.food.filter((item) => item.isSaved)
      setSavedVideos(savedFood)
      localStorage.setItem('zoinsta-saved-food', JSON.stringify(savedFood))
    }).catch(error => {
      console.log(error)
      if (error.response?.status === 401) {
        navigate('/user/login')
        return
      }

      setError(error.response?.data?.message || 'Unable to load food videos.')
    }).finally(() => {
      setIsLoading(false)
    })
  }, [navigate])

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
          const foodId = entry.target.closest('.feed-item')?.dataset.foodId
          activeFoodIdRef.current = foodId
          sessionStorage.setItem('zoinsta-last-food', foodId)
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
  }, [videos.length])

  useEffect(() => {
    if (!feedListRef.current || videos.length === 0) {
      return
    }

    const returnFoodId = sessionStorage.getItem('zoinsta-return-food')
      || sessionStorage.getItem('zoinsta-last-food')

    if (!returnFoodId) {
      return
    }

    const frameId = requestAnimationFrame(() => {
      const feedItem = feedListRef.current.querySelector(`[data-food-id="${returnFoodId}"]`)

      if (feedItem) {
        feedItem.scrollIntoView({ block: 'start' })
      }

      sessionStorage.removeItem('zoinsta-return-food')
    })

    return () => cancelAnimationFrame(frameId)
  }, [videos.length])

  const visitStore = (food) => {
    sessionStorage.setItem('zoinsta-return-food', food._id)
    navigate(`/food-partner/${food.foodPartner}`, {
      state: {
        food
      }
    })
  }

  const openSaved = (event) => {
    event.preventDefault()
    const currentFoodId = activeFoodIdRef.current || sessionStorage.getItem('zoinsta-last-food')

    if (currentFoodId) {
      sessionStorage.setItem('zoinsta-last-food', currentFoodId)
    }

    navigate('/saved')
  }

  async function likeVideo(item){
    const isLiked = likedVideos.includes(item._id)
    const nextLikeCount = Math.max((item.likeCount || 0) + (isLiked ? -1 : 1), 0)

    setLikedVideos((currentLikes) => isLiked
      ? currentLikes.filter((videoId) => videoId !== item._id)
      : [...currentLikes, item._id])
    localStorage.setItem('zoinsta-liked-food', JSON.stringify(isLiked
      ? likedVideos.filter((videoId) => videoId !== item._id)
      : [...likedVideos, item._id]))
    setVideos((currentVideos) => currentVideos.map((video) => video._id === item._id
      ? { ...video, likeCount: nextLikeCount }
      : video))

    try {
      await axios.post("http://localhost:3000/api/food/like", {
        foodId: item._id
      }, {
        withCredentials: true
      })
    } catch (error) {
      console.log(error)
      setLikedVideos((currentLikes) => isLiked
        ? [...currentLikes, item._id]
        : currentLikes.filter((videoId) => videoId !== item._id))
      localStorage.setItem('zoinsta-liked-food', JSON.stringify(isLiked
        ? [...likedVideos, item._id]
        : likedVideos.filter((videoId) => videoId !== item._id)))
      setVideos((currentVideos) => currentVideos.map((video) => video._id === item._id
        ? { ...video, likeCount: item.likeCount || 0 }
        : video))
    }
  }

  async function saveVideo(item){
    const isSaved = savedVideos.some((savedFood) => savedFood._id === item._id)
    const updatedSavedVideos = isSaved
      ? savedVideos.filter((savedFood) => savedFood._id !== item._id)
      : [...savedVideos, item]
    const nextSaveCount = Math.max((item.saveCount || 0) + (isSaved ? -1 : 1), 0)

    setSavedVideos(updatedSavedVideos)
    localStorage.setItem('zoinsta-saved-food', JSON.stringify(updatedSavedVideos))
    setVideos((currentVideos) => currentVideos.map((video) => video._id === item._id
      ? { ...video, saveCount: nextSaveCount }
      : video))

    try {
      await axios.post("http://localhost:3000/api/food/save", {
        foodId: item._id
      }, {
        withCredentials: true
      })
    } catch (error) {
      console.log(error)
      setSavedVideos(savedVideos)
      localStorage.setItem('zoinsta-saved-food', JSON.stringify(savedVideos))
      setVideos((currentVideos) => currentVideos.map((video) => video._id === item._id
        ? { ...video, saveCount: item.saveCount || 0 }
        : video))
    }
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
          <article className="feed-item" key={item._id} data-food-id={item._id}>
            <video className="feed-video" autoPlay muted loop playsInline>
              <source src={item.video} type="video/mp4" />
            </video>
            <div className="feed-shade" />
            <div className="feed-actions">
              <button className={`feed-action ${likedVideos.includes(item._id) ? 'is-active' : ''}`} type="button" onClick={() => likeVideo(item)} aria-label="Like video">
                <Heart fill={likedVideos.includes(item._id) ? 'currentColor' : 'none'} />
                <span>{item.likeCount || 0}</span>
              </button>
              <button className={`feed-action ${savedVideos.some((savedFood) => savedFood._id === item._id) ? 'is-active' : ''}`} type="button" onClick={() => saveVideo(item)} aria-label="Save video">
                <Bookmark fill={savedVideos.some((savedFood) => savedFood._id === item._id) ? 'currentColor' : 'none'} />
                <span>{item.saveCount || 0}</span>
              </button>
              <button className="feed-action" type="button" aria-label="Comment on video">
                <MessageCircle />
                <span>0</span>
              </button>
              <button className="feed-action" type="button" onClick={() => navigator.share?.({ title: item.name, text: item.description })} aria-label="Share video">
                <Send />
              </button>
            </div>
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

      <nav className="feed-navigation" aria-label="Main navigation">
        <Link className="feed-nav-link is-active" to="/">
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link className="feed-nav-link" to="/saved" onClick={openSaved}>
          <Bookmark />
          <span>Saved</span>
        </Link>
      </nav>

    </main>
  )
}

export default Home
