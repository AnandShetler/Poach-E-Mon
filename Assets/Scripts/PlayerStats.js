#pragma strict

var startPoint : Vector3;
var endPoint : Vector3;
var speed : float;
private var increment : float;
var isMoving : boolean;
var disableMovement : boolean;

var walkCounter : int;
var walkCounter2 : int;
var isInCombat : boolean;
var directionFacing : String;

var mainCamera : GameObject;
var combatCamera : GameObject;

var teleportLoc : GameObject[];

var region : String;

var baseHp : float;
var curHp : float;
var curAtk : float;
var curDef : float;
var curSpd : float;
var attacks : Attack[];

var MainScript : Main1;

function Start () {
	mainCamera.active = true;
	combatCamera.active = false;
	startPoint = transform.position;
	endPoint = transform.position;

	walkCounter2 = Random.Range(5,15);

	baseHp = 50.0;
	curHp = 50.0;
	curAtk = 10;
	curDef = 10;
	curSpd = 10;


	region = "region1";
}

function Update () {

	if (Input.GetKeyDown("space") && !disableMovement) {
		talkToNpc();
	}

	var Sprite = gameObject.GetComponent(AnimateSprite);

	if (increment <= 1 && isMoving == true) {
		increment += speed/100;
	}
	else {
		isMoving = false;
	}

	if (isMoving == true) {
		transform.position = Vector3.Lerp(startPoint, endPoint, increment);
	}
	else {
		Sprite.totalCells = 1;
	}

	if (!isInCombat && !disableMovement) {
		if (Input.GetKey("w") && isMoving == false) {
			Sprite.rowNumber = 2;
			Sprite.totalCells = 1;
			directionFacing = "N";
			var disableMove : boolean;
			var hit : RaycastHit;
			if (Physics.Raycast(transform.position, Vector3.forward, hit, 1.0)) {
				Debug.Log("HIT");
				if (hit.collider.gameObject.tag == "Obstacle") {
					disableMove = true;
					Debug.Log("Obstacle");
				}
			}
			if (!disableMove) {
				Sprite.rowNumber = 2;
				Sprite.totalCells = 5;
				calculateWalk();
				increment = 0;
				isMoving = true;
				startPoint = transform.position;
				endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z+1);
			}
		}
		else if (Input.GetKey("s") && isMoving == false) {
			Sprite.rowNumber = 0;
			Sprite.totalCells = 1;
			directionFacing = "S";
			var disableMove1 : boolean;
			var hit1 : RaycastHit;
			if (Physics.Raycast(transform.position, -Vector3.forward, hit1, 1.0)) {
				Debug.Log("HIT");
				if (hit1.collider.gameObject.tag == "Obstacle") {
					disableMove1 = true;
					Debug.Log("Obstacle");
				}
			}
			if (!disableMove1) {
				Sprite.rowNumber = 0;
				Sprite.totalCells = 5;
				calculateWalk();
				increment = 0;
				isMoving = true;
				startPoint = transform.position;
				endPoint = new Vector3(transform.position.x, transform.position.y, transform.position.z-1);
			}
		}
		else if (Input.GetKey("d") && isMoving == false) {
			Sprite.rowNumber = 3;
			Sprite.totalCells = 1;
			directionFacing = "E";
			var disableMove2 : boolean;
			var hit2 : RaycastHit;
			if (Physics.Raycast(transform.position, Vector3.right, hit2, 1.0)) {
				Debug.Log("HIT");
				if (hit2.collider.gameObject.tag == "Obstacle") {
					disableMove2 = true;
					Debug.Log("Obstacle");
				}
			}
			if (!disableMove2) {
				Sprite.rowNumber = 3;
				Sprite.totalCells = 5;
				calculateWalk();
				increment = 0;
				isMoving = true;
				startPoint = transform.position;
				endPoint = new Vector3(transform.position.x+1, transform.position.y, transform.position.z);
			}
		}
		else if (Input.GetKey("a") && isMoving == false) {
			Sprite.rowNumber = 1;
			Sprite.totalCells = 1;
			directionFacing = "W";
			var disableMove3 : boolean;
			var hit3 : RaycastHit;
			if (Physics.Raycast(transform.position, Vector3.left, hit3, 1.0)) {
				Debug.Log("HIT");
				if (hit3.collider.gameObject.tag == "Obstacle") {
					disableMove3 = true;
					Debug.Log("Obstacle");
				}
			}
			if (!disableMove3) {
				Sprite.rowNumber = 1;
				Sprite.totalCells = 5;
				calculateWalk();
				increment = 0;
				isMoving = true;
				startPoint = transform.position;
				endPoint = new Vector3(transform.position.x-1, transform.position.y, transform.position.z);
			}
		}
	}
}

