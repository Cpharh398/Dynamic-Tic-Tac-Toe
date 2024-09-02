
import { CalWinningSeq } from "@/app/Game/WinningSeq"

export type selectionType = {
    isVisible:Boolean,
    setIsVisible: any,
    setplayerPiece?: any,
    playerPiece?: string | null
  }

export let boardWidthHeight: number = 0
export let boardGridRowCols: number = 0
export let boardSquareNumber: number = 0
export let WinningSeq:number[][] = []


export const setBoardWidthHeight=(newValue: number)=>{
  boardWidthHeight = newValue
}



export const setBoardGridRowCols = (newValue: number)=>{
  boardGridRowCols = newValue
  setWinningSeq()
}


export const setBoardSquareNumber = (newValue: number)=>{
  boardSquareNumber = newValue
}


export const setWinningSeq = () => {
  WinningSeq = CalWinningSeq(boardGridRowCols)
  return WinningSeq
}



