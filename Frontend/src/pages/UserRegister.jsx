import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        await axios.post("http://localhost:3000/api/auth/user/register", {
            fullName,
            email,
            password,
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
          <span className="eyebrow">Join Zoinsta</span>
          <h1>Create your account</h1>
          <p className="auth-description">Save your favorite food spots and share what you discover.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label className="field" htmlFor="fullName">
                <span>Full name</span>
                <input id="fullName" name="fullName" type="text" placeholder="Your name" autoComplete="name" required />
              </label>
              <label className="field" htmlFor="email">
                <span>Email address</span>
                <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
              </label>
              <label className="field" htmlFor="password">
                <span>Password</span>
                <input id="password" name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
              </label>
            </div>
            <button className="submit-button" type="submit">
              Create account
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/user/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default UserRegister
