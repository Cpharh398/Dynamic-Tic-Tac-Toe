'use client'
import React, { useEffect, useState } from "react"
import Square from "./Square"
import { motion } from "framer-motion"
import { useSearchParams } from "next/navigation"
import { boardSquareNumber, boardGridRowCols, boardWidthHeight, WinningSeq } from '@/app/choose/util'
import { CheckWinner, MiniMax, SetWinningCombo, winningCombo } from "@/app/Game/util"
import { CalWinningSeq} from "@/app/Game/WinningSeq"


const Board = ({ winner, setWinner, restart }:{ winner: String | null, setWinner: any, restart:Boolean })=>{

  const searchParams = useSearchParams()
  const [gameState, setGameState] = useState<(string | null)[]>(Array(boardSquareNumber).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState<Boolean | null >(searchParams.get('selected') == "X"? true : false )
  const [winnerSquares, setWinnerSquares] = useState<any | number[] >(null)
  const [turn, setTurn] = useState("X")
  const [fireonce, setFireOnce] = useState(searchParams.get('selected') == "X" ? true : false )

  const Restart=()=>{
    setGameState(Array(boardSquareNumber).fill(null))
    setIsPlayerTurn(searchParams.get('selected') == "X" ? true : false)
    setWinner(null)
    setWinnerSquares("")
    setTurn("X")
  }

  useEffect(()=>{
    Restart()
  },[restart])
  
  useEffect(()=>{
    if(fireonce){

      if(!isPlayerTurn){  
        setTimeout(()=>{
          ComputerPlay()

        }, 200)
      }

    }

  }, [gameState])


  useEffect(()=>{
    SetWinningCombo(CalWinningSeq(boardGridRowCols))
    
    if(!isPlayerTurn){  
      ComputerPlay()
      setFireOnce(true)
    }
    return ()=>{
      Restart()
    }
  },[])
   


  const ComputerPlay = ()=>{
    
    let depth = boardGridRowCols > 5 ? 4 : 8
    let alpha = -999
    const beta = 999

    let { board } = MiniMax(gameState, depth, alpha, beta, true, searchParams, setWinner, setWinnerSquares, winner)
    CheckWinner(board, false, setWinner, setWinnerSquares, winner)
    setGameState(board)
    setIsPlayerTurn(prev => !prev)
    setTurn(turn === "X" ? "O" : "X")
        
    }


  const HandleClick =(index:number)=>{

    if(winner != null){
      return
    }
    

    const updateGameState = [...gameState]

    if(updateGameState[index] === null ){

      updateGameState[index] = turn
      setTurn(turn === "X" ? "O" : "X")

      CheckWinner(updateGameState, false, setWinner, setWinnerSquares, winner)
      setGameState(updateGameState)
      setIsPlayerTurn(prev => !prev)
    }

    }

    const variants = {
      show:{ 
        scaleY:1,
       },
      hidden:{
        scaleY: 0,
        transition:{
          delay:3,
        }
      }
    }



  return(
    <motion.div
      initial={false}
      animate={winner == null ? "show" : "hidden"}
      >

      <motion.div
      variants={variants}
      style={{ gridTemplateRows: `repeat(${boardGridRowCols}, minmax(0, 1fr)`, gridTemplateColumns: `repeat(${boardGridRowCols}, minmax(0, 1fr)`, height:`${boardWidthHeight}rem`, width:`${boardWidthHeight + 2}rem` }}
      className={`relative gap-2 p-2 bg-slate-300/65 rounded-xl grid` } >
        <Stats isPlayerTurn={isPlayerTurn}  />
          {
            Array(boardSquareNumber).fill(null).map((_, index)=>{
              return(
                <Square key={index}  winner={winner} winnerSquares={winnerSquares} HandleClick={HandleClick} squareState={gameState} squareIndex={index} isPlayerTurn={isPlayerTurn} />
              )
            })
          }

      </motion.div>
    </motion.div>
  )
}


const Stats = ({isPlayerTurn}: { isPlayerTurn:Boolean | null})=>{
  return(
    <div className={`h-[2.5rem] absolute center__stats top-[-3.8rem] rounded-md bg-white w-[20rem] flex overflow-hidden px-[3px]`} >

      <div className="h-full w-full relative flex justify-center items-center z-20 " >
        <p className="font-semibold" >You</p>
      </div>

      <div className="h-full w-full relative flex justify-center items-center z-20 " >
        <p className="font-semibold" >AI</p>
      </div>

      <div className={`absolute w-[50%] h-[90%] bg-slate-500/55 rounded-md z-10 self-center ${ isPlayerTurn ? "translate-x-[0rem]": "translate-x-[9.6rem] " } transition-transform `} />

    </div>
  )
}

export default Board