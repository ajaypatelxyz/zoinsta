import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {

    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    await axios.post("http://localhost:3000/api/auth/food-partner/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    navigate("/create-food");

  }

  return (
    <main className="auth-shell">
      <section className="auth-intro" aria-label="Zoinsta introduction">
        <Link className="brand" to="/food-partner/login">
          <span className="brand-mark">z</span>
          <span>Zoinsta</span>
        </Link>
        <div className="intro-copy">
          <span className="intro-line" />
          <p>Good food deserves to be found.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <span className="eyebrow">Food partner portal</span>
          <h1>Welcome back</h1>
          <p className="auth-description">Keep your menu, profile, and community presence up to date.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label className="field" htmlFor="email">
                <span>Business email</span>
                <input id="email" name="email" type="email" placeholder="you@business.com" autoComplete="email" required />
              </label>
              <label className="field" htmlFor="password">
                <span>Password</span>
                <input id="password" name="password" type="password" placeholder="Your password" autoComplete="current-password" required />
              </label>
            </div>
            <button className="submit-button" type="submit">
              Log in
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>

          <p className="auth-switch">
            New food partner? <Link to="/food-partner/register">Register your business</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default FoodPartnerLogin
