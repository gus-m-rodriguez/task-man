import React from 'react'

export const Input = React.forwardRef(({ type = "text", className = "", ...props }, ref) => {
  return (
    <input ref={ref} type={type} className="bg-zinc-800 bordeer border-zinc-600 rounded-md px-3 py-2 w-full my-2 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
    {...props}/>
    )
})

export default Input
