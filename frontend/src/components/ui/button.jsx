import React from 'react'

export function Button({children}) {
  return (
    <button className=' relative inline-flex items-center gap-1.5 bg-blue-500 text-white rounded px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-800 
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:opacity-50 disabled:cursor-not-allowed'>
        {children}
    </button>
  )
}

export default Button
