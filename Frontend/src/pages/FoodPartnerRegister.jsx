import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleSubmit = async(e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    await axios.post("http://localhost:3000/api/auth/food-partner/register", {
      name,
      contactName,
      email,
      phone,
      address,
      password
    }, {
      withCredentials: true
    }).then(response => {
      navigate("/create-food")
    }).catch(error => {
      console.log(error)
    })

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
          <span className="eyebrow">For food partners</span>
          <h1>Bring your place to life</h1>
          <p className="auth-description">Connect with hungry locals and grow your food business on Zoinsta.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="field-grid field-grid-compact">
              <label className="field" htmlFor="name">
                <span>Business name</span>
                <input id="name" name="name" type="text" placeholder="Your restaurant or brand" autoComplete="organization" required />
              </label>
              <label className="field" htmlFor="contactName">
                <span>Contact person</span>
                <input id="contactName" name="contactName" type="text" placeholder="Full name" autoComplete="name" required />
              </label>
              <label className="field" htmlFor="email">
                <span>Business email</span>
                <input id="email" name="email" type="email" placeholder="you@business.com" autoComplete="email" required />
              </label>
              <label className="field" htmlFor="phone">
                <span>Phone number</span>
                <input id="phone" name="phone" type="tel" placeholder="+1 555 000 0000" autoComplete="tel" required />
              </label>
              <label className="field" htmlFor="address">
                <span>Business address</span>
                <input id="address" name="address" type="text" placeholder="Street, city" autoComplete="street-address" required />
              </label>
              <label className="field" htmlFor="password">
                <span>Password</span>
                <input id="password" name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
              </label>
            </div>
            <button className="submit-button" type="submit">
              Create partner account
              <span aria-hidden="true">-&gt;</span>
            </button>
          </form>

          <p className="auth-switch">
            Already a partner? <Link to="/food-partner/login">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default FoodPartnerRegister
