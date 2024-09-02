
import { WinningSeq } from '../choose/util'

export let winningCombo = WinningSeq

export const SetWinningCombo = (newValue: number[][])=>{
    winningCombo = newValue
}

 export const CheckWinner =(updatedState: (string | null)[], isMinimax: Boolean, setWinner:any, setWinnerSquares:any, winner:any)=>{

    // loop through all the winning combo array
    for(let i = 0; i < winningCombo.length; i++){
      const [a, b, c] = winningCombo[i]
      
      // first check if two squares have either X or O
      if(updatedState[a] != null && updatedState[b] != null ){

        // than check if they are three squares with the same string
        if(updatedState[a] === updatedState[b] && updatedState[b] === updatedState[c]){

          if(!isMinimax){
            setWinner(updatedState[a]) 
            setWinnerSquares([a, b, c])

            return winner

          }
          return updatedState[a]

        }
      } 

    }


    // check if all the sqares have been filled up
    for(let i = 0; i < updatedState.length; i++){
      if(updatedState[i] == null){
        return null
      }
    }
    // if all sqares have been filled up than the game is a draw
    if(!isMinimax){
      setWinner("Draw") 
      setWinnerSquares("Draw") 
      return winner

    }
    return "Draw"
    
  }




  function Evaluation(winner: String | null, board: (string | null)[], searchParams:any){
    const humanPlayer = searchParams.get('selected')
    const computerPlayer = searchParams.get('selected') == "X" ? "O": "X"
    let num_of_Squares_Left = 0

    // if game is not over but the depth has reached zero
    // loop through the game state than check if they are any two consecutive squares 
    // which have the same string, wheather X or O
    if(winner == null){
      
    // loop through all the winning combo array
    for(let i = 0; i < winningCombo.length; i++){

      const [a, b, c] = winningCombo[i]

      if(board[a] == humanPlayer  && board[b] == humanPlayer || board[b] == humanPlayer  && board[c] == humanPlayer ){
        return -5

      }else if(board[a] == computerPlayer  && board[b] == computerPlayer || board[b] == computerPlayer  && board[c] == computerPlayer){
        return 5

      }else{
        return 0
      }
    
    }

    }

    // If game is a draw than give an evaluation score of zero
    if(winner == "Draw"){
      return 0
    }

    // If game is a loss than give an evaluation score of -10
    else if(winner == humanPlayer){
      return -10
    }

    // If game is a win than give an evaluation score of ten plus the number of empty squares
    for(let index = 0; board.length > index; index++){
      if(board[index] == null){
        num_of_Squares_Left++
      }
    }

    return 10 + num_of_Squares_Left
      

  }


  type x = {
    "score":number,
    "board": (string | null)[] 
  }
  
 
 export function MiniMax(board: (string | null)[], depth: number,alpha:number, beta:number, isMaximizing:Boolean, searchParams:any, setWinner:any, setWinnerSquares:any, _winner:any): x{
    let winner: String | null = CheckWinner(board, true, setWinner, setWinnerSquares, _winner)
    let score: number
    let maximizingPlayer = searchParams.get('selected') == "X" ? "O" : "X"
    let minimizingPlayer = searchParams.get('selected')
    let boardState: (string | null)[] = []


    // base case for the recursive function
    if(winner != null || depth == 0){
      score = Evaluation(winner, board, searchParams)
      return {
        "score":score,
        "board":board
      }
      
    }

    if(isMaximizing){
      let maxEval = -999
      for(let index = 0; index < board.length; index++) {

        if(board[index] == null){

          let _board = [...board]
          _board[index] = maximizingPlayer
          const _eval = MiniMax(_board, depth - 1, alpha, beta, false, searchParams, setWinner, setWinnerSquares, _winner)
          alpha = Math.max(alpha, _eval.score)

          if(maxEval < _eval.score){
            maxEval = _eval.score
            boardState = _board
          }

          if(beta <= alpha){
            break
          }
        }
      }
      return {"score": maxEval, "board": boardState}

    }


    else{
      let minEval = 999
      for(let index = 0; index < board.length; index++) {
        if(board[index] == null){
          let _board = [...board]
          _board[index] = minimizingPlayer
          const _eval = MiniMax(_board, depth - 1, alpha, beta, true, searchParams, setWinner, setWinnerSquares, _winner)
          minEval = Math.min(minEval, _eval.score)
          beta = Math.min(beta, _eval.score)

          if(minEval > _eval.score){
            minEval = _eval.score
            boardState = _board

          }

          if(beta <= alpha){
            break
          }
        }
        
      }
      return {"score": minEval, "board": boardState}

    }

  }



