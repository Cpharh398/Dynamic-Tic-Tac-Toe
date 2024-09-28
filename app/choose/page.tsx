'use client'
import React, { useState } from 'react'
import Selection from './Selection'
import Grid from './Grid'

function Page() {
  const [isVisible, setIsVisible] = useState<Boolean>(false)
  const [playerPiece, setplayerPiece] = useState<string | null>(null)

  return (

    <div className='h-full w-full flex justify-center items-center' >
      <Selection isVisible={isVisible} setIsVisible={setIsVisible} setplayerPiece={setplayerPiece} />
      <Grid isVisible={isVisible} setIsVisible={setIsVisible} playerPiece={playerPiece} />
    </div>

  )
}

export default Page