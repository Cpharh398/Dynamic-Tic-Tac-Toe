"use client"
import { motion } from "framer-motion"
import Link from 'next/link'

export const WelcomeText = ()=>{
    const title: string = "Tic-Tac-Toe"
    return(
      <span className='text-5xl flex font-semibold ' > 
  
      { title.split('').map((letter, index)=> 
  
        <motion.p 
        key={letter}
        initial ={{ scale: 0 } }
        animate={{ scale:1 }}  
        transition={{ delay: 0.025 * index, duration:0.5, ease:'easeInOut'  }} > 
      
          {letter} 
  
        </motion.p>  )
  
      }
  
    </span>
    )
  }


  export const Single_Multiyplayer = ()=>{
    return(
      <div className='flex justify-center items-center gap-5 ' >
  
        <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }} 
        whileTap={{ scale:1.3 }}  whileHover={{ scale:1.1 }} className='shadow-xl rounded-xl ' >
          <Link href="/choose" prefetch={true}  className='bg-[#E2DAD6] h-[2.3rem] w-[8rem] flex justify-center items-center rounded-xl hover:cursor-pointer font-semibold  ' >
            Start Game
          </Link>
        </motion.div>
  
      
    </div>
  
    )
  }