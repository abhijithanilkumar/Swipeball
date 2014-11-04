var entitiesByZindex;
var speed;
var score;
var counter;

var gameOver;

var debug = false;

function drawGrid()
{
	ctx.strokeStyle = '#CCC';
	for(var i=0; i < canvas.width; i += 10)
	{
		ctx.beginPath();
		ctx.moveTo(i,0);
		ctx.lineTo(i,canvas.height);
		ctx.closePath();
		ctx.stroke();
	}
	for(var j=0; j < canvas.height; j += 10)
	{
		ctx.beginPath();
		ctx.moveTo(0,j);
		ctx.lineTo(canvas.width,j);
		ctx.closePath();
		ctx.stroke();
	}
	ctx.strokeStyle = '#000';
}

//One cycle of computat0ion
function gameEngineLoop()
{
	if(counter % 50 == 49)
		score += 1;
	counter += 1;
	if(counter > 10000)
		counter = 1;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawGrid();
	gPhysicsEngine.update();
	populateMines();
	for(var i=0; i < entitiesByZindex.length; i++)
	{
		for(var j=0; j < entitiesByZindex[i].length; j++)
		{
			
			//render only if the entity hasn't been marked for death, else destroy it
			if(!entitiesByZindex[i][j].killed && !gameOver)
				entitiesByZindex[i][j].update();
			else if(!entitiesByZindex[i][j].killed && gameOver)
				entitiesByZindex[i][j].killed = true;
			if(entitiesByZindex[i][j].killed)
			{
				if(entitiesByZindex[i][j].id = "mine" && !gameOver)
				{
					//do the score computation and difficulty setting here instead of in the collision handler
					//since a single collision fires the handler multiple times in Box2D
					
					//increase the score by a good amount
					score += 30;
					
					//there's a chance things may become a little more difficult now...
					var increaseDifficultyFlag = Math.random();
					if(increaseDifficultyFlag < 0.1)
						mineCount += 1;
				}
				entitiesByZindex[i][j].kill(i,j);
			}
		}
	}
	
	ctx.fillText(score.toString(),canvas.width-150,40);
	
	if(debug || gameOver)
	{
		ctx.font = "50px Helvetica";
		ctx.fillText("Score : " + score.toString(),canvas.width/2 - 150, canvas.height/2 - 25);
		ctx.fillText("YOU LOSE.",canvas.width/2 - 160, canvas.height/2 - 150);
		ctx.font = "30px Helvetica";
		ctx.fillText("Tap to retry.",canvas.width/2 - 120, canvas.height/2 + 50);
	}
	else
		window.requestAnimationFrame(gameEngineLoop);
}