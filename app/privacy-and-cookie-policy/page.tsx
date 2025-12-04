import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Privacy and Cookie Policy
          </h1>
        </div>
      </div>

      {/* PDF Embed */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://drive.google.com/file/d/19E01IoTLntBy3ezPtvLrpst7YtVQM0rD/preview"
              width="100%"
              height="800"
              className="w-full h-[800px] border-0"
              title="AIESEC Sri Lanka Privacy and Cookie Policy"
              allow="autoplay"
            />
          </div>
          
          {/* Download Link */}
          <div className="mt-6 text-center">
            <a
              href="https://drive.google.com/file/d/19E01IoTLntBy3ezPtvLrpst7YtVQM0rD/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Full Document
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page