let inputDir = {x: 0 , y: 0};
const foodSound = new Audio('songs/food.mp3');
const gameOver = new Audio('songs/GO.mp3');
const movesound = new Audio('songs/move.mp3');
const bgMusic = new Audio('songs/bg Music.mp3');
var speed =5;
speed= parseInt(prompt("Enter Speed"));
let score = 0;
let lastPaintTime = 0;


let snakeArr = [
    {x:13 , y:15}
]

food = {x : 6 , y: 7};

// Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1/speed){
        return;
    }
    
    lastPaintTime = ctime;

    gameEngine();

}

function isCollide(snake){
    // collide with itself
    // checking collison when snake size==1
    if(snake.length==1&&(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)){
    return true; 
    }
    else{
    for(let i = 1 ;i < snakeArr.length;i++ ){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true;
        }

        //  collision with wall
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
    }
}
}

function gameEngine(){
    // part 1: updating snake array
    if(isCollide(snakeArr)){
        gameOver.play();
        bgMusic.pause();
        inputDir = {x:0 , y:0};
        alert("Game Over. Press any key to play again !");
        snakeArr = [{x:13 , y:15}]
        bgMusic.play();
        score = 0;

    }
    
    // food eaten , inc the score  and regnerate the body
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }

        scoreBox.innerHTML ="scoreBox: " + score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir .x ,y:snakeArr[0].y + inputDir.y})
        let a = 1;
        let b = 16;
        food = {x :Math.round(a + (b-a) *Math.random()) , y :Math.round(a + (b-a) *Math.random()) }
        
    }

    // Moving snake

    for(let i = snakeArr.length - 2 ; i >= 0;i--){
        
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;    
    snakeArr[0].y += inputDir.y;    

    // part2 : render the snake and food

    //render the snake 
    board.innerHTML = "";
    snakeArr.forEach((e,ind) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(ind === 0){
            snakeElement.classList.add('head');
        }

        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // render food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}


// main logic
bgMusic.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game

    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});