import React from 'react'

function Footer() {
  return (
    <div className='pb-10 sm:pb-5'>
        <div className='h-[1px] w-full bg-gray-700'></div>
        <div className='flex flex-col items-center justify-center font-semibold text-sm'>
            <h1 className='text-white mt-5'>
                Designed & Developed by
            </h1>
            <h1 className='text-white mt-2'>
                Neella Kalyan Sai
            </h1>
        </div>
    </div>
  )
}

export default Footer