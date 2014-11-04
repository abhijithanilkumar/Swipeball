//Initializes the game	

var	canvas = FastCanvas.create();
var	ctx = canvas.getContext("2d");

ctx.font = '30px Helvetica';

var frameRate = 1000/60;

//The list of assets to be loaded via ajax, blank for now
var assetList = [	
					
				];
				
for(var i=0;i<assetList.length;i++)
{
	var sheet = null;
	if(assetList[i].indexOf('png') > -1)
	{
		sheet = new SpriteSheet(assetList[i],false);
	}
	else
	{
		sheet = new SpriteSheet(assetList[i],true);
	}
	gSpriteSheets[assetList[i].substring(assetList[i].lastIndexOf('/')+1)] = sheet;
}

var ctr = 0;

//first, load the menu
loadMenu();

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

function loadMenu()
{
	//the input engine has a provision to call loadGame below once a click/touch event has been registered

	menu = true;
	
	drawGrid();
	
	ctx.font = "70px Helvetica";
	ctx.fillText('swipeball',canvas.width - 400,canvas.height/2);
	
	ctx.font = "20px Helvetica";
	ctx.fillText('Instructions:',100,canvas.height/2+100);
	ctx.fillText('You control the solid ball.',125,canvas.height/2+140);
	ctx.fillText('Avoid the mines. Touching one ends the game.',145,canvas.height/2+180);
	ctx.fillText('You can knock the cleaver onto mines by touching it,',160,canvas.height/2+220);
	ctx.fillText('and this destroys the mines and earns you extra points.',170,canvas.height/2+240);
	
	ctx.beginPath();
	ctx.arc(450,canvas.height/2+135,15,0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
	ctx.beginPath();
	ctx.arc(650,canvas.height/2+175,15,0,2*Math.PI);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(750,canvas.height/2+220,15,0,Math.PI/2);
	ctx.closePath();
	ctx.stroke();
	
	ctx.font = "30px Helvetica";
	ctx.fillText('Tap the screen to play.',canvas.width - 400,canvas.height/2 + 100);
}

function loadGame() {
	
	if(ctr == assetList.length)
	{
		//load all entities, push them to the active entities array and begin the game loop
		gPhysicsEngine = new PhysicsEngine();
		globalMovement = 0;
		score = 0;
		counter = 0;
		speed = 1;
		gameOver = false;
		menu = false;
		loadGround();
		loadCeiling();
		loadWalls();
		loadBall();
		entitiesByZindex = [];
		entitiesByZindex.push([ball]);
		entitiesByZindex.push([loadCleaver()]);
		mineCount = 2;
		entitiesByZindex.push(mines);
		gameEngineLoop();
	}
}
