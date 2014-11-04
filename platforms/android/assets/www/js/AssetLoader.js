

//Initializes the canvas and sets its properties			

var	canvas = FastCanvas.create();
var	ctx = canvas.getContext("2d");

ctx.font = '30px Helvetica';

var frameRate = 1000/60;

//The list of assets to be loaded via ajax
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
loadAsset();

function loadAsset() {
	
	if(ctr == assetList.length)
	{
		//load all entities, push them to the active entities array and begin the game loop
		gPhysicsEngine = new PhysicsEngine();
		globalMovement = 0;
		score = 0;
		counter = 0;
		speed = 1;
		gameOver = false;
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
