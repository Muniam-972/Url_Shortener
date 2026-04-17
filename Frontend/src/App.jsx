import React, { useState } from 'react'
import UrlForm from './components/UrlForm'

function App() {
  const [shortUrlData, setShortUrlData] = useState(null)

  const handleUrlShortened = (data) => {
    setShortUrlData(data)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-blue-600">URL Shortener</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Shorten Your Links Instantly 🚀
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl">
          Paste your long URL and get a short, shareable link in seconds.
        </p>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-6 pb-20">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Fast</h3>
          <p className="text-gray-600">Generate short links instantly.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Secure</h3>
          <p className="text-gray-600">Your links are safe and reliable.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600">Track clicks and performance.</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex justify-center pb-20 px-4">
        <div className="w-full max-w-md">
          <UrlForm onUrlShortened={handleUrlShortened} />
          
          {shortUrlData && (
            <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Shortened URL</h3>
              
              {/* URL Display */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Short URL:</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={shortUrlData.shortUrl}
                    readOnly
                    className="flex-1 p-3 bg-white border rounded-lg text-sm"
                  />
                  <button
                    onClick={() => navigator.clipboard.writeText(shortUrlData.shortUrl)}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* QR Code Display */}
              {shortUrlData.qrCode && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">QR Code:</p>
                  <div className="flex justify-center">
                    <img 
                      src={shortUrlData.qrCode} 
                      alt="QR Code" 
                      className="border-2 border-white rounded-lg shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.download = 'qrcode.png'
                      link.href = shortUrlData.qrCode
                      link.click()
                    }}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                  >
                    Download QR Code
                  </button>
                </div>
              )}

              {/* Expiration Information */}
              {shortUrlData.expiresAt && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Expires At:</p>
                  <p className="text-sm font-medium text-gray-800">
                    {new Date(shortUrlData.expiresAt).toLocaleString()}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(shortUrlData.shortUrl, '_blank')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Open Link
                </button>
                <button
                  onClick={() => setShortUrlData(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium"
                >
                  Create New
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-500">
        © 2026 URL Shortener. All rights reserved.
      </footer>
    </div>
  )
}

export default App
