import React from 'react'

const Logo = () => {
    return (
      <div className="flex items-center gap-3 px-6 py-4">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="url(#gradient)"
        className="w-10 h-10 text-purple-500 drop-shadow-md"
        >
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a16ee8" />
                <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
            </defs>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h5m-5 8h10a4 4 0 004-4V8a4 4 0 00-4-4H7a4 4 0 00-4 4v12l4-4z"
            />
        </svg>
        <h1
        className="text-4xl font-extrabold bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text animate-pulse drop-shadow-[0_0_6px_rgba(193,103,255,0.7)]"
        >
        Skorall
        </h1>
      </div>
    );
  };
  
  export default Logo;
  