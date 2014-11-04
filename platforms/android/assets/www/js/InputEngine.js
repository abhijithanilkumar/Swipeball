//handle swipe events to move ball

var gnStartX = 0;
var gnStartY = 0;
var gnCurrentX = 0;
var gnCurrent = 0;
var gnEndX = 0;
var gnEndY = 0;

var globalMovement = 0;

//Event handlers for mobile devices

$(document).on('touchstart', function(event){
	var touchobj = event.originalEvent.changedTouches[0];
	
	if(gameOver)
	{
		location.reload();
	}
	
    gnStartX = parseInt(touchobj.clientX);
    gnStartY = parseInt(touchobj.clientY);
    event.preventDefault();
});

$(document).on('touchmove', function(event){
	var touchobj = event.originalEvent.changedTouches[0];
    var newPosX = parseInt(touchobj.clientX);
    var newPosY = parseInt(touchobj.clientY); 
    var distance = Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));  
    event.preventDefault();
});

$(document).on('touchend', function(event){
    var touchobj = event.originalEvent.changedTouches[0];
    gnEndX = parseInt(touchobj.clientX);
    gnEndY = parseInt(touchobj.clientY);
    var power = Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
    globalMovement += power;
    
    //get the direction unit vector
	var directionX = (gnEndX - gnStartX)/Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
	var directionY = (gnEndY - gnStartY)/Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
	
	if(power > 0)
		ball.physicsBody.ApplyImpulse(new Box2D.Common.Math.b2Vec2(directionX * power,directionY * power),ball.physicsBody.GetWorldCenter());
    
    event.preventDefault();      
});

//event handlers for desktop browsers, which do pretty much the same thing

$(document).on('mousedown', function(event){
    gnStartX = event.pageX;
    gnStartY = event.pageY;
	
	if(gameOver)
	{
		location.reload();
	}
	
    event.preventDefault();
});

$(document).on('mousemove', function(event){
    var newPosX = event.pageX;
    var newPosY = event.pageY; 
    var distance = Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));  
    event.preventDefault();
});

$(document).on('mouseup', function(event){
    gnEndX = event.pageX;
    gnEndY = event.pageY;
    var power = Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
    globalMovement += power;
    
    //get the direction unit vector
	var directionX = (gnEndX - gnStartX)/Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
	var directionY = (gnEndY - gnStartY)/Math.ceil(Math.sqrt(Math.pow((gnEndX - gnStartX),2) + Math.pow((gnEndY - gnStartY), 2)));
	
	ball.direction.x = directionX;
	ball.direction.y = directionY;
	
	if(power > 0)
		ball.physicsBody.ApplyImpulse(new Box2D.Common.Math.b2Vec2(directionX * power * ball.scale * 10000,directionY * power * ball.scale * 10000),ball.physicsBody.GetWorldCenter());
    
    event.preventDefault();      
});