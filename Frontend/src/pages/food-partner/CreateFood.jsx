import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!videoFile) {
      setVideoPreview('')
      return
    }

    const previewUrl = URL.createObjectURL(videoFile)
    setVideoPreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [videoFile])

  const handleVideoChange = (e) => {
    const selectedVideo = e.target.files[0]

    setVideoFile(selectedVideo)
    setError('')
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')

    if (!videoFile) {
      setError('Please choose a food video.')
      return
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description)
    formData.append("video", videoFile);

    try {
      setIsUploading(true)

      await axios.post("http://localhost:3000/api/food", formData, {
        withCredentials: true
      })

      navigate("/");
    } catch (error) {
      console.log(error)
      setError('Unable to publish this food.')
    } finally {
      setIsUploading(false)
    }

  }

  return (
    <main className="create-food-page">
      <header className="create-food-header">
        <Link className="create-food-brand" to="/">
          <span className="create-food-mark">z</span>
          <span>Zoinsta</span>
        </Link>
        <Link className="create-food-back" to="/">Back to feed</Link>
      </header>

      <section className="create-food-content">
        <span className="create-food-eyebrow">Food partner studio</span>
        <h1 className="create-food-title">Share your next dish.</h1>
        <p className="create-food-description">
          Add a short food video and give your community a reason to stop by.
        </p>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="create-food-upload">
            <span className="create-food-upload-label">Food video</span>
            <input className="create-food-file" id="video" name="video" type="file" accept="video/*" onChange={handleVideoChange} required />
            {videoPreview ? (
              <div className="create-food-preview-box">
                <video className="create-food-preview" controls playsInline>
                  <source src={videoPreview} type={videoFile.type} />
                </video>
                <label className="create-food-change-video" htmlFor="video">Choose another video</label>
              </div>
            ) : (
              <label className="create-food-upload-box" htmlFor="video">
                <span>
                  <span className="create-food-upload-icon" aria-hidden="true">+</span>
                  <span className="create-food-upload-title">Choose a video</span>
                  <span className="create-food-upload-note">MP4 or WebM · Keep it short and vertical</span>
                </span>
              </label>
            )}
          </div>

          <div className="create-food-field">
            <label htmlFor="name">Food name</label>
            <input className="create-food-input" id="name" name="name" type="text" placeholder="e.g. Spicy ramen bowl" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="create-food-field">
            <label htmlFor="description">Description</label>
            <textarea className="create-food-textarea" id="description" name="description" placeholder="Tell people what makes this dish special..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          {error && <p className="create-food-error" role="alert">{error}</p>}

          <button className="create-food-submit" type="submit" disabled={isUploading}>
            {isUploading ? 'Publishing...' : 'Publish food'}
            <span aria-hidden="true">-&gt;</span>
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateFood
