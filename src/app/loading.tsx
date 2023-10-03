import React from 'react'
import LargeLoadingSpinner from '@/components/Loader'

export default function loading() {
  return (
    <div className="h-[96vh] w-screen flex items-center justify-center">
      <LargeLoadingSpinner />
    </div>
  )
}
