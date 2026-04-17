  import React, { useState } from 'react'

const UrlForm = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('')
  const [customId, setCustomId] = useState('')
  const [expiresIn, setExpiresIn] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic URL validation
    if (!originalUrl.trim()) {
      setError('Please enter a URL')
      setLoading(false)
      return
    }

    // Custom ID validation
    if (customId && !/^[a-zA-Z0-9_-]+$/.test(customId)) {
      setError('Custom ID can only contain letters, numbers, hyphens, and underscores')
      setLoading(false)
      return
    }

    try {
      const requestBody = { originalUrl }
      
      // Add optional fields only if they have values
      if (customId.trim()) {
        requestBody.customId = customId.trim()
      }
      
      if (expiresIn && !isNaN(expiresIn) && parseInt(expiresIn) > 0) {
        requestBody.expiresIn = parseInt(expiresIn)
      }

      const response = await fetch('http://localhost:3000/url/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to shorten URL')
      }

      // Pass all response data to parent component
      onUrlShortened({
        shortUrl: data.shortUrl,
        expiresAt: data.expiresAt,
        qrCode: data.qrCode
      })
      
      // Reset form
      setOriginalUrl('')
      setCustomId('')
      setExpiresIn('')
    } catch (err) {
      setError(err.message || 'An error occurred while shortening the URL')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Short URL</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Original URL *
          </label>
          <input
            type="url"
            placeholder="https://example.com/very/long/url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom ID (optional)
          </label>
          <input
            type="text"
            placeholder="my-custom-link"
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Letters, numbers, hyphens, and underscores only"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank for auto-generated ID
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expires In (seconds, optional)
          </label>
          <input
            type="number"
            placeholder="3600 (1 hour)"
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value)}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            min="1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank for no expiration
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Shortening...' : 'Generate Link'}
        </button>
      </form>
    </div>
  )
}

export default UrlForm
