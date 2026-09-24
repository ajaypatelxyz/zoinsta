import React, { useEffect, useState } from 'react'
import './Toast.css'

export const showToast = (message) => {
  window.dispatchEvent(new CustomEvent('zoinsta-toast', {
    detail: { message }
  }))
}

const Toast = () => {
  const [toast, setToast] = useState(null)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const handleToast = (event) => {
      setIsLeaving(false)
      setToast({
        id: Date.now(),
        message: event.detail.message
      })
    }

    window.addEventListener('zoinsta-toast', handleToast)

    return () => window.removeEventListener('zoinsta-toast', handleToast)
  }, [])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const leaveTimeoutId = window.setTimeout(() => setIsLeaving(true), 3200)
    const removeTimeoutId = window.setTimeout(() => setToast(null), 3500)

    return () => {
      window.clearTimeout(leaveTimeoutId)
      window.clearTimeout(removeTimeoutId)
    }
  }, [toast])

  if (!toast) {
    return null
  }

  return (
    <div className={`toast ${isLeaving ? 'is-leaving' : ''}`} role="status" aria-live="polite" key={toast.id}>
      <span className="toast-dot" aria-hidden="true" />
      {toast.message}
    </div>
  )
}

export default Toast
