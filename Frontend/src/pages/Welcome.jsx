import React from 'react'
import { ArrowRight, BriefcaseBusiness, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {
  return (
    <main className="welcome-page">
      <header className="welcome-header">
        <Link className="welcome-brand" to="/">
          <img className="welcome-brand-mark" src="/zoinsta-logo.svg" alt="" />
          <span>Zoinsta</span>
        </Link>
        <Link className="welcome-explore" to="/home">
          Explore food
          <ArrowRight />
        </Link>
      </header>

      <section className="welcome-content">
        <div className="welcome-intro">
          <span className="welcome-eyebrow">A place for good food</span>
          <h1>Find your next favorite place.</h1>
          <p>Choose how you want to use Zoinsta and get started.</p>
        </div>

        <div className="welcome-options">
          <article className="welcome-option welcome-option-user">
            <div className="welcome-option-icon">
              <UserRound />
            </div>
            <div>
              <span className="welcome-option-label">For food lovers</span>
              <h2>Discover and save</h2>
              <p>Explore nearby food spots, save your favorites, and share what you find.</p>
            </div>
            <div className="welcome-option-actions">
              <Link className="welcome-primary-action" to="/user/login">
                User login
                <ArrowRight />
              </Link>
              <Link className="welcome-secondary-action" to="/user/register">Create account</Link>
            </div>
          </article>

          <article className="welcome-option welcome-option-partner">
            <div className="welcome-option-icon">
              <BriefcaseBusiness />
            </div>
            <div>
              <span className="welcome-option-label">For food partners</span>
              <h2>Share your place</h2>
              <p>Show your menu, reach new customers, and grow your food business.</p>
            </div>
            <div className="welcome-option-actions">
              <Link className="welcome-primary-action" to="/food-partner/login">
                Partner login
                <ArrowRight />
              </Link>
              <Link className="welcome-secondary-action" to="/food-partner/register">Join as partner</Link>
            </div>
          </article>
        </div>
      </section>

      <footer className="welcome-footer">
        <span>Good food is closer than you think.</span>
        <span>© Zoinsta</span>
      </footer>
    </main>
  )
}

export default Welcome