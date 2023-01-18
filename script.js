const X_CLASS='x';
const CIRCLE_CLASS='o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById("board");
const winner=document.querySelector(".winner");
const winningMessage=document.getElementById("winningMessage");
const lossingMessage=document.getElementById("lossingMessage");
const restartButton=document.getElementById("restartButton");
let circleTurn;
startGame();
restartButton.addEventListener('click',startGame);
function startGame()
{
    circleTurn=false;
    cellElements.forEach(ele=>{
        ele.classList.remove(X_CLASS);
        ele.classList.remove(CIRCLE_CLASS);
        ele.removeEventListener('click',handleClick)
        ele.addEventListener('click',handleClick,{once:true})
        winner.classList.add('none');
        board.classList.remove("none");
    })
    setHoverBoardClass()

}

function handleClick(e)
{
    const cell=e.target;
    const currentClass= circleTurn? CIRCLE_CLASS:X_CLASS;
    placeMark(cell,currentClass);
    if(checkWin(currentClass))
    {
        endGame(false);
    }
    else if(checkDraw()){
        endGame(true);
    }else{
        swapTurns();
        setHoverBoardClass();
    }
 
}
function endGame(draw) {
    if (draw) {
      winningMessage.innerText = 'Draw!'
    } else {
      winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
      lossingMessage.innerText=`${circleTurn ? "X's" : "O's"} Loses!`
    }
    winner.classList.remove('none');
    board.classList.add("none");

  }
function placeMark(cell,currentClass)
{
    cell.classList.add(currentClass);
}
function swapTurns()
{
    circleTurn=!circleTurn;
}
function setHoverBoardClass()
{
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}
function checkWin(currentClass)
{
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
function checkDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}
