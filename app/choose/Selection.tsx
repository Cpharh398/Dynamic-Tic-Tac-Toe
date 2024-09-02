'use client'
import React from 'react'
import { selectionType } from './util'
import { motion, Variants } from 'framer-motion'

function Selection({isVisible, setIsVisible, setplayerPiece}:selectionType){

    const HandleClick = (piece:String)=>{
      setIsVisible((prev:Boolean)=> !prev)
      setplayerPiece(piece)
    }


    const Variants: Variants ={
      open:{
        x:0,
        opacity:1,
        transition:{
          delay:0.2
        }
      },
      closed:{
        x:100,
        opacity:0
      }
    }
  
    return(
      <motion.div
      initial={false}
      variants={Variants}
      animate={isVisible ? "closed": 'open'}
      className={`h-[8rem]  bg-slate-300 w-[20rem] flex flex-col rounded-xl gap-3  shadow-lg overflow-hidden `} >
  
          <div className='w-full flex justify-center items-center '  >
              <h1 className='text-3xl font-semibold ' >Pick Your Piece</h1>
          </div>
  
          <div className='w-full  h-[3.5rem] flex justify-center items-center gap-5 ' >
              <button className='text-2xl border-[2px] border-slate-600 rounded-md flex items-center justify-center w-[3rem] h-full hover:scale-125 hover:cursor-pointer transition-transform shadow-md font-semibold' 
              onClick={()=> HandleClick("X") }>
                X
              </button>
              
              <button className='text-2xl border-[2px] border-slate-600 rounded-md flex items-center justify-center w-[3rem] h-full hover:scale-125 hover:cursor-pointer transition-transform shadow-md font-semibold' 
              onClick={()=> HandleClick("O")  }>
                O
              </button>
  
          </div>
          
      </motion.div>
    )
  }
export default Selection