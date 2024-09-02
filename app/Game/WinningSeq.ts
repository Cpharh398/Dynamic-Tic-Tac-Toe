import { boardGridRowCols } from '../choose/util'

  
  // this function takes a grid and returns
  //the rows of the matrix in reversed order
  function GridReversed(num:number):number[][] {
    const grid = Grid(num)
    let gridReversed: number[][] = []
  
    grid.forEach((item)=>{
      let temp = item.toReversed()
      gridReversed.push(temp)
    })
  
    return gridReversed
  
  
  }
  
  
  
  
  
  // this function takes in a grid
  // and returns the diagonal winning sequence
  function CalGridDiag(_grid:number[][]):number[][]{
    const grid = _grid
    const gridDiagonal = Diagonal(grid)
    let col_win_seq: number[][] = []
  
    gridDiagonal.forEach((item)=>{
  
        if(item.length == 3){
          col_win_seq.push(item)
  
        }else if(item.length > 3){
  
          let win_seq = CalGridRow([item])
  
          win_seq.map((element)=>{
            col_win_seq.push(element)
          })
          
  
        }
    })
  
    return col_win_seq
  }
  
  
  // this function uses a num x num grid
  // and returns all the values which are in a diagonal sequence
  function Diagonal(grid:number[][]):number[][] {
    let temp: number[] = []
    let temp_seq: number[] = []
    let GridCol: number[][] =[]
    const Grid = grid
  
    let increment: number = 0
    let decrement: number = 0
  
    for(let x = 0; x < Grid.length; x++){
  
      for(let y = 0; y < Grid.length - decrement; y++ ){
        temp.push(Grid[y][y + increment])
        
        if(x != 0){
          temp_seq.push(Grid[y + increment][y])
        }
      }
      
      GridCol.push(temp)
      temp = []
      increment++
      decrement++
  
      if(temp_seq.length != 0){
        GridCol.push(temp_seq)
        temp_seq = []
      }
  
    }
    return GridCol
  }
  
  
  // this function uses the  num x num grid 
  // to calculate the winning column sequence
  function CalGridCol(num:number): number[][] {
  
      const placeHolder = Grid(num)
      let transpose: number[][] = []
      let temp: number[] = []
  
      // to calculate the winning column seq we first
      // transpose the num x num grid
      for(let x = 0; x < placeHolder.length; x++){
  
        for(let y = 0; y < placeHolder.length; y++){
            temp.push(placeHolder[y][x])
        }
  
        transpose.push(temp)
        temp = []
      }
  
      // since our columns ae now rows
      // we can use the CalGridRow function to
      // calculate the winning seq of the columns
      const Colseq = CalGridRow(transpose)
  
      return Colseq
  }
  
  
  
  // this function uses any num x num grid 
  // to calculate the winning row sequence
  function CalGridRow(grid: number[][]): number[][] { 
  
    const rowColGrid = grid
    let Gridrow: number[][] = []
    let temp: number[] = []
  
    rowColGrid.forEach((row)=>{
  
      row.forEach((item)=>{
  
        temp.push(item)
  
        if(temp.length >= 3){
  
          Gridrow.push(temp)
          temp = temp.slice(1)
        }
  
      })
  
      temp = []
  
  
  
    })
  
    return Gridrow
  }
  
  
  // function returns a num x num grid
  function Grid(num: number): number[][] {
    let temp:number[] = []
    let grid: number[][] = []
  
    for(let i = 0; i < Math.pow(num, 2); i++){
      temp.push(i)
      if(temp.length >= num){
        grid.push(temp)
        temp = []
      }
    }
    return grid
  }


  // Calculates the winning sequence
   export function CalWinningSeq(num: number){
        const grid = Grid(num)
        const grid_reversed = GridReversed(num)
    
        const row_win_seq = CalGridRow(grid)
        const col_win_seq = CalGridCol(num)
    
        const left_to_right_diag_win_seq = CalGridDiag(grid)
        const right_to_left_diag_win_seq = CalGridDiag(grid_reversed)
    
        let winning_seq = [...row_win_seq, ...col_win_seq, ...left_to_right_diag_win_seq, ...right_to_left_diag_win_seq ]
        return winning_seq
    
    }
  
