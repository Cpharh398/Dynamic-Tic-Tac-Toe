'use client'
import React, { useEffect, useState } from 'react'
import Board from "@/components/Board"
import Link from 'next/link'
import { motion } from 'framer-motion'
import {  useRouter } from 'next/navigation'


function page() {
  const [winner, setWinner] = useState<String | null>(null)
  const [restart, setRestart] = useState<Boolean>(false)
  

  return (
    <div className='flex flex-col items-center' >
      <Board winner={winner} setWinner={setWinner} restart={restart}  />
      <GameOver winner={winner} setRestart={setRestart} />
    </div>
  )
}

const GameOver = ({winner, setRestart}: {winner : String | null, setRestart: any})=>{

  const router = useRouter()

  const variants = {
    show:{ scaleY:1, transition:{ delay:3 } },
    hidden:{scaleY: 0}
  }

  
  return(
    <motion.div variants={variants} initial={{ scaleY:0 }} animate={winner == null ? "hidden" : "show" }
    
    className={` top-auto absolute w-[15rem] h-[9rem] transition-all ease-in-out delay-300 duration-300  bg-[#b5bbc4] border border-slate-500/55  flex flex-col  rounded-lg  box overflow-hidden `} >

     <div className=" w-full  h-[6rem] flex justify-center items-start p-2 " >
      <p className="text-2xl font-semibold" > Winner: {winner}</p>
     </div>

     <div className="w-full h-[5rem] flex justify-center items-start gap-5 box  " >

      <button onClick={()=> setRestart((prev:Boolean) => !prev )}  className="bg-slate-200 p-1  w-[5rem] rounded-md font-semibold hover:scale-125 transition-all " > Restart </button>

      <button onClick={()=> router.push('./')}  className="bg-slate-200 p-1 w-[5rem] flex items-center justify-center rounded-md font-semibold hover:scale-125 transition-all" > Home </button>

     </div>


    </motion.div>
  )
}


export default page