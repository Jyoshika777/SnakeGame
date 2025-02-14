const play=document.querySelector(".board");
const scoreElement=document.querySelector(".score");
const highScoreElement=document.querySelector(".high-score");
const GRID_SIZE=30;
let foodX,foodY;
let headX=15,headY=15;
let snakeBody=[];
let directionX=0,directionY=0;
let score=0;
let highScore=localStorage.getItem("HighScore")||0;
highScoreElement.innerText=`High Score:${highScore}`;
const changeFoodPosition=()=>{
  do {
    foodX = Math.floor(Math.random()*GRID_SIZE);
    foodY = Math.floor(Math.random()*GRID_SIZE);
  } while (snakeBody.some(segment=>segment[0] === foodX && segment[1] === foodY) || (foodX === headX && foodY === headY)); 
};
const changeDirection=(e)=>{
  if(e.key==="ArrowUp"&&directionY!==1){
    directionX=0;
    directionY=-1;
  }else if(e.key==="ArrowDown"&&directionY!==-1){
    directionX=0;
    directionY=1;
  }else if(e.key==="ArrowLeft"&&directionX!==1){
    directionX=-1;
    directionY=0;
  }else if(e.key==="ArrowRight"&&directionX!==-1){
    directionX=1;
    directionY=0;
  }
};
const updateGame=()=>{
  headX+=directionX;
  headY+=directionY;
  if(headX<0||headX>=GRID_SIZE||headY<0||headY>=GRID_SIZE){
    alert("Game Over! Restarting...");
    resetGame();
    return;
  }
  if(headX===foodX&&headY===foodY){
    changeFoodPosition();
    snakeBody.push([headX,headY]);
    snakeBody.unshift([headX-directionX,headY-directionY]);
    score++;
    highScore=score>highScore?score:highScore;
    localStorage.setItem("HighScore",highScore);
    scoreElement.innerText=`Score: ${score}`;
    highScoreElement.innerText=`High Score: ${highScore}`;
  }
  for (let i=snakeBody.length - 1;i>0;i--){
    snakeBody[i] =[...snakeBody[i - 1]];
  }
  if (snakeBody.length){
    snakeBody[0]=[headX,headY];
  }
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i][0] === headX && snakeBody[i][1] === headY) {
      alert("Game Over! Snake collided with itself.");
      resetGame();
      return;
    }  
  }
  let gameBoard=`
    <div class="food"style="grid-row:${foodY+1};grid-column: ${foodX+1};background-color: red;"></div>
    <div class="head"style="grid-row:${headY+1};grid-column:${headX+1};background-color:blue;"></div>`;
    snakeBody.forEach(segment => {
    gameBoard+=`<div class="body"style="grid-row:${segment[1]+1};grid-column:${segment[0]+1};background-color: blue;"></div>`;
  });
  play.innerHTML = gameBoard;
};
const resetGame = () => {
  headX=15;
  headY=15;
  directionX=0;
  directionY=0;
  snakeBody=[];
  score=0;
  scoreElement.innerText=`Score: ${score}`;
  changeFoodPosition();
  play.innerHTML = '';
};
changeFoodPosition();
setInterval(updateGame,125);
document.addEventListener("keydown",changeDirection);