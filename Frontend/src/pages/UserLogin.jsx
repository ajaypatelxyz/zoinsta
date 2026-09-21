import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password =e.target.password.value;

    await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    navigate("/");

  }

  return (
    <main className="auth-shell">
      <section className="auth-intro" aria-label="Zoinsta introduction">
        <Link className="brand" to="/user/login">
          <span className="brand-mark">z</span>
          <span>Zoinsta</span>
        </Link>
        <div className="intro-copy">
          <span className="intro-line" />
          <p>Find something worth sharing.</p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <span className="eyebrow">Welcome back</span>
          <h1>Log in to Zoinsta</h1>
          <p className="auth-description">Pick up where you left off and find your next favorite place.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label className="field" htmlFor="email">
                <span>Email address</span>
                <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
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
            New to Zoinsta? <Link to="/user/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default UserLogin
