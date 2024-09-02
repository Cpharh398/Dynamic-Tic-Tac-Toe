"use client"
import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { setBoardWidthHeight, setBoardGridRowCols, boardGridRowCols, setBoardSquareNumber } from './util'

const GridBoard = ({ setGridSize }:{setGridSize: any} )=>{

  const [height, setHeight] = useState<number>(15)
  const [gridRowCol, setGridRowCol] = useState<number>(3)
  let squareNumber = Math.pow(gridRowCol, 2)

  const [contentFit, setContentFit] = useState<Boolean>(true)
  setBoardGridRowCols(gridRowCol)

  
  const Update = ():void=>{
    setBoardWidthHeight(height)
    setBoardSquareNumber(squareNumber)
  }


  useEffect(()=>{
    setGridSize(gridRowCol)
    setBoardGridRowCols(gridRowCol)
    Update()
    

  }, [])



  useEffect(()=>{
    if(gridRowCol >= 10 ){
      setContentFit(false)
    }else{
      setContentFit(true)
    }
    Update()
  }, [gridRowCol])




  const Biggergrid = () : void =>{

    if(contentFit){
      setHeight(height + 2)
      setGridRowCol((prev:number) => prev + 1)
      setGridSize((prev:number) => prev + 1)
      Update()
      setBoardGridRowCols(boardGridRowCols + 1)
      
    }

  }

  const SmallerGrid = ()=>{
    if(gridRowCol > 3){
      setHeight(height - 2)
      setGridRowCol((prev:number) => prev - 1)
      setGridSize((prev:number) => prev - 1)
      Update()
      setBoardGridRowCols(boardGridRowCols - 1)
    }
  }



  return(
      <div className={`bg-slate-300/65 rounded-lg transition-all  relative mb-11 grid  gap-2 p-2`} 
      style={{ height:`${height}rem`, width:`${height + 2}rem`, gridTemplateColumns:`repeat(${gridRowCol}, minmax(0, 1fr))`, gridTemplateRows:`repeat(${gridRowCol}, minmax(0, 1fr))` }} >
          {
              Array(squareNumber).fill(null).map(()=>
                <div className='bg-[#ffe8f0] w-full h-full rounded-md transition-all' />
              )
          }

          <div className='absolute  h-full w-full flex justify-between items-center ' >
            <Arrow height={height} HandleClick={SmallerGrid} classname={'bottom-[7.5rem] aspect-square left-1 bg-slate-400  rounded-full flex justify-center items-center box_shadow opacity-65  hover:opacity-100 hover:cursor-pointer' } />
            <Arrow height={height} HandleClick={Biggergrid}  classname={'bottom-[7.5rem] aspect-square right-1 bg-slate-400  rounded-full flex justify-center items-center box_shadow rotate-180 opacity-65  hover:opacity-100 hover:cursor-pointer'  } />
            <Screen_Size_Limit contentFit={contentFit} />
          </div>

      </div>
  )
}

const Screen_Size_Limit =({ contentFit }: { contentFit:Boolean }) => {
  return(
    <div className={`bg-slate-400/50 ${contentFit ? "hidden": "flex"}  justify-center items-center uppercase absolute bottom-[10%] p-1 w-full font-semibold `} >
      <p> Screen too small to fit the entire grid </p>
    </div>
  )
}




const Arrow=({ classname, HandleClick, height }:{ classname:string, HandleClick: ()=> void, height:number })=>{
  return(
    <div className={classname} onClick={()=> HandleClick()}  style={{ width:`${height > 30 ? '4rem': `${height / 8.5}rem` }` }} >
      <IoIosArrowBack className='text-2xl' />
    </div>
  )
}

export default GridBoard