const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-60;
var dx = 2;

var bg = new Image();

bg.src = "Ground.png";

var obstaclesX = 8;
var obstaclesY = 0;

var obstaclesWidth = 100;
var obstaclesHeight = 20;

var score = 0;
var disScore = 0;

class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

let obsArray = [new Obstacle(8,10,100,20),new Obstacle(150,200,100,20),new Obstacle(50,400,100,20)];

var obstacledy = 3;

var rightPressed = false;
var leftPressed = false;

var ballRadius=15;

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawBall();
    drawObstacle();
    drawScore();
    //ctx.draw(bg,0,0)

    // User Controls

    if(rightPressed) {
        x += 3;
    }
    else if(leftPressed) {
        x -= 3;
    }

    // Game Rules

    if(x + dx > canvas.width) {
        x = -dx;
    }

    if(x + dx < 0) {
        x = canvas.width-dx;
    }

    // Game Updates

    obsArray.forEach(el => {

        if(el.y>canvas.height) 
            {
                el.y = 0;
                el.x = 8+Math.random()*(canvas.width-obstaclesWidth-8);
            }
        
        el.y += obstacledy;
    }); 

    score = score + 0.01;
    disScore = Math.floor(score);

    // Game Loop Implementation

    isCollided=false;

    obsArray.forEach(el => {
        if(x>el.x-ballRadius + 7.5 && x<el.x+el.width+ballRadius-7.5 && y>el.y-ballRadius+5 && y<el.y+el.height+ballRadius-5)
            {
                alert("GAME OVER");
                document.location.reload();
                isCollided=true;
            }
    }); 

    if(!isCollided) window.requestAnimationFrame(draw);    
}

function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#212121";
    ctx.fill();
    ctx.closePath();
}

function drawObstacle()
{
    obsArray.forEach(el => {
        ctx.beginPath();
        ctx.rect(el.x, el.y, el.width, el.height);
        ctx.fillStyle = "#212121";
        ctx.fill();
        ctx.closePath();
    });   
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+disScore, 8, 20);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


window.requestAnimationFrame(draw);