function talkToNpc() {
	if (directionFacing == "N") {
		var hit : RaycastHit;
		if (Physics.Raycast(transform.position, Vector3.forward, hit, 1.0)) {
			Debug.Log("HIT");

			var obj = hit.collider.gameObject.name;

			if (obj == "npc") {
				hit.collider.SendMessage("talk");
			}
			if (obj.Substring(0, obj.length - 1)  == "chest") {

				Debug.Log(obj);
				Debug.Log(MainScript.chestInventory[parseInt(obj.Substring(obj.length - 1))]);
				hit.collider.SendMessage("open");
			}
		}
	}
}

function calculateWalk() {
	yield WaitForSeconds(0.3);
	var hit : RaycastHit;
	if (Physics.Raycast(transform.position, -Vector3.up, hit, 100.0)) {
		Debug.Log("HIT");
		if (hit.collider.gameObject.tag == "tallGrass") {
			walkCounter++;
			Debug.Log("Tall Grass "+walkCounter);
		}
		else if (hit.collider.gameObject.tag == "houseEntrance") {
			region = "house";
			isMoving = false;
			this.transform.position = teleportLoc[1].transform.position;
			this.transform.position.y = -55;
		}
		else if (hit.collider.gameObject.tag == "houseExit") {
			Debug.Log("Hlkasdjf");
			region = "region1";
			isMoving = false;
			this.transform.position = teleportLoc[0].transform.position;
			this.transform.position.y = -55;
		}

		if (directionFacing == "N") {
			if (hit.collider.gameObject.name == "chest0") {
				Debug.Log(MainScript.chestInventory[0]);
			}
			else if (hit.collider.gameObject.name == "chest1") {
				Debug.Log(MainScript.chestInventory[1]);
			}
			else if (hit.collider.gameObject.name == "chest2") {
				Debug.Log(MainScript.chestInventory[2]);
			}
		}

	}

	if (walkCounter >= walkCounter2) {
		walkCounter2 = 2;
		walkCounter = 0;
		enterCombat();
	}
}

function enterCombat() {
	MainScript.randomizeMonster();
	MainScript.playerMonster = toMonster();
	mainCamera.active = false;
	combatCamera.active = true;
	isInCombat = true;
	Debug.Log("In Combat");
}

function exitCombat() {
	mainCamera.active = true;
	combatCamera.active = false;
	isInCombat = false;
//	updatePlayerStats();
}

function toMonster(){
	var copyMonster = new monster();
	copyMonster.name = "You";
	copyMonster.image = null;
	copyMonster.rarity = Rarity.veryRare;
	copyMonster.regionLocated = "region1";
	copyMonster.type = Type.forest;
	copyMonster.baseHp = 50.0;
	copyMonster.curHp = this.curHp;
	copyMonster.baseAtk = 10.0;
	copyMonster.curAtk = this.curAtk;
	copyMonster.baseDef = 10.0;
	copyMonster.curDef = this.curDef;
	copyMonster.baseSpd = 10.0;
	copyMonster.curSpd = this.curSpd;
//	var attackArr = new Attack[new Attack(Move.Kick, 10.0, AttackType.physical, 90.0)]; //why
//	var attack1 = new Attack(Move.Kick, 10.0, AttackType.physical, 90.0);
    var attackArr = new Attack[4]; //fine
	copyMonster.attacks = attackArr;
	return copyMonster;
}

//function updatePlayerStats(m : monster){
//	this.curHp = m.curHp;
//	this.curAtk = m.curAtk;
//	this.curDef = m.curDef;
//	this.curSpd = m.curSpd;
//}