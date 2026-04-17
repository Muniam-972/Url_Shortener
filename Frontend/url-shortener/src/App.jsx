
// import UrlForm from './src/components/UrlForm'
import './App.css'
import React, { useState } from 'react'

function App() {
  const [shortUrl, setShortUrl] = useState('')

  const handleUrlShortened = (url) => {
    setShortUrl(url)
  }

  return (
    <>
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
        <UrlForm onUrlShortened={handleUrlShortened} />
        
        {shortUrl && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl w-full max-w-md">
            <p className="text-sm text-gray-600 mb-2">Your shortened URL:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 p-2 bg-white border rounded-lg text-sm"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center p-4 text-gray-500">
        © 2026 URL Shortener. All rights reserved.
      </footer>
    </div>
  
    </>
  )
  }

export default App
