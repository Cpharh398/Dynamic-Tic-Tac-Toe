"use client"
import React from "react"
import { motion, Variants } from "framer-motion"
import { useSearchParams } from "next/navigation"

type Squaretype = {
    HandleClick: (index: number)=> void,
    squareState: (string | null)[],
    squareIndex: number,
    isPlayerTurn:Boolean | null,
    winner: String | null,
    winnerSquares: any | number[] 
}


const Square = ({HandleClick, squareState, squareIndex, isPlayerTurn, winnerSquares, winner}: Squaretype)=>{

  const searchParams = useSearchParams()
  const variants : Variants = {
    show:{
      scale:1
    },
    hidden: (index: number) =>{
      return winnerSquares === "Draw" ? { scale: 0.90, backgroundColor: "#a7a9ab" } : 
      winnerSquares.includes(index) ? { scale : 1.089, backgroundColor: winner == searchParams.get("selected") ? "#07d018": "#e60202" } : 
      { scale:0.90, backgroundColor: "#a7a9ab", opacity:0.8  }
    }
  }

    return(
      <motion.div
      variants={variants} 
      custom={squareIndex}

      className={` h-[100%] transition-all duration-500 relative overflow-hidden bg-[#ffe8f0] w-[100%]  rounded-lg flex justify-center items-center hover:cursor-pointer `}
      onClick={()=> {isPlayerTurn && HandleClick(squareIndex) } }
      >
        <p className='text_size relative z-10 ' >{squareState[squareIndex]}</p>
      </motion.div>
    )
  }



  export default Square