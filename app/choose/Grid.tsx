"use client"
import React, { useState } from 'react'
import { selectionType } from "./util"
import Link from 'next/link'
import GridBoard from './GridBoard';
import { motion, Variants } from 'framer-motion';


function Grid({isVisible, setIsVisible, playerPiece}:selectionType){
  const [gridSize, setGridSize] = useState<number>(0)

  const Variants: Variants ={
    open:{
      x:0,
      opacity:1,
      transition:{
        delay:0.2,
        ease:"easeInOut"
      }
    },
    closed:{
      x:-100,
      opacity:0
    }
  }

    return(
  
      <motion.div
      variants={Variants}
      animate={isVisible ? "open": "closed"}
       className={`${isVisible? "h-auto": "h-0"} flex flex-col items-center absolute transition-all rounded-md w-auto overflow-hidden `} >
        <p className='text-2xl font-semibold' >GRIDSIZE: {gridSize + "x" + gridSize}</p>

        <GridBoard setGridSize={setGridSize} />
        <Buttons setIsVisible={setIsVisible} playerPiece={playerPiece} />

  
      </motion.div>
  
    )
  }


  const Buttons = ({ setIsVisible, playerPiece }: { setIsVisible:any, playerPiece:string | null | undefined })=>{
    return(
      <div className='w-full h-[2.5rem] flex items-center justify-center absolute bottom-1 gap-2 box'>
          
        <Link className='bg-slate-300 w-[6rem] h-8 rounded-md font-semibold flex justify-center items-center'  href={{ pathname:'/Game', query:{ selected: `${playerPiece}`  } }} >
        Done
        </Link>

        <button className='bg-slate-300 w-[6rem] h-8 rounded-md font-semibold flex justify-center items-center'  onClick={()=> setIsVisible((prev:Boolean)=> !prev )} >Back</button>

    </div>
    )
  }

 

export default Grid