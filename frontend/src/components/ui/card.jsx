import React from 'react'

export function Card({children}) {
  return (
    <div className='w-2/3 bg-zinc-900 p-14 rounded-md'>
        {children}      
    </div>
  )
}
export default Card

