var hypnoticBall, Position, database;

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    
    var hypnoticBallPosition = database.ref('Ball/Position');
    hypnoticBallPosition.on("value", readPosition, showError);

}

function draw(){
    background("white");
    if(Position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
    }
    
    drawSprites();
}

function writePosition(x,y){
    database.ref('Ball/Position').set({
        "x": Position.x + x,
        "y": Position.y + y
    })
}

function showError(){
    console.log("Error in reading the database");
}

function readPosition(data){
Position = data.val();
console.log(Position.x);
hypnoticBall.x = Position.x;
hypnoticBall.y = Position.y;
}
