import React from 'react'

export default function Notfound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-4xl font-semibold text-red-600">Oops!</h2>
        <p className="mt-2 text-xl text-gray-700">No games found with that criteria.</p>
        <img
          src="https://media.giphy.com/media/2A3mmKwClpyVn7y6d5/giphy.gif"
          alt="Not Found"
          className="mt-6 w-1/2 rounded-lg shadow-xl mx-auto"
        />
        <p className="mt-4 text-sm text-gray-500">Try refining your search criteria!</p>
      </div>
    </div>
  );
}
