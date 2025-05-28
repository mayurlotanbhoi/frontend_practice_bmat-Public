import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to Home</h1>
        <p className="text-gray-600 mb-6">
          This is your beautiful React component. You can customize this section to show key features, onboarding steps, or a personal message.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 border border-purple-600 text-purple-700 rounded-xl hover:bg-purple-100 transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
